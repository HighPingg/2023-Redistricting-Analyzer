import geopandas as gpd
import pandas as pd
gpd.options.use_pygeos = False
import time
import matplotlib.pyplot as plt
from functools import partial
from gerrychain.updaters import Tally
from gerrychain.proposals import recom
from gerrychain import GeographicPartition, Graph, MarkovChain, updaters, constraints, accept, Election
from gerrychain.constraints import no_vanishing_districts
import multiprocessing as mp
import json
import os.path
from gerrychain.random import random
import sys
# sys.stdout = open('writingFiles.txt', 'a')


NV_INC_PREC = {
    '006605CLK': 'Dina Titus',
    '000027DOU': 'Mark Amodel',
    '007702CLK': 'Susie Lee',
    '002722CLK': 'Steven Horsford'
}

STEPS = 100
ENSEMBLE_SIZE = 1000
FILENAME = "./NVPrecinctsTest.geojson"
CORES = 5


shapefile = gpd.read_file(FILENAME)

shapefile['geometry'] = shapefile['geometry'].buffer(0.001)
shapefile = shapefile.to_crs(4326)
graph = Graph.from_geodataframe(shapefile)

election = Election("election", {"Republican": "repVotes", "Democratic": "demVotes"}, alias="election")
my_updaters = {"population": updaters.Tally("Tot_2020_vap", alias="population"), "wh_votes": updaters.Tally("Wh_2020_vap", alias="wh_votes"),
               "his_votes": updaters.Tally("His_2020_vap", alias="his_votes"), "blc_votes": updaters.Tally("BlC_2020_vap", alias="blc_votes"), "natc_votes": updaters.Tally("NatC_2020_vap", alias="natc_votes"),
               "asnc_votes": updaters.Tally("AsnC_2020_vap", alias="asnc_votes"), "pacc_votes": updaters.Tally("PacC_2020_vap", alias="pacc_votes"), "geoArea": updaters.Tally('geographicArea', alias="geoArea"),
               "election": election}

initial_partition = GeographicPartition(
    graph, assignment="districtNum", updaters=my_updaters)

for district, pop in initial_partition["population"].items():
    print("District {}: {}".format(district, pop))

compactness_bound = constraints.UpperBound(
    lambda p: len(p["cut_edges"]),
    2*len(initial_partition["cut_edges"])
)

ideal_population = sum(
    initial_partition["population"].values()) / len(initial_partition)

proposal = partial(recom,
                   pop_col="Tot_2020_vap",
                   pop_target=ideal_population,
                   epsilon=0.02,
                   node_repeats=2
                   )

pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.50)

def export_plan(initPart, partition, precincts, desc):
    if(partition == None): return
    if(os.path.isfile(desc+" interesting plan.json")): return

    incumbentForDist = {}

    for key, value in NV_INC_PREC.items():
        newDis = precincts.loc[precincts['VTDST20'] == key, 'districtNum'].values[0]
        # print(newDis)
        if not newDis in incumbentForDist:
            incumbentForDist[newDis] = value
    
    districts = precincts.dissolve('districtNum')
    # print(districts)
    republicans = partition['election'].counts('Republican')
    democrats = partition['election'].counts('Democratic')

    for key, value in incumbentForDist.items():
        districts.loc[key, 'Incumbent'] = value
    
    for index, i in enumerate(partition['population'].items()):
        districts.loc[i[0], "Tot_2020_vap"] = i[1]
        districts.loc[i[0],"repVotes"] = republicans[index]
        districts.loc[i[0],"demVotes"] = democrats[index]

    for i in partition['wh_votes'].items():
        districts.loc[i[0],"Wh_2020_vap"] = i[1]
    for i in partition['his_votes'].items():
        districts.loc[i[0],"His_2020_vap"] = i[1]
    for i in partition['blc_votes'].items():
        districts.loc[i[0],"BlC_2020_vap"] = i[1]
    for i in partition['natc_votes'].items():
        districts.loc[i[0],"NatC_2020_vap"] = i[1]
    for i in partition['asnc_votes'].items():
        districts.loc[i[0],"AsnC_2020_vap"] = i[1]
    for i in partition['pacc_votes'].items():
        districts.loc[i[0],"PacC_2020_vap"] = i[1]
    for i in partition['geoArea'].items():
        districts.loc[i[0],"geometricArea"] = i[1]

    if(os.path.isfile(desc+" interesting plan.json")): return
    districts.to_file(desc+" interesting plan.json")
    print("Generated", desc)

    # geometry = list()
    # for district, subgraph in partition.subgraphs.items():
    #     distGeo = gpd.GeoDataFrame(columns=['district', 'node', 'geometry'])
    #     i = 0
    #     for node in subgraph.nodes:
    #         # geometrySeries = gpd.GeoSeries(partition.graph.nodes[node]['geometry'])
    #         # print(str(geometrySeries.dtype))
    #         print(partition.graph.nodes[node]['geometry'].geom_type)
    #         distGeo.loc[i] = [district, node,
    #                         partition.graph.nodes[node]['geometry']]
    #         i += 1

    #     dissolved = distGeo.dissolve(by='district')
    #     geometry.append(dissolved.iloc[0]['geometry'])

    # finalPlan = gpd.GeoDataFrame({
    #     'DISTRICT': int(district),
    #     'Tot_2020_vap': population[int(district)-1],
    #     'Wh_2020_vap': wh_votes[int(district)-1],
    #     'His_2020_vap': his_votes[int(district)-1],
    #     'BlC_2020_vap': blc_votes[int(district)-1],
    #     'NatC_2020_vap': natc_votes[int(district)-1],
    #     'AsnC_2020_vap': asnc_votes[int(district)-1],
    #     'PacC_2020_vap': pacc_votes[int(district)-1],
    #     'geometry': geometry[int(district)-1]
    # } for district, subgraphs in partition.subgraphs.items()
    # )

    # finalPlan.to_file(str(datetime.datetime.now()) +
    #                 ' IL2020Seawulf.geojson', driver="GeoJSON")


def boxplot(df):
    data = []
    outliers = []
    for column in df.columns:
        max = df[column].max()
        min = df[column].min()
        median = df[column].median()
        q1 = df[column].quantile(0.25)
        q3 = df[column].quantile(0.75)
        iqr = q3 - q1
        outlier = df[column][(df[column] < (q1 - 1.5 * iqr)) | (df[column] > (q3 + 1.5 * iqr))]
        data.append({
            'x':column,
            'y':[min,q1,median,q3,max],
        })
        for item in outlier:
            outliers.append({'x':column, 'y':item})
    box = {
        'name': 'box',
        'type':'boxPlot',
        'data': data,
        
    }
    scatter = {
        'name': 'outliers',
        'type':'scatter',
        'data': outliers,
    }
    return [box, scatter]

def calc_var(initial_partition, new_partition):
    var = {'popVar': [],'whVar': [],'hisVar': [],'blcVar': [],'natcVar': [],'asncVar': [],'paccVar': [],'areaVar': []}
    for district in initial_partition.assignment.parts.keys():
        b = new_partition.assignment.parts[district] - initial_partition.assignment.parts[district]
        gb = new_partition.assignment.parts[district].union(initial_partition.assignment.parts[district])
        graph = initial_partition.graph
        sum_gb = {'population':0,  'wh_votes':0, 'his_votes':0, 'blc_votes':0, 'natc_votes':0, 'asnc_votes':0, 'pacc_votes':0, 'area':0}
        for node in gb:
            sum_gb['population'] += graph.nodes[node]['Tot_2020_vap']
            sum_gb['wh_votes'] += graph.nodes[node]['Wh_2020_vap']
            sum_gb['his_votes'] += graph.nodes[node]['His_2020_vap']
            sum_gb['blc_votes'] += graph.nodes[node]['BlC_2020_vap']
            sum_gb['natc_votes'] += graph.nodes[node]['NatC_2020_vap']
            sum_gb['asnc_votes'] += graph.nodes[node]['AsnC_2020_vap']
            sum_gb['pacc_votes'] += graph.nodes[node]['PacC_2020_vap']
            sum_gb['area'] += graph.nodes[node]['geographicArea']
        sum_b={'population':0,  'wh_votes':0, 'his_votes':0, 'blc_votes':0, 'natc_votes':0, 'asnc_votes':0, 'pacc_votes':0, 'area':0}
        for node in b:
            sum_b['population'] += graph.nodes[node]['Tot_2020_vap']
            sum_b['wh_votes'] += graph.nodes[node]['Wh_2020_vap']
            sum_b['his_votes'] += graph.nodes[node]['His_2020_vap']
            sum_b['blc_votes'] += graph.nodes[node]['BlC_2020_vap']
            sum_b['natc_votes'] += graph.nodes[node]['NatC_2020_vap']
            sum_b['asnc_votes'] += graph.nodes[node]['AsnC_2020_vap']
            sum_b['pacc_votes'] += graph.nodes[node]['PacC_2020_vap']
            sum_b['area'] += graph.nodes[node]['geographicArea']
        var['popVar'].append(round(sum_b['population']/sum_gb['population'],3))
        var['whVar'].append(round(sum_b['wh_votes']/sum_gb['wh_votes'],3))
        var['hisVar'].append(round(sum_b['his_votes']/sum_gb['his_votes'],3))
        var['blcVar'].append(round(sum_b['blc_votes']/sum_gb['blc_votes'],3))
        var['natcVar'].append(round(sum_b['natc_votes']/sum_gb['natc_votes'],3))
        var['asncVar'].append(round(sum_b['asnc_votes']/sum_gb['asnc_votes'],3))
        var['paccVar'].append(round(sum_b['pacc_votes']/sum_gb['pacc_votes'],3))
        var['areaVar'].append(round(sum_b['area']/sum_gb['area'],3))
        
        
    return var 

def planTime(seed):
    random.seed(seed)
    chain = MarkovChain(
        proposal=proposal,
        constraints=[
            no_vanishing_districts,
            compactness_bound,
            # pop_constraint
        ],
        accept=accept.always_accept,
        initial_state=initial_partition,
        total_steps=STEPS
    )
    stepsTaken = 1
    variation = None
    elecData = None
    print("starting " + str(seed))
    for partition in chain:
        if (stepsTaken < STEPS):
            # print(stepsTaken)
            stepsTaken+=1
            continue
        variation = calc_var(initial_partition, partition)
        elecData = sorted(partition['election'].percents('Republican'))
        if(partition['election'].seats('Republican')>1):
            export_plan(initial_partition, partition, shapefile, "Republican Favored ("+str(partition['election'].seats('Republican'))+" wins)")

        elif(partition['election'].seats('Democratic')>2):
            export_plan(initial_partition, partition, shapefile, "Democratic Favored ("+str(partition['election'].seats('Democratic'))+" wins)")

        if (max(variation['popVar']) > 0.50):
            export_plan(initial_partition, partition, shapefile, "High population variation ("+str(round(max(variation['popVar']),2))+" max)")

        if(max(variation['areaVar']) > 0.80):
            export_plan(initial_partition, partition, shapefile, "High geographic variation ("+str(round(max(variation['areaVar']),2))+" max)")

        print("done " + str(seed))

    return variation, elecData

def reComTime():
    boxWhisker = {'elecData':[], 'popVar':[], 'whVar':[], 'hisVar':[], 'blcVar':[], 'natcVar':[], 'asncVar':[], 'paccVar':[], 'areaVar':[]}

    allNums =  range(ENSEMBLE_SIZE)
    badNums = {6, 23, 27, 54, 57, 63, 81, 88}
    p = mp.Pool(processes=CORES)
    results = [p.apply_async(planTime, args= (seed, )) for seed in allNums if seed not in badNums]
    # time.sleep(450)
    
    # if p.is_alive():
    #     print("process still running time to kill")

    # p.terminate()
    # print("terminated")
    # p.join()
    # print("joining")
    p.close()
    p.join()
    for result in results:
        variation = result.get()
        # print(variation[1])
        boxWhisker['elecData'].append(sorted(variation[1]))
        boxWhisker['popVar'].append(sorted(variation[0]['popVar']))
        boxWhisker['whVar'].append(sorted(variation[0]['whVar']))
        boxWhisker['hisVar'].append(sorted(variation[0]['hisVar']))
        boxWhisker['blcVar'].append(sorted(variation[0]['blcVar']))
        boxWhisker['natcVar'].append(sorted(variation[0]['natcVar']))
        boxWhisker['asncVar'].append(sorted(variation[0]['asncVar']))
        boxWhisker['paccVar'].append(sorted(variation[0]['paccVar']))
        boxWhisker['areaVar'].append(sorted(variation[0]['areaVar']))

    print("push into dataframe")
    election_data = pd.DataFrame(data = boxWhisker['elecData'])
    population_data = pd.DataFrame(data = boxWhisker['popVar'])
    wh_data = pd.DataFrame(data = boxWhisker['whVar'])
    his_data = pd.DataFrame(data = boxWhisker['hisVar'])
    blc_data = pd.DataFrame(data = boxWhisker['blcVar'])
    natc_data = pd.DataFrame(data = boxWhisker['natcVar'])
    asnc_data = pd.DataFrame(data = boxWhisker['asncVar'])
    pacc_data = pd.DataFrame(data = boxWhisker['paccVar'])
    area_data = pd.DataFrame(data = boxWhisker['areaVar'])

    electionBoxplotData = boxplot(election_data)
    populationBoxplotData = boxplot(population_data)
    whBoxplotData = boxplot(wh_data)
    hisBoxplotData = boxplot(his_data)
    blcBoxplotData = boxplot(blc_data)
    natcBoxplotData = boxplot(natc_data)
    asncBoxplotData = boxplot(asnc_data)
    paccBoxplotData = boxplot(pacc_data)
    areaBoxplotData = boxplot(area_data)

    print("Finished putting in the boxplot data")
    ensembleData = {
        "election":electionBoxplotData,
        "popVar":populationBoxplotData,
        "whVar":whBoxplotData,
        "hisVar":hisBoxplotData,
        "blcVar":blcBoxplotData,
        "natcVar":natcBoxplotData,
        "asncVar":asncBoxplotData,
        "paccVar":paccBoxplotData,
        "areaVar":areaBoxplotData
    }
    print("Generated Ensemble Data")
    with open('./ensemble.json', 'w') as f:
        json.dump(ensembleData, f)    


if __name__ == '__main__':
    print("=====SETTINGS=====")
    print("num cores:",CORES)
    print("num steps:",STEPS)
    print("num ensemble:",ENSEMBLE_SIZE)
    print()
    print("Nevada 2020 Graph Created")
    print("num nodes:",graph.number_of_nodes())
    reComTime()
else:
    print("parallel process running")
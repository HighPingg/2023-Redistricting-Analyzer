from gerrychain.random import random
variations=[]
highestPopVariation=0
highestPopVariationDF=None
highestGeoVariation=0
highestGeoVariationDF=None
mostRepublicanFavored=0
mostRepublicanFavoredDF=None
mostDemocraticFavored=0
mostDemocraticFavoredDF=None
elecDataRep=[]
elecDataDem=[]
MAX_SEED=100
for seed in range(1,MAX_SEED+1):
    print(seed)
    random.seed(seed)
    import signal
    import geopandas as gpd
    gpd.options.use_pygeos = False
    from gerrychain import GeographicPartition, Graph, MarkovChain, updaters, constraints, accept, Election
    from gerrychain.proposals import recom
    from functools import partial
    import numpy as np
    import pandas as pd
    import json
    
    class TimeoutException(Exception):   # Custom exception class
        pass

    def timeout_handler(signum, frame):   # Custom signal handler
        raise TimeoutException
    
    signal.signal(signal.SIGALRM, timeout_handler)

    shapefile = gpd.read_file(r'ILPrecinctsTest.geojson')
    shapefile = shapefile.to_crs(4326)

    shapefile['geometry'] = shapefile['geometry'].buffer(0.001)
    shapefile["Wh_2020_vap"] = shapefile["Wh_2020_vap"].fillna(0)
    shapefile["His_2020_vap"] = shapefile["His_2020_vap"].fillna(0)
    shapefile["BlC_2020_vap"] = shapefile["BlC_2020_vap"].fillna(0)
    shapefile["NatC_2020_vap"] = shapefile["NatC_2020_vap"].fillna(0)
    shapefile["AsnC_2020_vap"] = shapefile["AsnC_2020_vap"].fillna(0)
    shapefile["PacC_2020_vap"] = shapefile["PacC_2020_vap"].fillna(0)
    graph = Graph.from_geodataframe(shapefile)

    election = Election("election", {"Republican": "repVotes", "Democratic": "demVotes"}, alias="election")

    my_updaters = {"population": updaters.Tally("Tot_2020_vap", alias="population"), "wh_votes": updaters.Tally("Wh_2020_vap", alias="wh_votes"), 
                "his_votes": updaters.Tally("His_2020_vap", alias="his_votes"), "blc_votes": updaters.Tally("BlC_2020_vap", alias="blc_votes"), "natc_votes": updaters.Tally("NatC_2020_vap", alias="natc_votes"), 
                "asnc_votes": updaters.Tally("AsnC_2020_vap", alias="asnc_votes"), "pacc_votes": updaters.Tally("PacC_2020_vap", alias="pacc_votes"), "geoArea": updaters.Tally('geographicArea', alias="geoArea"),
                'election':election}

    initial_partition = GeographicPartition(graph, assignment="districtNum", updaters=my_updaters)

    # for district, pop in initial_partition["population"].items():
    #     print("District {}: {}".format(district, pop))

    compactness_bound = constraints.UpperBound(
        lambda p: len(p["cut_edges"]),
        2*len(initial_partition["cut_edges"])
    )

    ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)

    proposal = partial(recom,
                    pop_col="Tot_2020_vap",
                    pop_target=ideal_population,
                    epsilon=0.55,
                    node_repeats=2
                    )

    pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.50)

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

    chain = MarkovChain(
        proposal=proposal,
        constraints=[
            compactness_bound,
            pop_constraint
        ],
        accept=accept.always_accept,
        initial_state=initial_partition,
        total_steps=100
    )

    
    signal.alarm(20)
    try:
        for partition in chain.with_progress_bar():
            population = list(partition['population'].values())
            wh_votes = list(partition['wh_votes'].values())
            his_votes = list(partition['his_votes'].values())
            blc_votes = list(partition['blc_votes'].values())
            natc_votes = list(partition['natc_votes'].values())
            asnc_votes = list(partition['asnc_votes'].values())
            pacc_votes = list(partition['pacc_votes'].values())
            district_order = list(partition.parts.keys())
    except TimeoutException:
        print("seed does not work: " + str(seed))
        continue # continue the for loop if function A takes more than 5 second
    else:
        signal.alarm(0)
    elecDataRep.append(partition['election'].percents('Republican'))
    elecDataDem.append(partition['election'].percents('Democratic'))
    variation = calc_var(initial_partition, partition)
    variations.append(variation)
    popVar = np.average(variations[-1]['popVar'])
    print(popVar)
    areaVar = np.average(variations[-1]['areaVar'])
    print(areaVar)
    desc = None
    if popVar > highestPopVariation:
        highestPopVariation = popVar
        desc = "pop"
    if areaVar > highestGeoVariation:
        highestGeoVariation = areaVar
        desc = "geo"
    if partition['election'].seats('Democratic') > mostDemocraticFavored:
        mostDemocraticFavored = partition['election'].seats('Democratic')
        desc = "demo"
    if partition['election'].seats('Republican') > mostRepublicanFavored:
        mostRepublicanFavored = partition['election'].seats('Republican')
        desc = "rep"

    if desc != None:
        geometry = list()
        for district, subgraph in partition.subgraphs.items():
            distGeo = gpd.GeoDataFrame(columns=['district', 'node', 'geometry'])
            i = 0
            for node in subgraph.nodes:
                distGeo.loc[i] = [district, node, partition.graph.nodes[node]['geometry']]
                i += 1
            
            dissolved = distGeo.dissolve(by='district')
            geometry.append(dissolved.iloc[0]['geometry'])

        finalPlan = gpd.GeoDataFrame({
            'DISTRICT':int(district),
            'Tot_2020_vap':population[int(district)-1],
            'Wh_2020_vap':wh_votes[int(district)-1],
            'His_2020_vap':his_votes[int(district)-1],
            'BlC_2020_vap':blc_votes[int(district)-1],
            'NatC_2020_vap':natc_votes[int(district)-1],
            'AsnC_2020_vap':asnc_votes[int(district)-1],
            'PacC_2020_vap':pacc_votes[int(district)-1],
            'geometry':geometry[int(district)-1]
        } for district, subgraphs in partition.subgraphs.items()
        )

        if desc == "pop":
            highestPopVariationDF=finalPlan
        elif desc == "geo":
            highestGeoVariationDF=finalPlan
        elif desc == "demo":
            mostDemocraticFavoredDF=finalPlan
        elif desc == "rep":
            mostRepublicanFavoredDF=finalPlan
    # def boxplot(df):
    #     data = []
    #     outliers = []
    #     for column in df.columns:
    #         max = df[column].max()
    #         min = df[column].min()
    #         median = df[column].median()
    #         q1 = df[column].quantile(0.25)
    #         q3 = df[column].quantile(0.75)
    #         iqr = q3 - q1
    #         outlier = df[column][(df[column] < (q1 - 1.5 * iqr)) | (df[column] > (q3 + 1.5 * iqr))]
    #         data.append({
    #             'x':column,
    #             'y':[min,q1,median,q3,max],
    #         })
    #         for item in outlier:
    #             outliers.append({'x':column, 'y':item})
    #     box = {
    #         'name': 'box',
    #         'type':'boxPlot',
    #         'data': data,
            
    #     }
    #     scatter = {
    #         'name': 'outliers',
    #         'type':'scatter',
    #         'data': outliers,
    #     }
    #     return [box, scatter]
    
    # if seed == MAX_SEED:
    #     print("final seed")
    #     boxWhisker = {'elecData':[], 'popVar':[], 'whVar':[], 'hisVar':[], 'blcVar':[], 'natcVar':[], 'asncVar':[], 'paccVar':[], 'areaVar':[]}

    #     boxWhisker['popVar'].append(sorted(variation['popVar']))
    #     boxWhisker['whVar'].append(sorted(variation['whVar']))
    #     boxWhisker['hisVar'].append(sorted(variation['hisVar']))
    #     boxWhisker['blcVar'].append(sorted(variation['blcVar']))
    #     boxWhisker['natcVar'].append(sorted(variation['natcVar']))
    #     boxWhisker['asncVar'].append(sorted(variation['asncVar']))
    #     boxWhisker['paccVar'].append(sorted(variation['paccVar']))
    #     boxWhisker['areaVar'].append(sorted(variation['areaVar']))
    #     boxWhisker['elecData'].append(sorted(elecData))

    #     print("push into dataframe")
    #     election_data = pd.DataFrame(data = boxWhisker['elecData'])
    #     population_data = pd.DataFrame(data = boxWhisker['popVar'])
    #     wh_data = pd.DataFrame(data = boxWhisker['whVar'])
    #     his_data = pd.DataFrame(data = boxWhisker['hisVar'])
    #     blc_data = pd.DataFrame(data = boxWhisker['blcVar'])
    #     natc_data = pd.DataFrame(data = boxWhisker['natcVar'])
    #     asnc_data = pd.DataFrame(data = boxWhisker['asncVar'])
    #     pacc_data = pd.DataFrame(data = boxWhisker['paccVar'])
    #     area_data = pd.DataFrame(data = boxWhisker['areaVar'])

    #     electionBoxplotData = boxplot(election_data)
    #     populationBoxplotData = boxplot(population_data)
    #     whBoxplotData = boxplot(wh_data)
    #     hisBoxplotData = boxplot(his_data)
    #     blcBoxplotData = boxplot(blc_data)
    #     natcBoxplotData = boxplot(natc_data)
    #     asncBoxplotData = boxplot(asnc_data)
    #     paccBoxplotData = boxplot(pacc_data)
    #     areaBoxplotData = boxplot(area_data)

    #     print("Finished putting in the boxplot data")
    #     ensembleData = {
    #         "election":electionBoxplotData,
    #         "popVar":populationBoxplotData,
    #         "whVar":whBoxplotData,
    #         "hisVar":hisBoxplotData,
    #         "blcVar":blcBoxplotData,
    #         "natcVar":natcBoxplotData,
    #         "asncVar":asncBoxplotData,
    #         "paccVar":paccBoxplotData,
    #         "areaVar":areaBoxplotData
    #     }
    #     print("Generated Ensemble Data")
    #     with open('./ensembleIL.json', 'a') as f:
    #         json.dump(ensembleData, f) 

if type(highestPopVariationDF) != type(None):
    # print(highestPopVariationDF)
    highestPopVariationDF.to_file("Illinois Highest PopVar of " + str(highestPopVariation)+ ".geojson", driver="GeoJSON")
    print("pop done")
if type(highestGeoVariationDF) != type(None):
    # print(highestGeoVariationDF)
    highestGeoVariationDF.to_file("Illinois Highest GeoVar of " + str(highestGeoVariation)+".geojson", driver="GeoJSON")
    print("geo done")
if type(mostDemocraticFavoredDF) != type(None):
    # print(mostDemocraticFavoredDF)
    mostDemocraticFavoredDF.to_file("Illinois Democratic Favored " + str(mostDemocraticFavored) + " seats.geojson", driver="GeoJSON")
    print("demo done")
if type(mostRepublicanFavoredDF) != type(None):
    # print(mostRepublicanFavoredDF)
    mostRepublicanFavoredDF.to_file("Illinois Republic Favored " + str(mostRepublicanFavored) + " seats.geojson", driver="GeoJSON")
    print("rep done")


print(variations)
f = open('ILVariations.json', 'w')
f.write(variations)
f.close()

print(elecDataRep)
print()
print(elecDataDem)
with open('ILElecRep.txt', 'w') as f:
    f.writelines(elecDataRep)

with open('ILElecDem.txt', 'w') as f:
    f.writelines(elecDataDem)
import geopandas as gpd
gpd.options.use_pygeos = False
import datetime
import matplotlib.pyplot as plt
from functools import partial
from gerrychain.updaters import Tally
from gerrychain.proposals import recom
from gerrychain import GeographicPartition, Graph, MarkovChain, updaters, constraints, accept
from gerrychain.constraints import no_vanishing_districts

shapefile = gpd.read_file('ILPrecincts.geojson')

shapefile['geometry'] = shapefile['geometry'].buffer(0.001)
shapefile = shapefile.to_crs(4326)
# shapefile["Wh_2020_vap"] = shapefile["Wh_2020_vap"].fillna(0)
# shapefile["His_2020_vap"] = shapefile["His_2020_vap"].fillna(0)
# shapefile["BlC_2020_vap"] = shapefile["BlC_2020_vap"].fillna(0)
# shapefile["NatC_2020_vap"] = shapefile["NatC_2020_vap"].fillna(0)
# shapefile["AsnC_2020_vap"] = shapefile["AsnC_2020_vap"].fillna(0)
# shapefile["PacC_2020_vap"] = shapefile["PacC_2020_vap"].fillna(0)
graph = Graph.from_geodataframe(shapefile)

my_updaters = {"population": updaters.Tally("Tot_2020_vap", alias="population"), "wh_votes": updaters.Tally("Wh_2020_vap", alias="wh_votes"),
               "his_votes": updaters.Tally("His_2020_vap", alias="his_votes"), "blc_votes": updaters.Tally("BlC_2020_vap", alias="blc_votes"), "natc_votes": updaters.Tally("NatC_2020_vap", alias="natc_votes"),
               "asnc_votes": updaters.Tally("AsnC_2020_vap", alias="asnc_votes"), "pacc_votes": updaters.Tally("PacC_2020_vap", alias="pacc_votes"), "geoArea": updaters.Tally('geographicArea', alias="geoArea")}

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
                   epsilon=0.5,
                   node_repeats=2
                   )

pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.50)

chain = MarkovChain(
    proposal=proposal,
    constraints=[
        no_vanishing_districts,
        compactness_bound,
        pop_constraint
    ],
    accept=accept.always_accept,
    initial_state=initial_partition,
    total_steps=1000
)

for partition in chain.with_progress_bar():
    population = list(partition['population'].values())
    wh_votes = list(partition['wh_votes'].values())
    his_votes = list(partition['his_votes'].values())
    blc_votes = list(partition['blc_votes'].values())
    natc_votes = list(partition['natc_votes'].values())
    asnc_votes = list(partition['asnc_votes'].values())
    pacc_votes = list(partition['pacc_votes'].values())
    district_order = list(partition.parts.keys())

geometry = list()
for district, subgraph in partition.subgraphs.items():
    distGeo = gpd.GeoDataFrame(columns=['district', 'node', 'geometry'])
    i = 0
    for node in subgraph.nodes:
        # geometrySeries = gpd.GeoSeries(partition.graph.nodes[node]['geometry'])
        # print(str(geometrySeries.dtype))
        print(partition.graph.nodes[node]['geometry'].geom_type)
        distGeo.loc[i] = [district, node,
                          partition.graph.nodes[node]['geometry']]
        i += 1

    dissolved = distGeo.dissolve(by='district')
    geometry.append(dissolved.iloc[0]['geometry'])

finalPlan = gpd.GeoDataFrame({
    'DISTRICT': int(district),
    'Tot_2020_vap': population[int(district)-1],
    'Wh_2020_vap': wh_votes[int(district)-1],
    'His_2020_vap': his_votes[int(district)-1],
    'BlC_2020_vap': blc_votes[int(district)-1],
    'NatC_2020_vap': natc_votes[int(district)-1],
    'AsnC_2020_vap': asnc_votes[int(district)-1],
    'PacC_2020_vap': pacc_votes[int(district)-1],
    'geometry': geometry[int(district)-1]
} for district, subgraphs in partition.subgraphs.items()
)

for vote in wh_votes:
    print(vote)

# finalPlan = finalPlan.to_crs(4326)

finalPlan.to_file(str(datetime.datetime.now()) +
                  ' IL2020Seawulf.geojson', driver="GeoJSON")

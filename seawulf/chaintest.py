import geopandas as gpd
gpd.options.use_pygeos = False
from gerrychain import GeographicPartition, Partition, Graph, MarkovChain, proposals, updaters, constraints, accept, Election
from gerrychain.proposals import flip, recom, propose_random_flip
from gerrychain.updaters import cut_edges, Tally
from gerrychain.accept import always_accept
from gerrychain.constraints import single_flip_contiguous
import pandas
import numpy as np
from functools import partial
import matplotlib.pyplot as plt

shapefile = gpd.read_file(r'OhioPrecincts.geojson')

shapefile['geometry'] = shapefile['geometry'].buffer(0.001)

graph = Graph.from_geodataframe(shapefile)

my_updaters = {"population": updaters.Tally("Tot_2020_cvap", alias="population"), "wh_votes": updaters.Tally("Wh_2020_cvap", alias="wh_votes"), 
               "his_votes": updaters.Tally("His_2020_cvap", alias="his_votes"), "blc_votes": updaters.Tally("BlC_2020_cvap", alias="blc_votes"), "natc_votes": updaters.Tally("NatC_2020_cvap", alias="natc_votes"), 
               "asnc_votes": updaters.Tally("AsnC_2020_cvap", alias="asnc_votes"), "pacc_votes": updaters.Tally("PacC_2020_cvap", alias="pacc_votes"), "geoArea": updaters.Tally('geographicArea', alias="geoArea")}

initial_partition = GeographicPartition(graph, assignment="districtNum", updaters=my_updaters)

for district, pop in initial_partition["population"].items():
    print("District {}: {}".format(district, pop))

compactness_bound = constraints.UpperBound(
    lambda p: len(p["cut_edges"]),
    2*len(initial_partition["cut_edges"])
)

ideal_population = sum(initial_partition["population"].values()) / len(initial_partition)

proposal = partial(recom,
                   pop_col="Tot_2020_cvap",
                   pop_target=ideal_population,
                   epsilon=0.02,
                   node_repeats=2
                  )

pop_constraint = constraints.within_percent_of_ideal_population(initial_partition, 0.10)

chain = MarkovChain(
    proposal=proposal,
    constraints=[
        compactness_bound,
        pop_constraint
    ],
    accept=accept.always_accept,
    initial_state=initial_partition,
    total_steps=10
)

for partition in chain:
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
        distGeo.loc[i] = [district, node, partition.graph.nodes[node]['geometry']]
        i += 1
    
    dissolved = distGeo.dissolve(by='district')
    geometry.append(dissolved.iloc[0]['geometry'])

finalPlan = gpd.GeoDataFrame({
    'districtNum':district,
    'Tot_2020_cvap':population[int(district)-1],
    'Wh_2020_cvap':wh_votes[int(district)-1],
    'His_2020_cvap':his_votes[int(district)-1],
    'BlC_2020_cvap':blc_votes[int(district)-1],
    'NatC_2020_cvap':natc_votes[int(district)-1],
    'AsnC_2020_cvap':asnc_votes[int(district)-1],
    'PacC_2020_cvap':pacc_votes[int(district)-1],
    'geometry':geometry[int(district)-1]
} for district, subgraphs in partition.subgraphs.items()
)

finalPlan.to_file('Ohio2020Seawulf.geojson', driver="GeoJSON")
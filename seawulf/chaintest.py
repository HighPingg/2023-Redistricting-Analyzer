import geopandas as gpd
from gerrychain import GeographicPartition, Partition, Graph, MarkovChain, proposals, updaters, constraints, accept, Election
from gerrychain.proposals import flip, recom
import pandas
import numpy

shapefile = gpd.read_file(r'C:\Users\mamun\Documents\2023-Redistricting-Analyser-Seawulf\nv test\tl_2020_32_cd116.shp')
# shapefile = gpd.read_file(r'C:\Users\mamun\Documents\2023-Redistricting-Analyser-Seawulf\Nevada 2020\NV_PRECINCTS.geojson')
# shapefile = gpd.read_file(r'C:\Users\mamun\Documents\2023-Redistricting-Analyser-Seawulf\test.json')
# shapefile['id']=numpy.arange(start=0, stop=2094,step=1)
# id=0
# for i in shapefile['geometry']:
#     setattr(i, 'id', id)
# #     # i.id = id
#     id+=1

# graph = Graph.from_file(r'C:\Users\mamun\Documents\2023-Redistricting-Analyser-Seawulf\Nevada 2020\NV_PRECINCTS.geojson', ignore_errors=True)
graph = Graph.from_geodataframe(shapefile, ignore_errors=True)

num_districts = 4

elections = [Election("G20PRE",{"Democratic":"G20PREDBID", "Republican":"G20PRERTRU", "Libertarian": "G20PRELJOR", "Independent American":"G20PREIBLA", "None":"G20PREONON"})]

init_assignment = {i: i % num_districts for i in shapefile.index}

partition = GeographicPartition(shapefile, init_assignment)

proposal = flip

acceptance = accept.cut_edge_accept

chain = MarkovChain(
    proposal=proposal,
    constraints=None,
    accept=acceptance,
    initial_state=partition,
    total_steps=1000
)

for partition in chain:
    pass

shapefile['district'] = [partition.assignment[i] for i in shapefile.index]

shapefile.plot(column='district', cmap='tab10')
import geopandas as gpd
import pandas as pd
import numpy as np
# import pygeos
# import maup

from collections import defaultdict

def initializeData(fileName):
    df = gpd.read_file(fileName)                        # Import GeoJSON
    df = df.to_crs(3857)                                # Convert CRS
    df['geometry'] = maup.close_gaps(df)                # Close gaps in GeoJSON
    df['geometry'] = maup.resolve_overlaps(df)          # Fix overlaps

    return df

def getNeighbors(df):
    bufferedDF = df.copy()
    bufferedDF['geometry'] = bufferedDF['geometry'].buffer(60.96)

    # Iterate through all intersections and populate dictionary set
    intersections = df.overlay(bufferedDF, how='intersection')
    neighbors = defaultdict(set)
    for i in range(intersections.shape[0]):
        if intersections['VTDST20_1'][i] != intersections['VTDST20_2'][i]:
            neighbors[intersections['VTDST20_1'][i]].add(intersections['VTDST20_2'][i])
    
    # Combine sets in dictionary to an array of neighbors
    arr = []
    for i in range(df.shape[0]):
       arr.append(','.join(neighbors[df['VTDST20'][i]]))
    
    return arr

def exportToFile(df, fileName):
    df.to_file(fileName, driver="GeoJSON")

def separateDistricts(precincts, districts):
    separated = [set() for _ in range(districts.shape[0])]

    intersections = districts.overlay(precincts, how='intersection')
    for i in range(intersections.shape[0]):
        separated[intersections["DISTRICT"][i] - 1].add(intersections["VTDST20"][i])

    # Resolve precincts in multiple districts conflicts
    for i in range(len(separated)):
        for j in range(len(separated)):
            if i != j:
                for vid in separated[i].intersection(separated[j]):
                    iValue = intersections[(intersections["DISTRICT"] == i + 1) & (intersections["VTDST20"] == vid)]['geometry'].area.values[0]
                    jValue = intersections[(intersections["DISTRICT"] == j + 1) & (intersections["VTDST20"] == vid)]['geometry'].area.values[0]

                    if iValue < jValue:
                        separated[i].remove(vid)
                    else:
                        separated[j].remove(vid)
    
    return separated

def pushPopulationData(precinctinfo, precincts):
    keep_columns = list(precincts.columns)
    keep_columns.extend(['Tot_2020_vap','Wh_2020_vap','His_2020_vap','BlC_2020_vap','NatC_2020_vap','AsnC_2020_vap','PacC_2020_vap'])
    precincts = pd.merge(precincts, precinctinfo,how='left', left_on='GEOID20', right_on='GEOID20')
    precincts = precincts.loc[:, keep_columns]
    return precincts

def findGeoVar(precincts, dist2020, dist2022):
    for i in range(len(dist2022)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2022[i] - dist2022[i].intersection(dist2020[i]):
            numerator += precincts[precincts["VTDST20"] == precinct]['geometry'].area.values[0]
        
        denominator = 0
        for precinct in dist2020[i]:
            denominator += precincts[precincts["VTDST20"] == precinct]['geometry'].area.values[0]
        
        print(numerator / denominator)

def findPopulationVar(precincts, dist2020, dist2022):
    for i in range(len(dist2022)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2022[i] - dist2022[i].intersection(dist2020[i]):
            numerator += precincts[precincts["VTDST20"] == precinct]['Tot_2020_vap'].values[0]
        
        denominator = 0
        for precinct in dist2020[i]:
            denominator += precincts[precincts["VTDST20"] == precinct]['Tot_2020_vap'].values[0]
        
        print(numerator / denominator)

def addInDistrictNum(precincts, sepDist):
    for district in range(len(sepDist)):
        for precinct in sepDist[district]:
            precincts.loc[precincts["VTDST20"] == precinct, 'districtNum'] = district+1
            # precincts[precincts["VTDST20"] == precinct]['districtNum'] = district
    return precincts

def addInArea(precincts):
    for index, row in precincts.iterrows():
        precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'geographicArea'] = row['geometry'].area

    return precincts

# precincts = gpd.read_file('preprocessing/GeoJSON/OH_PRECINCTS_FIXED.json')
# precincts = precincts.to_crs(3857)

# df['NEIGHBORS'] = getNeighbors(df)
# print(df['NEIGHBORS'].to_string())
# vid = df['VTDST20'].tolist()
# neighbors = df['NEIGHBORS'].tolist()
# for v, n in zip(vid, neighbors):
#     print(v, n)

precincts = gpd.read_file('preprocessing/GeoJSON/OH_PRECINCTS_FIXED.json')
districts2020 = gpd.read_file('preprocessing/GeoJSON/oh_pl2020.json')
districts2022 = gpd.read_file('preprocessing/GeoJSON/ohio_21.json')
precinct_info = pd.read_csv('preprocessing/2020_census_OH-3.csv')
districts2020 = districts2020.to_crs(3857)
districts2022 = districts2022.to_crs(3857)
sep_dis2020 = separateDistricts(precincts, districts2020) # seperated distrcits for 2020
sep_dis2022 = separateDistricts(precincts, districts2022) #for 2022


precincts = pushPopulationData(precinct_info, precincts) #set the population
precincts["Tot_2020_vap"] = precincts["Tot_2020_vap"].fillna(0)
findGeoVar(precincts, sep_dis2020, sep_dis2022)
findPopulationVar(precincts, sep_dis2020, sep_dis2022)
precincts = addInDistrictNum(precincts, sep_dis2020)
precincts = addInArea(precincts)

exportToFile(precincts, "OhioPrecincts.geojson")

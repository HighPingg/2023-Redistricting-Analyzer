import geopandas as gpd
gpd.options.use_pygeos = False
import pandas as pd
import numpy as np
import json
# import pygeos
import maup

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

def pushElectionData(electionPerPrecinct, precincts, seperatedDistricts):
    repubVotes = []
    demoVotes = []
    for districtNum in range(len(seperatedDistricts)):
        repubVotes.append(int(electionPerPrecinct["Republican"].values[districtNum]/len(seperatedDistricts[districtNum])))
        demoVotes.append(int(electionPerPrecinct["Democratic"].values[districtNum]/len(seperatedDistricts[districtNum])))
    for district in range(len(seperatedDistricts)):
        for precinct in seperatedDistricts[district]:
            precincts.loc[precincts["VTDST20"] == precinct, "demVotes"] = demoVotes[district]
            precincts.loc[precincts["VTDST20"] == precinct, "repVotes"] = repubVotes[district]
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
            precincts.loc[precincts["VTDST20"] == precinct, 'districtNum'] = int(district+1)
            # precincts[precincts["VTDST20"] == precinct]['districtNum'] = district
    return precincts

def addInArea(precincts):
    for index, row in precincts.iterrows():
        precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'geographicArea'] = row['geometry'].area

    return precincts

# def changeToInt(precincts):
#     for index, row in precincts.iterrows():
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'Tot_2020_vap'] = int(row['Tot_2020_vap'])
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'Wh_2020_vap'] = int(row['Wh_2020_vap'])
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'His_2020_vap'] = int(row['His_2020_vap'])
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'BlC_2020_vap'] = int(row['BlC_2020_vap'])
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'NatC_2020_vap'] = int(row['NatC_2020_vap'])
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'AsnC_2020_vap'] = int(row['AsnC_2020_vap'])
#         precincts.loc[precincts["VTDST20"] == row["VTDST20"], 'PacC_2020_vap'] = int(row['PacC_2020_vap'])

#     return precincts

def parseElecData(filename):
    elecData = pd.DataFrame(columns=["Republican", "Democratic"])
    f = open(filename)

    data = json.load(f)

    for district in data:
        elecDict={}
        for candidate in district["candidates"]:
            if candidate['party'] == "Republican":
                elecDict['Republican'] = candidate["totalVotes"]
            elif candidate['party'] == "Democratic":
                elecDict['Democratic'] = candidate["totalVotes"]
        elecData.loc[len(elecData)] = elecDict

    return elecData

def findDemocraticVotes(precincts, dist2020):
    arr = []
    for i in range(len(dist2020)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2020[i]:
            numerator += precincts[precincts["VTDST20"] == precinct]['demVotes'].values[0]
        arr.append(numerator)
    return arr

def findRepVotes(precincts, dist2020):
    arr = []
    for i in range(len(dist2020)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2020[i]:
            numerator += precincts[precincts["VTDST20"] == precinct]['repVotes'].values[0]

        arr.append(numerator)
    return arr

def findSafeSeats(demVotes, repVotes):
    safeSeats = []
    for i in range(len(demVotes)):
        print("Dem Votes: " + str(demVotes[i]) + " Rep Votes: " + str(repVotes[i]))
        if (demVotes[i]-repVotes[i])/(repVotes[i]+demVotes[i]) > .1:
            safeSeats.append('D')
        elif repVotes[i] > demVotes[i]*1.1:
            safeSeats.append('R')
        else:
            safeSeats.append('N')
    return safeSeats


# precincts = gpd.read_file('preprocessing/GeoJSON/OH_PRECINCTS_FIXED.json')
# precincts = precincts.to_crs(3857)

# df['NEIGHBORS'] = getNeighbors(df)
# print(df['NEIGHBORS'].to_string())
# vid = df['VTDST20'].tolist()
# neighbors = df['NEIGHBORS'].tolist()
# for v, n in zip(vid, neighbors):
#     print(v, n)

# precincts = initializeData('preprocessing\GeoJSON\IL_PRECINCTS.geojson')
# districts2020 = gpd.read_file('preprocessing\GeoJSON\il_pl2020.json')
# # districts2022 = gpd.read_file('preprocessing/GeoJSON/ohio_21.json')
# precinct_info = pd.read_csv('preprocessing/2020_census_IL-3.csv')
# districts2020 = districts2020.to_crs(3857)
# # districts2022 = districts2022.to_crs(3857)
# sep_dis2020 = separateDistricts(precincts, districts2020) # seperated distrcits for 2020
# # sep_dis2022 = separateDistricts(precincts, districts2022) #for 2022

# elecData = parseElecData(r"preprocessing\IL2020.json")

# precincts = pushPopulationData(precinct_info, precincts) #set the population
# precincts["Tot_2020_vap"] = precincts["Tot_2020_vap"].fillna(0)
# precincts["Wh_2020_vap"] = precincts["Wh_2020_vap"].fillna(0)
# precincts["His_2020_vap"] = precincts["His_2020_vap"].fillna(0)
# precincts["BlC_2020_vap"] = precincts["BlC_2020_vap"].fillna(0)
# precincts["NatC_2020_vap"] = precincts["NatC_2020_vap"].fillna(0)
# precincts["AsnC_2020_vap"] = precincts["AsnC_2020_vap"].fillna(0)
# precincts["PacC_2020_vap"] = precincts["PacC_2020_vap"].fillna(0)
# # findGeoVar(precincts, sep_dis2020, sep_dis2022)
# # findPopulationVar(precincts, sep_dis2020, sep_dis2022)
# precincts = addInDistrictNum(precincts, sep_dis2020)
# precincts = addInArea(precincts)
# precincts = pushElectionData(elecData, precincts, sep_dis2020)
# precincts["Tot_2020_vap"] = precincts["Tot_2020_vap"].astype(int)
# precincts["Wh_2020_vap"] = precincts["Wh_2020_vap"].astype(int)
# precincts["His_2020_vap"] = precincts["His_2020_vap"].astype(int)
# precincts["BlC_2020_vap"] = precincts["BlC_2020_vap"].astype(int)
# precincts["NatC_2020_vap"] = precincts["NatC_2020_vap"].astype(int)
# precincts["AsnC_2020_vap"] = precincts["AsnC_2020_vap"].astype(int)
# precincts["PacC_2020_vap"] = precincts["PacC_2020_vap"].astype(int)

# exportToFile(precincts, "ILPrecinctsTest.geojson")

precincts = gpd.read_file('OHPrecinctsTest.geojson')
districtsPop = gpd.read_file(r'GeoJSON\Ohio_Highest_PopVar_of_0.49225.geojson')
districtsGeo = gpd.read_file(r'GeoJSON\Ohio_Highest_GeoVar_of_0.5349375000000001.geojson')

precincts = precincts.to_crs(3857)
districtsGeo = districtsGeo.to_crs(3857)
districtsPop = districtsPop.to_crs(3857)

sepDistPop = separateDistricts(precincts, districtsPop)
sepDistGeo = separateDistricts(precincts, districtsGeo)

popDem = findDemocraticVotes(precincts, sepDistPop)
popRep = findRepVotes(precincts, sepDistPop)

geoDem = findDemocraticVotes(precincts, sepDistGeo)
geoRep = findRepVotes(precincts, sepDistGeo)

safeSeatsPop = findSafeSeats(popDem, popRep)
safeSeatsGeo = findSafeSeats(geoDem, geoRep)



with open('OHSafeSeatsMostPopulation.txt', 'w') as f:
    json.dump(safeSeatsPop, f)

with open('OHSafeSeatsMostGeographic.txt', 'w') as f:
    json.dump(safeSeatsGeo, f)

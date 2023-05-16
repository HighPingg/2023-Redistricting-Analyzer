with open('GeoJSON/Ohio/OHVariation.json') as f:
    var = eval(f.read())

import pandas as pd
import geopandas as gpd


OH_INC_PREC = {
    '083ADE': 'Steve Chabot',
    '031ADB': 'Brad Wenstrup',
    '025AHI': 'Joyce Beatty',
    '039ACO': 'Jim Jordan',
    '048AVK': 'Bob Latta',
    '050APS': 'Bill Johnson',
    '003AAU': 'Bob Gibbs',
    '009AIT': 'Warren Davidson',
    '048AJW': 'Marcy Kaptur',
    '057AOE': 'Mike Turner',
    '018DES': 'Marcia Fudge',
    '021AAD': 'Troy Balderson',
    '078AAX': 'Tim Ryan',
    '028AAN': 'David Joyce',
    '065AAC': 'Steve Stivers',
    '018CJE': 'Anthony Gonzalez'
}

OH_INC_DIS = {
    1: 'Steve Chabot',
    2: 'Brad Wenstrup',
    3: 'Joyce Beatty',
    4: 'Jim Jordan',
    5: 'Bob Latta',
    6: 'Bill Johnson',
    7: 'Bob Gibbs',
    8: 'Warren Davidson',
    9: 'Marcy Kaptur',
    10: 'Mike Turner',
    11: 'Marcia Fudge',
    12: 'Troy Balderson',
    13: 'Tim Ryan',
    14: 'David Joyce',
    15: 'Steve Stivers',
    16: 'Anthony Gonzalez'
}

IL_INC_PREC = {
    '018019': 'Bobby Rush',
    '008050': 'Robin Kelly',
    '790038': 'Marie Newman',
    '031034': 'Jesús "Chuy" García',
    '009120': 'Mike Quigley',
    '005066': 'Sean Casten',
    '011014': 'Danny K. Davis',
    '009136': 'Raja Krishnamoorthi',
    '810018': 'Jan Schakowsky',
    '810006': 'Brad Schneider',
    '004118': 'Bill Foster',
    '000023': 'Mike Bost',
    '000304': 'Rodney Davis',
    'Wau333': 'Lauren Underwood',
    '00LAM1': 'Mary Miller',
    '00OT13': 'Adam Kinzinger',
    '00PE28': 'Cheri Bustos',
    'COB038': 'Darin LaHood'
}

IL_INC_DIS = {
    1: 'Bobby Rush',
    2: 'Robin Kelly',
    3: 'Marie Newman',
    4: 'Jesús "Chuy" García',
    5: 'Mike Quigley',
    6: 'Sean Casten',
    7: 'Danny K. Davis',
    8: 'Raja Krishnamoorthi',
    9: 'Jan Schakowsky',
    10: 'Brad Schneider',
    11: 'Bill Foster',
    12: 'Mike Bost',
    13: 'Rodney Davis',
    14: 'Lauren Underwood',
    15: 'Mary Miller',
    16: 'Adam Kinzinger',
    17: 'Cheri Bustos',
    18: 'Darin LaHood'
}

NV_INC_PREC = {
    '006605CLK': 'Dina Titus',
    '000027DOU': 'Mark Amodel',
    '007702CLK': 'Susie Lee',
    '002722CLK': 'Steven Horsford'
}

NV_INC_DIS = {
    1: 'Dina Titus',
    2: 'Mark Amodel',
    3: 'Susie Lee',
    4: 'Steven Horsford'
}

# Output JSON
def outputJSON(name, incumbentDistricts, var, incumbentVar):
    with open(f'{name}', 'w') as f:
        f.write('{')
        f.write(f'"graphTitle": "{name}",')
        f.write('"graphSeries": [')
        f.write('{')
        f.write('"type": "boxPlot",')
        f.write('"data": [')

        for i, incumbent in enumerate(incumbentDistricts):
            if incumbent != None:
                f.write('{')

                f.write(f'\"x\": \"{incumbent}\",')
                f.write(f'\"y\": {var[i]}')

                f.write('},')

        f.write(']')
        f.write('},')
        f.write('{')
        f.write('"type": "scatter",')
        f.write('"data": [')

        for i, incumbent in enumerate(incumbentDistricts):
            if incumbent != None:
                f.write('{')

                f.write(f'\"x\": \"{incumbent}\",')
                f.write(f'\"y\": {incumbentVar[i]}')

                f.write('},')
        f.write(']}]}')

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

def findPopulationVar(precincts, dist2020, dist2022):
    arr = []
    for i in range(len(dist2022)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2022[i] - dist2020[i]:
            numerator += precincts[precincts["VTDST20"] == precinct]['Tot_2020_vap'].values[0]
        
        denominator = 0
        for precinct in dist2022[i].union(dist2020[i]):
            denominator += precincts[precincts["VTDST20"] == precinct]['Tot_2020_vap'].values[0]
        
        arr.append(numerator / denominator)
    return arr

def findDemocratVar(precincts, dist2020, dist2022):
    arr = []
    for i in range(len(dist2022)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2022[i] - dist2020[i]:
            numerator += precincts[precincts["VTDST20"] == precinct]['demVotes'].values[0]
        
        denominator = 0
        for precinct in dist2022[i].union(dist2020[i]):
            denominator += precincts[precincts["VTDST20"] == precinct]['demVotes'].values[0]
        
        arr.append(numerator / denominator)
    return arr

def findRepVar(precincts, dist2020, dist2022):
    arr = []
    for i in range(len(dist2022)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2022[i] - dist2020[i]:
            numerator += precincts[precincts["VTDST20"] == precinct]['repVotes'].values[0]
        
        denominator = 0
        for precinct in dist2022[i].union(dist2020[i]):
            denominator += precincts[precincts["VTDST20"] == precinct]['repVotes'].values[0]
        
        arr.append(numerator / denominator)
    return arr

def findGeoVar(precincts, dist2020, dist2022):
    arr = []
    for i in range(len(dist2022)):
        # Sum all area precincts in 2022 plan
        numerator = 0
        for precinct in dist2022[i] - dist2020[i]:
            numerator += precincts[precincts["VTDST20"] == precinct]['geometry'].area.values[0]
        
        denominator = 0
        for precinct in dist2022[i].union(dist2020[i]):
            denominator += precincts[precincts["VTDST20"] == precinct]['geometry'].area.values[0]
        
        arr.append(numerator / denominator)
    return arr

NUMDISTRICTS = 16
popVar = [[] for _ in range(NUMDISTRICTS)]
geoVar = [[]for _ in range(NUMDISTRICTS)]
# demVar = [[]for _ in range(NUMDISTRICTS)]
# repVar = [[]for _ in range(NUMDISTRICTS)]

# Split data
for i, iteration in enumerate(var):
    for district in range(len(iteration['popVar'])):
        popVar[district].append(iteration['popVar'][district])
        geoVar[district].append(iteration['areaVar'][district])



# Turn all of them to series and get three number summary
for i, variations in enumerate(popVar):
    quartiles = pd.Series(variations).quantile([0.25,0.5,0.75])
    popVar[i] = [min(variations), quartiles[0.25], quartiles[0.5], quartiles[0.75], max(variations)]


for i, variations in enumerate(geoVar):
    quartiles = pd.Series(variations).quantile([0.25,0.5,0.75])
    geoVar[i] = [min(variations), quartiles[0.25], quartiles[0.5], quartiles[0.75], max(variations)]


# Find individual population variations of incumbents
precincts = gpd.read_file('GeoJSON/OHPrecinctsTest.geojson')
districts2020 = gpd.read_file('GeoJSON/oh_pl2020.json').to_crs(3857)
randomPlan = gpd.read_file('GeoJSON/Ohio/Ohio_Highest_GeoVar_of_0.5349375000000001.geojson').to_crs(3857)

sepDistricts2020 = separateDistricts(precincts, districts2020)
sepRandomPlan = separateDistricts(precincts, randomPlan)

incumbentPopVar = findPopulationVar(precincts, sepDistricts2020, sepRandomPlan)
incumbentGeoVar = findGeoVar(precincts, sepDistricts2020, sepRandomPlan)

# Map incumbents to district
incumbentDistricts = []
for i, districts in enumerate(sepRandomPlan):
    incumbentIDs = list(set(OH_INC_PREC.keys()).intersection(districts))

    if len(incumbentIDs) > 0:
        incumbentDistricts.append(OH_INC_PREC[incumbentIDs[0]])
    else:
        incumbentDistricts.append(None)
print(incumbentDistricts)
# Output JSON
outputJSON('Population Difference by Incumbent', incumbentDistricts, popVar, incumbentPopVar)
outputJSON('Geographic Difference by Incumbent', incumbentDistricts, geoVar, incumbentGeoVar)
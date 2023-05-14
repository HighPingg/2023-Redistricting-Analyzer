import geopandas as gpd
import random

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

precincts = gpd.read_file('GeoJSON/OH_PRECINCTS_FIXED.json')
districts2020 = gpd.read_file('GeoJSON/oh_pl2020.json').to_crs(3857)
# randomDists = gpd.read_file('GeoJSON/oh_randomPlan.json').to_crs(3857)

# # Get Random home district for incumbent
# for districts in separateDistricts(precincts, districts2020):
#     print(random.sample(districts, 1)[0])

# Identify which district has which incumbent based on home precinct
# for i, districts in enumerate(separateDistricts(precincts, randomDists)):
#     incumbentIDs = list(set(OH_INC_PREC.keys()).intersection(districts))
#     print(f"District: {i + 1} - {OH_INC_PREC[incumbentIDs[0]]}")

# Add incumbent home data to plan
homePrecinctField = []
incumbent = []
splittedDistricts = separateDistricts(precincts, districts2020)

found = []

for vtdst in precincts['VTDST20']:
    foundDis = False

    for districtNum, district in enumerate(splittedDistricts):
        if vtdst in district:
            homePrecinctField.append(vtdst in OH_INC_PREC.keys() and districtNum not in found)
            incumbent.append(OH_INC_DIS[districtNum + 1])

            if vtdst in OH_INC_PREC.keys() and districtNum not in found:
                found.append(districtNum)
            foundDis = True
            break
    if not foundDis:
        print('PANIC')

precincts['isHomePrecinct'] = homePrecinctField
precincts['Incumbent'] = incumbent

print(precincts[precincts['isHomePrecinct']])

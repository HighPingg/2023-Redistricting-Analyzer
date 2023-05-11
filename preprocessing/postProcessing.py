import geopandas as gpd
import random

OH_INC_DIS = {
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
randomDists = gpd.read_file('GeoJSON/oh_randomPlan.json').to_crs(3857)

# # Get Random home district for incumbent
# for districts in separateDistricts(precincts, districts2020):
#     print(random.sample(districts, 1)[0])

# Identify which district has which incumbent based on home precinct
for i, districts in enumerate(separateDistricts(precincts, randomDists)):
    incumbentIDs = list(set(OH_INC_DIS.keys()).intersection(districts))
    print(f"District: {i + 1} - {OH_INC_DIS[incumbentIDs[0]]}")

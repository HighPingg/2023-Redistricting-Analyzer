import geopandas as gpd
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

precincts = gpd.read_file('GeoJSON/OH_PRECINCTS_FIXED.json')
districts = gpd.read_file('GeoJSON/oh_pl2020.json')
districts = districts.to_crs(3857)

# df['NEIGHBORS'] = getNeighbors(df)
separateDistricts(precincts, districts)
# print(df['NEIGHBORS'].to_string())
#079AEM
# vid = df['VTDST20'].tolist()
# neighbors = df['NEIGHBORS'].tolist()
# for v, n in zip(vid, neighbors):
#     print(v, n)
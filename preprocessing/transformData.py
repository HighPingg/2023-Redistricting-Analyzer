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

df = gpd.read_file('GeoJSON/OH_PRECINCTS_FIXED.json')
df['NEIGHBORS'] = getNeighbors(df)

print(df['NEIGHBORS'].to_string())
#079AEM
# vid = df['VTDST20'].tolist()
# neighbors = df['NEIGHBORS'].tolist()
# for v, n in zip(vid, neighbors):
#     print(v, n)
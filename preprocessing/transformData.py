import geopandas as gpd
import maup

def initializeData(fileName):
    df = gpd.read_file(fileName)                        # Import GeoJSON
    df = df.to_crs(3857)                                # Convert CRS
    df['geometry'] = maup.close_gaps(df)                # Close gaps in GeoJSON
    df['geometry'] = maup.resolve_overlaps(df)          # Fix overlaps

    return df

def getNeighbors(df):
    neighbors = []
    geometries = df['geometry']
    for shape in geometries:
        neighbors.append(','.join(df[geometries.overlaps(shape.buffer(60.96))]['VTDST20'].tolist()))

    return neighbors


def exportToFile(df, fileName):
    df.to_file(fileName, driver="GeoJSON")

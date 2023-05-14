import geopandas as gpd
import pandas as pd

mappings = {
    'Clark': 'CLK',
    'Pershing': 'PSH',
    'Storey': 'SRY',
    'Nye': 'NYE',
    'Lyon': 'LYN',
    'Mineral': 'MNL',
    'Lincoln': 'LCN',
    'Eureka': 'EUA',
    'Washoe': 'WSH',
    'Churchill': 'CHL',
    'Elko': 'ELK',
    'Lander': 'LDR',
    'Esmeralda': 'ESM',
    'Carson City': 'CAR',
    'White Pine': 'WPE',
    'Humboldt': 'HMB',
    'Douglas': 'DOU'
}

precincts = gpd.read_file('GeoJSON/NV_PRECINCTS.geojson')
geodata = pd.read_csv('GeoJSON/NV_GEOIDS.csv')

# Read in VTDs and county names and map them to VTDST20 and GEOID20
VTD20s = []
GEOID20s = []
for vtdst, county in zip(precincts['VTDST'], precincts['COUNTY']):
    VTD20s.append('{}{}'.format(vtdst, mappings[county]))

    def transformCounty(county):
        if 'City' in county:
            return county
        else:
            return county + ' County'
        
    iwillfixher = {
        '000007,Humboldt': '320130007-2',
        '001161,Clark': '32001007-01',
        '007594,Washoe': '32001008-01',
        '007595,Washoe': '32001008-01',
        '007596,Washoe': '32001008-02',
        '007592,Washoe': '32001008-03',
        '007597,Washoe': '32001012-01',
        '007599,Washoe': '32001012-02',
        '007593,Washoe': '32001012-03',
        '007598,Washoe': '32001015-01',
        '000002,Lincoln': '32001015-02',
        '000002,Lincoln': '32001015-03',
        '007902,Clark': '32001015-04',
        '007458,Clark': '32001015-05',
    }

    geoidRow = geodata[(geodata['vtd'] == vtdst) & (geodata['county'] == transformCounty(county))]
    if geoidRow.shape[0] != 1:
        GEOID20s.append(iwillfixher[f'{vtdst},{county}'])
    else:
        GEOID20s.append(geoidRow['GEOID20'].values[0])

precincts['VTDST20'] = VTD20s
precincts['GEOID20'] = GEOID20s

precincts.to_file('GeoJSON/NV_PRECINCTS_WITH_GEOID20.json', driver='GeoJSON')
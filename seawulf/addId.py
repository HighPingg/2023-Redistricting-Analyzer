import json

f = open(r'C:\Users\mamun\Documents\2023-Redistricting-Analyser-Seawulf\Nevada 2020\NV_PRECINCTS.geojson')

data = json.load(f)

id = 0

for i in data['features']:
    # for j in i['properties']:
    #     # j.append("id":id)
    #     id += 1
    i['properties']['id'] = id
    id += 1

with open("test.json", 'w') as outfile:
    json.dump(data, outfile)
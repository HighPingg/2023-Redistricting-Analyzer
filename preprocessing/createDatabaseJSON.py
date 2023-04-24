import json

f = open('Illinois_2020.txt') # put the file with the incumbents here
nevadadict = {"name": "Illinois", "districtPlans":{}}
nev20dict = [] # {
#         "2020": {
#             "ensemble": {
#                 "numDistrictPlans": 2,
#                 "numIncumbents":15,
#                 "numIncumbentsPredictedtoWin": 13,
#                 "averageGeoVariation":1.9,
#                 "averagePopVariation":7.8
#             },
#             "districts":[],
#             "graphs": {
#                 "demographic":"demographic graph",
#                 "population":"population graph",
#                 "race": "race graph",
#                 "splitview": "split view graph"
#             },
#             "geoJson": {}
#         }
#     }
nev22dict = [] #{
#     "2022": {
#             "ensemble": {
#                 "numDistrictPlans": 2,
#                 "numIncumbents":15,
#                 "numIncumbentsPredictedtoWin": 13,
#                 "averageGeoVariation":1.9,
#                 "averagePopVariation":7.8
#             },
#             "districts":[],
#             "graphs": {
#                 "demographic":"demographic graph",
#                 "population":"population graph",
#                 "race": "race graph",
#                 "splitview": "split view graph"
#             },
#             "geoJson": {}
#         }
# }
districtdict = {"districtNumber": 0, "incumbent":{}, "candidates":[]}
for lines in f.readlines():
    words = lines.split()
    if len(words) == 0:
         nev20dict.append(districtdict)
         districtdict = {"districtNumber": 0, "incumbent":{}, "candidates":[]}
    elif len(words) == 1:
        # if districtdict["candidates"] != []:
        #     nev20dict['districts'].append(districtdict)
        districtdict["districtNumber"] = int(words[0])
    # elif words[-1] == "W":
    else:
        name = ""
        for i in words[1].split("_"):
            name += i + " "
        totalVotes = int(words[2])
        party = ""
        for i in words[0].split("_"):
            party += i + " "
        if words[-1] == "W":
            winner = True
        else:
            winner = False
        if winner:
            districtdict['incumbent']= {"name": name[0:-1], 
                                        "winner" : winner,
                                        "totalVotes": totalVotes,
                                        "party": party[0:-1],
                                        "geographicVariation":0,
                                        "demographicVariation":0}
        districtdict['candidates'].append({"name": name[0:-1], 
                                        "winner" : winner,
                                        "totalVotes": totalVotes,
                                        "party": party[0:-1],
                                        "geographicVariation":0,
                                        "demographicVariation":0})
        # print(2)
    print(lines)
nev20dict.append(districtdict)
with open("Illinois2020.json", "w") as outfile:
    json.dump(nev20dict, outfile)
    # if 
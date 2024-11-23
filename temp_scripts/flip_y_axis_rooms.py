import json


with open('geojson/rooms.json', 'r') as f:
    rooms = json.load(f)

for room in rooms['features']:
    polygon = room['geometry']['coordinates'][0]
    for point in polygon:
        point[1] = 300 - point[1]

with open('dist/out.json', 'w') as f:
    json.dump(rooms, f)


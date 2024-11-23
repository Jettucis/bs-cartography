import json
import re
import shapely

# ChatGPT inspired function

with open('geojson/entities.json', 'r') as f:
    entities = json.load(f)
with open('geojson/rooms.json', 'r') as f:
    rooms = json.load(f)

for entity in entities['features']:
    point = shapely.geometry.Point(entity['geometry']['coordinates'])

    # Iterate through the rooms in the GeoJSON file
    containing_rooms = []
    for room in rooms['features']:
        # Extract the room's geometry and name
        room_name = room['properties']['name']
        coordinates = room['geometry']['coordinates'][0]  # Assumes Polygon with one ring

        # Create a shapely Polygon object
        polygon = shapely.geometry.Polygon(coordinates)

        # Check if the point is within the polygon
        if polygon.contains(point):
            containing_rooms.append(room_name)
    assert len(containing_rooms) == 1,f'{entity['properties']['name']}'
    entity['properties']['room'] = containing_rooms[0]

with open('dist/out.json', 'w') as f:
    json.dump(rooms, f)


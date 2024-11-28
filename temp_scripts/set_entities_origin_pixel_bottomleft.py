import json

# ChatGPT inspired function

with open('geojson/entities.json', 'r') as f:
    entities = json.load(f)

for entity in entities['features']:
    shift = entity['properties']['size'][1] - 1
    entity['geometry']['coordinates'][1] -= shift


with open('dist/out.json', 'w') as f:
    json.dump(entities, f)


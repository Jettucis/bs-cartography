import json
import re


# Quick ChatGPT function
def parse_icon_details(filename):
    # Use regex to extract the name, dimensions, and extension
    match = re.match(r"^(.*?)(?:_(\d+)x(\d+))?\.png$", filename)
    if match:
        name = match.group(1)  # Base name without dimensions and extension
        width = int(match.group(2)) if match.group(2) else 1
        height = int(match.group(3)) if match.group(3) else 1
        return [name, [width, height]]
    else:
        raise ValueError("Invalid file name format.")


with open('geojson/entities.json', 'r') as f:
    rooms = json.load(f)

for feature in rooms['features']:
    feature['properties']['category'] = 'Entity'
    image_name, dimensions = parse_icon_details(feature['properties']['image'])
    feature['properties']['size'] = dimensions
    feature['properties']['image'] = image_name
    del feature['properties']['type']

with open('dist/out.json', 'w') as f:
    json.dump(rooms, f)

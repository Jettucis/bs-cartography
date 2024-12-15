import json


def parse_feature(feature):
    properties = feature['properties']
    name = properties['name']
    icon = ''
    for classname in properties['classes']:
        if classname == 'icon-obstacle':  # No icon
            continue
        if classname.startswith('icon-'):
            icon = f'[[File:{classname[5:].title()}_small_icon.png|16px]]'
    if 'link' in properties:
        link = properties['link']
        return icon + f'{name}: [[{link}]]'
    return icon + f'[[{name}]]'


with open('geojson/entities.json', 'r') as f:
    json_data = json.load(f)
features = json_data['features']
links = set()
for feature in features:
    links.add(parse_feature(feature))
links_list = list(links)
links_list.sort()
with open('dist/entity_links.txt', 'w') as f:
    f.write('\n\n'.join(links_list))

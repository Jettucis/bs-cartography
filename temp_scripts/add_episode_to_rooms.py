import json

# Uses an SMW search query result to link Rooms to their corresponding episode

# Search query
# https://brightershoreswiki.org/w/Special:Ask?x=-5B-5BInfobox%3A%3ARoom-5D-5D%2F-3FName%2F-3FEpisode&format=broadtable&link=all&headers=show&searchlabel=...%20further%20results&class=sortable%20wikitable%20smwtable&prefix=none&sort=&order=asc&offset=0&limit=500&mainlabel=

with open('geojson/rooms.json', 'r') as f:
    rooms = json.load(f)
with open('tmp.json', 'r') as f:
    episodes = json.load(f)

for room in episodes['results']:
    episode = episodes['results'][room]['printouts']['Episode'][0]['fulltext']
    found = False
    for feature in rooms['features']:
        if feature['properties']['name'] == room:
            feature['properties']['episode'] = episode
            found = True
            break
    if not found:
        print(f'Missing room: {room}')

with open('dist/out.json', 'w') as f:
    json.dump(rooms, f)

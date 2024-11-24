import json

map = {
    'alchemist_obj': 'alchemist',
    'bank_alchemist': ['bank', 'alchemist'],
    'bank_bone': ['bank', 'bonewright'],
    'bank_chef': ['bank', 'chef'],
    'bank_fisher': ['bank', 'fisher'],
    'bank_guard': ['bank', 'neutral'],
    'bank_lumber': ['bank', 'woodcutter'],
    'bank_other': ['bank', 'gray'],
    'bank_stone': ['bank', 'stonemason'],
    'bank_timber': ['bank', 'carpenter'],
    'board': 'clipboard',
    'carpenter_obj': 'carpenter',
    'chef_obj': 'chef',
    'dyes': 'palette',
    'enchantress': 'enchant',#
    'fish_circle': 'fisher',#
    'fish_square': ['fisher', 'square'],
    'forager': 'forager',
    'gatherer': 'gatherer',
    'guard_foe': ['guard', 'neutral'],#
    'guard_foe_aggressive': ['guard', 'aggressive'],#
    'hairdresser': 'scissors',
    'interactable': 'obstacle',
    'interactable_gray': ['obstacle', 'item'],
    'interactable_search': ['search', 'obstacle'],
    'item': 'item',
    'item_purple': ['item', 'obstacle'],#
    'npc_brown': ['talk', 'carpenter'],#
    'npc_gray': ['talk', 'item'],#
    'npc_green': ['talk', 'woodcutter'],#
    'npc_purple': 'talk',#
    'obelisk': 'obelisk',
    'portal_stone': 'portal_stone',
    'recipe_alchemist': ['recipe', 'alchemist'],
    'recipe_brown': ['recipe', 'chef'],
    'recipe_fisher': ['recipe', 'fisher'],
    'scout_foe': ['scout', 'neutral'],#
    'scout_foe_aggressive': ['scout', 'aggressive'],#
    'search': 'search',
    'shop_alchemist': ['shop', 'alchemist'],#
    'shop_brown': ['shop', 'chef'],#
    'shop_carpenter': ['shop', 'carpenter'],#
    'shop_fisher': ['shop', 'fisher'],#
    'shop_gray': ['shop', 'item'],#
    'shop_green': ['shop', 'woodcutter'],#
    'shop_yellow': ['shop', 'forager'],#
    'strange_stone': 'strange_stone',
    'woodcutter': 'woodcutter',
}

# Change the class params of the entities

with open('geojson/entities.json', 'r') as f:
    entities = json.load(f)


for feature in entities['features']:
    key = feature['properties']['image']
    del feature['properties']['image']
    result = map[key]
    if isinstance(result, list):
        feature['properties']['classes'] = [result[0], 'theme-' + result[1]]
    else:
        feature['properties']['classes'] = [result]


with open('dist/out.json', 'w') as f:
    json.dump(entities, f)

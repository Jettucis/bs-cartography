/* Base Image Properties */
// Image dimensions in pixels
const image_width = 3600
const image_height = 1800
// Width or height of one tile (64 in the cache)
const tile_width = 6
// Pixel of the Hopeport Portal Stone in the image
const hopeport_portal_stone_image_x = 567
const hopeport_portal_stone_image_y = 430
// Min and max zoom of the map (based on number of generated layers)
const minZoom = 0
const maxZoom = 4

/* Map Properties */
// Desired map coordinate of the Hopeport Portal Stone
const hopeport_portal_stone_coord_x = 94
const hopeport_portal_stone_coord_y = 71
// Tile layer url
const basemap_url = 'https://brightershoreswiki.org/images/Brighter_Shores_World_Map_Tile_{z}_{y}_{x}.png?93429'
const basemap_error_url = 'https://brightershoreswiki.org/images/Brighter_Shores_World_Map_Tile_blank.png?8f905'

/* Tile Hover */
const tile_hover_style = {
    color: 'red',
    weight: 1,
}

/* Room  and Episode */
const room_colors = {
    'Hopeport': 'yellow',
    'Hopeforest': 'green',
    'Mine of Mantuban': 'blue',
    'Crenopolis': 'gray',
    'unknown': 'black',
}
const room_style = (feature) => ({
    color: room_colors[feature.properties.episode || 'unknown'],
    weight: 3,
    opacity: 1,
    fill: true,
    fillColor: room_colors[feature.properties.episode || 'unknown'],
    fillOpacity: 0.2,
})
const episode_style = (feature) => ({
    color: room_colors[feature.properties.name || 'unknown'],
    weight: 3,
    opacity: 1,
    fill: true,
    fillColor: room_colors[feature.properties.name || 'unknown'],
    fillOpacity: 0.2,
})
// Room default zoom on page load
const room_zoom = 2

/* Entities */
const entity_minimum_width = 6

module.exports = {
    image_width,
    image_height,
    tile_width,
    hopeport_portal_stone_image_x,
    hopeport_portal_stone_image_y,
    minZoom,
    maxZoom,
    hopeport_portal_stone_coord_x,
    hopeport_portal_stone_coord_y,
    basemap_url,
    basemap_error_url,
    tile_hover_style,
    room_style,
    episode_style,
    room_zoom,
    entity_minimum_width,
}
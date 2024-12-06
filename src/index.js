const map_dimensions = require('./map_dimensions.js')
const coordinates = require('./coordinates.js')
const config = require('./config.js')
const markers = require('./markers.js')
const bounding_box = require('./bounding_box.js')
const rooms = require('./rooms.js')
const room_overlay = require('./room_overlay.js')

if(ENV.IMPORT_JSON === true){
    // Ideally this would be saved in a separate .js file so that the geojson data is easier to modify?
    window.geojson = require('../geojson/index.js')
}

const basemap = L.tileLayer(config.basemap_url, {
    errorTileUrl: config.basemap_error_url,
    noWrap: true,
    minNativeZoom: config.minZoom,
    maxNativeZoom: config.maxZoom,
    tileSize: map_dimensions.tile_zoom0_size,
})
const map = L.map('map', {
    crs: map_dimensions.CRS,
    bounds: map_dimensions.bounds,
    maxBounds: map_dimensions.bounds,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    layers: [basemap],
    fullscreenControl: true,
    fullScreenControlOptions: {
        position: 'topleft',
    },
    // Set a temporary view that we will immediately overwrite
    center: [config.hopeport_portal_stone_coord_y, config.hopeport_portal_stone_coord_x],
    zoom: config.room_zoom,
    zoomAnimation: true,
})
room_overlay.setup_room_overlay(map)
coordinates.add_coordinates(map)
coordinates.add_tile_hover(map)
markers.setup_entities(map)
bounding_box.focus_map(map)

// Test
if(ENV.DEBUG === true){
    // TopLeft and BottomRight corners
    L.marker(map_dimensions.bounds.getSouthWest(), {icon: markers.test_marker}).addTo(map).bindPopup(`TopLeft: ${map_dimensions.bounds.getSouthWest()}`)
    L.marker(map_dimensions.bounds.getNorthEast(), {icon: markers.test_marker}).addTo(map).bindPopup(`BottomRight: ${map_dimensions.bounds.getNorthEast()}`)
    // 0, 0
    L.marker([0, 0], {icon: markers.test_marker}).addTo(map).addTo(map).bindPopup(`Zero: ${[0, 0]}`)
    // Hopeport Portal Stone
    const hopeport_portal_stone = [config.hopeport_portal_stone_coord_y, config.hopeport_portal_stone_coord_x]
    L.marker(hopeport_portal_stone, {icon: markers.test_marker}).addTo(map).bindPopup(`Hopeport Portal Stone: ${hopeport_portal_stone}`)
    // Highlight all rooms or episodes (pick one)
    //rooms.add_episode(map, 'All')
    //rooms.add_room(map, 'All')
}

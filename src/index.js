const map_dimensions = require('./map_dimensions.js')
const config = require('./config.js')
const icons = require('./markers.js')
const template_data = JSON.parse($('span.map-template-data').text())


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
    //center: params.center,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    zoom: 0,
    layers: [basemap],
    //mousemove: null,
})

// Test
if(ENV.DEBUG === true){
    L.marker(map_dimensions.bounds.getSouthWest(), {icon: icons.test_marker}).addTo(map).bindPopup(`TopLeft: ${map_dimensions.bounds.getSouthWest()}`)
    L.marker(map_dimensions.bounds.getNorthEast(), {icon: icons.test_marker}).addTo(map).bindPopup(`BottomRight: ${map_dimensions.bounds.getNorthEast()}`)
    L.marker([0, 0], {icon: icons.test_marker}).addTo(map).addTo(map).bindPopup(`Zero: ${[0, 0]}`)
    const hopeport_portal_stone = [config.hopeport_portal_stone_coord_y, config.hopeport_portal_stone_coord_x]
    L.marker(hopeport_portal_stone, {icon: icons.test_marker}).addTo(map).bindPopup(`Hopeport Portal Stone: ${hopeport_portal_stone}`)
}

map.fitBounds(map_dimensions.bounds) // TODO remove once the template defines the target location
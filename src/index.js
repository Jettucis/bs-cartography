const map_dimensions = require('./map_dimensions.js')
const config = require('./config.js')

const template_data = JSON.parse($('span.map-template-data').text())


const basemap = L.tileLayer(config.basemap_url, {
    errorTileUrl: config.basemap_error_url,
    noWrap: true,
    minNativeZoom: config.minZoom,
    maxNativeZoom: config.maxZoom,
    tileSize: new L.Point(map_dimensions.map_width, map_dimensions.map_height),
})
const CRS = L.Util.extend(L.CRS.Simple, {transformation: new L.Transformation(1, 0, 1, 0)})
const map = L.map('map', {
    crs: CRS,
    bounds: map_dimensions.bounds,
    maxBounds: map_dimensions.bounds,
    //center: params.center,
    minZoom: config.minZoom,
    maxZoom: config.maxZoom,
    zoom: 0,
    layers: [basemap],
    //mousemove: null,
})

map.fitBounds(map_dimensions.bounds) // TODO remove
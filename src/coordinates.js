const config = require('./config.js')

const Coordinates = L.Control.extend({
    onAdd: function(map) {
        const coordinates = L.DomUtil.create('div', 'leaflet-wiki-coordinates')
        map.on('mousemove', function(e) {
            const lat = Math.floor(e.latlng.lat)
            const lng = Math.floor(e.latlng.lng)
            coordinates.innerText = `[${lng}, ${lat}]`
        })
        return coordinates
    },
    onRemove: function(map) {}
})
function add_coordinates(map) {
    new Coordinates({position: 'bottomleft'}).addTo(map)
}

const TileHover = L.rectangle([[-10000, -10000], [-10000, -10000]], config.tile_hover_style)
function add_tile_hover(map) {
    TileHover.addTo(map)
    map.on('mousemove', function(e) {
        const lat = Math.floor(e.latlng.lat)
        const lng = Math.floor(e.latlng.lng)
        TileHover.setBounds([[lat, lng], [lat + 1, lng + 1]])
    })
}

module.exports = {
    add_coordinates,
    add_tile_hover,
}
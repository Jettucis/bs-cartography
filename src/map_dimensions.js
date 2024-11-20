const config = require('./config.js')

function higher_pow2(n) {
    const p = Math.ceil(Math.log(n) / Math.log(2))
    return Math.pow(2, p)
}

const map_width = higher_pow2(config.image_width/config.tile_width)
const map_height = higher_pow2(config.image_height/config.tile_width)
module.exports = {
    bounds: L.latLngBounds([0, 0], [map_height, map_width])
}
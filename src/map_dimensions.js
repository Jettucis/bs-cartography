const config = require('./config.js')

function higher_pow2(n) {
    const p = Math.ceil(Math.log(n) / Math.log(2))
    return Math.pow(2, p)
}

const map_pixel_width = higher_pow2(config.image_width)
const map_pixel_height = higher_pow2(config.image_height)
const map_width = map_pixel_width/config.tile_width
const map_height = map_pixel_height/config.tile_width
module.exports = {
    map_width: map_width,
    map_height: map_height,
    bounds: L.latLngBounds([0, 0], [map_height, map_width])
}
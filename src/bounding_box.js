const config = require('./config.js')
const rooms = require('./rooms.js')
const markers = require('./markers.js')
const template_data = JSON.parse($('span.map-template-data').text())

const update_bounds = (bbox, point) => {
    // bounds is [[y, x], [y, x]]
    // point is [x, y]
    bbox[0][1] = Math.min(bbox[0][1], point[0]) // x min
    bbox[1][1] = Math.max(bbox[1][1], point[0]) // x max
    bbox[0][0] = Math.min(bbox[0][0], point[1]) // y min
    bbox[1][0] = Math.max(bbox[1][0], point[1]) // y max
}

const get_bounding_box = (features) => {
    const bounds = [[Infinity, Infinity], [-Infinity, -Infinity]]
    for(const feature of features) {
        if(feature.geometry.type === 'Polygon') {
            for(const point of feature.geometry.coordinates[0]) {
                update_bounds(bounds, point)
            }
        } else { // 'Point'
            update_bounds(bounds, feature.geometry.coordinates)
        }
    }
    return bounds
}

const get_middle_of_bounding_box = (bbox) => [
    (bbox[0][0] + bbox[1][0])/2,
    (bbox[0][1] + bbox[1][1])/2
]

const types = {
    'Episode': 'episodes',
    'Room': 'rooms',
    'Entity': 'entities',
}
const focus_map = (map) => {
    const type = types[template_data.type]
    const target = template_data.target
    const features = window.geojson[type].features.filter((feature) => feature.properties.name === target)
    const bbox = get_bounding_box(features)
    if(type === 'episodes') {
        map.fitBounds(bbox)
        rooms.add_episode(map, target)
    }
    if(type === 'rooms') {
        // Fixed zoom level for all rooms
        const center = get_middle_of_bounding_box(bbox)
        map.setView(center, config.room_zoom)
        rooms.add_room(map, target)
    }
    if(type === 'entities') {
        map.fitBounds(bbox)
        // TODO: Highlight entity
    }
}

module.exports = {
    focus_map
}
const config = require('./config.js')

let room_layer = null

const on_each_room = (feature, layer) => {
    if(ENV.DEBUG === true) {
        layer.bindPopup(feature.properties.name)
    }
}

const add_room = (map, room) => {
    if(room_layer !== null) {
        room_layer.remove()
    }
    room_layer = new L.GeoJSON(window.geojson.rooms.features, {
        filter: (feature, layer) => feature.properties.name === room || room === 'All',
        style: config.room_style,
        onEachFeature: on_each_room,
    })
    room_layer.addTo(map)
}

const add_episode = (map, episode) => {
    if(room_layer !== null) {
        room_layer.remove()
    }
    room_layer = new L.GeoJSON(window.geojson.episodes.features, {
        filter: (feature, layer) => feature.properties.name === episode || episode === 'All',
        style: config.episode_style,
        onEachFeature: on_each_room,
    })
    room_layer.addTo(map)
}

module.exports = {
    add_room,
    add_episode,
}

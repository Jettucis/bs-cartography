const geojson = require('./geojson/index.js')


const episode_properties = [
    'name',
    'category',
]
const room_properties = [
    'name',
    'category',
    //'color',
    //'summary',
    'episode',
]

const validate_polygon = feature => {
    if(feature.geometry.type !== 'Polygon') {
        console.log(`${feature.properties.name} invalid geometry type (not polygon)`)
        return
    }
    const coordinates = feature.geometry.coordinates
    if(coordinates.length !== 1) {
        console.log(`${feature.properties.name} multi-polygonal`)
    }
    const polygon = coordinates[0]
    if(polygon[0][0] !== polygon[polygon.length - 1][0] || polygon[0][1] !== polygon[polygon.length - 1][1]) {
        console.log(`${feature.properties.name} first and last coordinates are not identical`)
    }
}
// TODO: validate polygons as closed loops

console.log('Checking Episodes')
const episode_names = new Set()
for(const episode of geojson.episodes.features) {
    validate_polygon(episode)
    if(episode.properties.category !== 'Episode') {
        console.log(`${episode.properties.name} invalid category`)
    }
    if('id' in episode) {
        console.log(`${episode.properties.name} has id`)
    }
    if(episode_names.has(episode.properties.name)) {
        console.log(`${episode.properties.name} duplicate name!`)
    }
    episode_names.add(episode.properties.name)
    for(const property of episode_properties) {
        if(!(property in episode.properties)) {
            console.log(`${episode.properties.name} missing property ${property}`)
        }
    }
}

console.log('Checking Rooms')
const room_names = new Set()
for(const room of geojson.rooms.features) {
    validate_polygon(room)
    if(room.properties.category !== 'Room') {
        console.log(`${room.properties.name} invalid category`)
    }
    if('id' in room) {
        console.log(`${room.properties.name} has id`)
    }
    if(room_names.has(room.properties.name)) {
        console.log(`${room.properties.name} duplicate name!`)
    }
    room_names.add(room.properties.name)
    for(const property of room_properties) {
        if(!(property in room.properties)) {
            console.log(`${room.properties.name} missing property ${property}`)
        }
    }
}
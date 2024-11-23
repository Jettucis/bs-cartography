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

console.log('Checking Episodes')
const episode_names = new Set()
for(const episode of geojson.episodes.features) {
    if(episode.geometry.type !== 'Polygon') {
        console.log(`${episode.properties.name} invalid geometry type`)
    }
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
    if(room.geometry.type !== 'Polygon') {
        console.log(`${room.properties.name} invalid geometry type`)
    }
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
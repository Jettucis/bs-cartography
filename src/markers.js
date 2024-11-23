
const config = require('./config.js')

let entity_layer = null


const EntityMarker = L.Marker.extend({
    update_size() {
        const tile_width = this.entity_map.latLngToLayerPoint([0,1]).x - this.entity_map.latLngToLayerPoint([0,0]).x
        const icon = this.getIcon()
        icon.options.iconSize = [Math.max(config.entity_minimum_width, tile_width*this.entity_size[0]), Math.max(config.entity_minimum_width, tile_width*this.entity_size[1])]
        this.setIcon(icon)
    },
})

const add_entities = (map) => {
    if(entity_layer !== null) {
        entity_layer.remove()
    }
    const create_entity = (feature, latlng) => {
        console.log(feature.properties.image)
        const icon = L.divIcon({className: feature.properties.image})
        const size = feature.properties.size
        const coordinates = [latlng.lat + size[1]/2, latlng.lng + size[0]/2]
        const marker = new EntityMarker(coordinates, {icon})
        marker.entity_size = size
        marker.entity_map = map
        marker.update_size()
        marker.bindPopup(feature.properties.name)
        return marker
    }
    entity_layer = new L.GeoJSON(window.geojson.entities.features, {
        pointToLayer: create_entity,
    })
    entity_layer.addTo(map)
}
const add_entities_update_event = (map) => {
    map.on('zoomend', (event) => {
        map.eachLayer((layer) => {
            if(!(layer instanceof EntityMarker)) {
                return
            }
            layer.update_size()
        })
    })
}
const setup_entities = (map) => {
    add_entities(map)
    add_entities_update_event(map)
}
module.exports = {
    setup_entities
}

if(ENV.DEBUG === true){
    module.exports.test_marker = L.icon({
        iconUrl: 'https://brightershoreswiki.org/images/Hopeport_episode_icon.png?8f107',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    })
}
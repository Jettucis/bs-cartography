const template_data = JSON.parse($('span.map-template-data').text())

const types = {
    'Episode': 'episodes',
    'Room': 'rooms',
    'Entity': 'entities',
}
const type = types[template_data.type]
const targets = template_data.target.split(';').map(target => target.trim())

module.exports = {
    type,
    targets
}
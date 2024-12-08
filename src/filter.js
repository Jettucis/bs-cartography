const filter_exact = items => {
    return (feature, layer) => items.includes(feature.properties.name) || items.includes('All')
}
const filter_inexact = items => {
    const item_lowercase = items.map(item => item.toLowerCase())
    return (feature, layer) => item_lowercase.some(item => feature.properties.name.toLowerCase().includes(item)) || items.includes('All')
}
const get_filter = (items, exact) => exact ? filter_exact(items) : filter_inexact(items)

module.exports = {
    get_filter
}
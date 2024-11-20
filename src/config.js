module.exports = {
    /* Base Image Properties */
    // Image dimensions in pixels
    image_width: 3600,
    image_height: 1800,
    // Width or height of one tile (64 in the cache)
    tile_width: 6,
    // Pixel of the Hopeport Portal Stone in the image
    hopeport_portal_stone_image_x: 567,
    hopeport_portal_stone_image_y: 430,
    // Min and max zoom of the map (based on number of generated layers)
    minZoom: 0,
    maxZoom: 4,

    /* Map Properties */
    // Desired map coordinate of the Hopeport Portal Stone
    hopeport_portal_stone_coord_x: 94,
    hopeport_portal_stone_coord_y: 71,
    // Tile layer url
    basemap_url: 'https://brightershoreswiki.org/images/Brighter_Shores_World_Map_Tile_{z}_{y}_{x}.png?93429',
    basemap_error_url: 'https://brightershoreswiki.org/images/Brighter_Shores_World_Map_Tile_blank.png?8f905',

    /* Tile Hover */
    tile_hover_style: {
        color: 'red',
        weight: 1,
    }
}
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            ENV: {
                DEBUG: false,
                IMPORT_JSON: true,  // TODO - set this to false and use a js file from the wiki
            },
        })
    ]
}
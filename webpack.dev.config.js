const webpack = require('webpack')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            ENV: {
                DEBUG: true,
                IMPORT_JSON: true,
            },
        })
    ]
}
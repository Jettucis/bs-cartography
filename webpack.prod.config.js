const webpack = require('webpack')

module.exports = {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            ENV: {
                DEBUG: false
            },
        })
    ]
}
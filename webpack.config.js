module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]

    },
    entry: {
        'index': './lifetracker/frontend/src/index.js',
        'history': './lifetracker/frontend/src/history.js',
        'user': './lifetracker/frontend/src/user.js',
    },
    output: {
        path: __dirname + '/lifetracker/frontend/static/frontend3/',
        filename: '[name].js'
    }
}

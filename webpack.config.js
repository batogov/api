var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssConfig = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: cssConfig
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        })
    ]
};
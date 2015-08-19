var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IndexHtmlPlugin = require('indexhtml-webpack-plugin');
var cssExtractPlugin = new ExtractTextPlugin('[contenthash].css');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: "/",
            filename: "[name]-[chunkhash].js",
            chunkFilename: "[id]-[chunkhash].js",
            sourceMapFilename: "[file].map"
    },

    entry: {
        'index.html': './index.html',
        app: './app.js'
    },

    module: {
        loaders: [
            {
                test: /index\.html$/,
                loader: 'html?root=.&attrs=link:href img:src'
            },
            {
                test: /\.css$/,
                loader: cssExtractPlugin.extract('style', 'css')
            },
            { test: /\.(jpe?g|png|gif|svg)$/i,    loader: "file?name=[path][name]-[hash].[ext]" },
        ]
    },

    plugins: [
        cssExtractPlugin,
        new IndexHtmlPlugin('index.html', 'index.html')
    ]
};


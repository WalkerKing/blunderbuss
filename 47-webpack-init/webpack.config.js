let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // devtool: 'source-map',// env-source-map
    entry: __dirname + '/app/es6-study.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            },
            {
                test:  /\.less$/,
                loader:  "style!css!less"
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('Copyright Walker'),
        new HtmlWebpackPlugin({
            filename: 'es6-study.html',
            template: __dirname + '/app/es6-study.html'    //new 一个这个插件的实例，并传入相关的参数
        })
    ],
    devServer: {
        contentBase: "./dist" //本地服务器所加载的页面所在的目录

    }
};
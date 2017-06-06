var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');//模板化html文件，自动引入
var ExtractTextPlugin = require('extract-text-webpack-plugin');//分离css和js

module.exports = {
    entry:
    {
        home: path.resolve(__dirname, "app/home.js"),
        about: path.resolve(__dirname, "app/about.js")
    },//已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname, "build"),//打包后的文件存放的地方
        filename: "[name]-[hash].js"//打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader?modules',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        },
                    ]
                })
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin("Copyright Coogain inc."),//在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
            title: 'home',
            hash: false,
            filename: 'home.html',
            chunks: ['home'],
            template: path.resolve(__dirname, "app/index.tmpl.html")//new 一个这个插件的实例，并传入相关的参数
        }),
        new HtmlWebpackPlugin({
            title: 'about',
            hash: false,
            filename: 'about.html',
            chunks: ['about'],
            template: path.resolve(__dirname, "app/index2.tmpl.html")//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ]
}
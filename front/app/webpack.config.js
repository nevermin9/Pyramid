const resolve = require('path').resolve
require('dotenv').config({ path: resolve(__dirname, '../.env') });

const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: isDev ? 'development' : 'production',
    entry: {
        app: resolve(__dirname, 'src/main.js')
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: isDev ? 'bundle.js' : '[hash].[name].bundle.js',
        publicPath: '/',
    },
    devtool: isDev ? 'inline-source-map' : false,
    resolve: {
        extensions: ['.vue', '.js', '.json', '.scss'],
        alias: {
            '@': resolve(__dirname, 'src'),
            'api': resolve(__dirname, 'src/api'),
        }
    },
    plugins: [
        new HtmlPlugin({
            template: resolve(__dirname, 'src/index.html'),
            scriptLoading: 'defer'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new webpack.EnvironmentPlugin(['API_BASE_URL'])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[folder]/[name].[ext]',
                }
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: process.env.PORT,
        overlay: true,
        hot: true,
        open: true,
        stats: { colors: true },
        historyApiFallback: true
    }
}

module.exports = config;
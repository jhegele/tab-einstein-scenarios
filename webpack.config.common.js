const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, './src');
const webpack = require('webpack');
const package = require('./package.json');

module.exports = {
    entry: APP_PATH,

    output: {
        filename: `static/bundle.[hash].js`,
        path: path.resolve(__dirname, 'app'),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts']
    },

    module: {
        rules: [
            { test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { 
                test: /\.(woff|png)$/, 
                loader: 'file-loader', 
                exclude: /node_modules/,
                options: {
                    publicPath: '/static/',
                    outputPath: '/static/'
                }
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'],
                include: /node_modules/
            }
        ],
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                'templates',
                'static'
            ]
        }),
        new webpack.DefinePlugin({
            'env_APP_VERSION': `"${package.version}"`
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/static/html/index.html',
            filename: 'templates/index.html'
        })
    ]
};
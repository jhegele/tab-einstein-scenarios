const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, './src');
const webpack = require('webpack');
const package = require('./package.json');

module.exports = {
    entry: APP_PATH,

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app', 'static'),
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
                    publicPath: '/static/'
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
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'env_APP_VERSION': `"${package.version}"`
        })
    ]
};
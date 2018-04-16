const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
    size: os
        .cpus()
        .length
});
const package = require('../package.json');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        'index': './lib/index',
        // commons:['vue','iview','vue-router','vuex']
    },
    output: {
        libraryTarget: "umd",
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/')
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
        }
    },
    externals:{
        vue:'Vue',
        iview: 'iview',
        'vuex':'Vuex',
        sortablejs:"sortablejs",
        "vue-styled-components":"vue-styled-components",
        "lodash":"lodash"
    },
    // devtool: '#source-map',    
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    },
                    buble: {
                        objectAssign: 'Object.assign'
                    }
                }
            }, {
                test: /iview\/.*?js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            }, {
                test: /\.js[x]?$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'happypack/loader?id=happybabel'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?minimize', 'autoprefixer-loader'
                    ],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?minimize', 'autoprefixer-loader', 'less-loader'
                    ],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }, {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HappyPack({id: 'happybabel', loaders: ['babel-loader'], threadPool: happyThreadPool, verbose: true}),
        // new webpack
        //     .optimize
        //     .CommonsChunkPlugin({name: 'commons', filename: '[name].[hash].js'}),
        // new ExtractTextPlugin({filename: '[name].[contenthash:16].css', allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
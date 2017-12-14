const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const project = require('./project.config')

const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__

const app = ['./app.js']
if (__DEV__) {
    app.unshift(`webpack-dev-server/client?http://localhost:${project.port}/`)
}
const webpackConfig = {
    context: project.paths.client(),
    entry:   {
        app: app
    },
    output:  {
        path:     project.paths.dist(),
        filename: '[name].bundle.js'
    },
    module:  {
        rules: [
            {
                test: /\.mp4$/,
                use:  [{
                    loader: 'file-loader'
                }]
            }, {
                test:    /\.js$/,
                exclude: [/node_modules/],
                use:     [{
                    loader:  'babel-loader',
                    options: {presets: ['es2015']}
                }]
            }, {
                test: /\.(sass|scss)$/,
                use:  __PROD__ ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      [{
                        loader:  'css-loader',
                        options: {minimize: true}
                    },
                        'sass-loader']
                }) : [
                    'style-loader',
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader:  'autoprefixer-loader',
                        options: {
                            browsers: 'last 2 version'
                        }
                    }, {
                        loader:  'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      [
                        'css-loader'
                    ]
                })
            }, {
                test: /\.(png|jpg)$/,
                use:  [{
                    loader:  'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }, {
                test: /\.svg/,
                use:  [{
                    loader:  'url-loader',
                    options: {
                        limit:    10000,
                        mimetype: 'image/svg+xml'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new HtmlWebpackPlugin({
            template: project.paths.client('index.html'),
            filename: 'index.html',
            hash:     false,
            inject:   'body',
            minify:   {
                collapseWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $:      'jquery'
        })
    ]
}

if (__DEV__) {
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
    webpackConfig.module.rules.push({
        test:    /\.(js)$/,
        exclude: /node_modules/,
        loader:  'eslint-loader'
    })
} else if (__PROD__) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused:    true,
                dead_code: true,
                warnings:  false
            }
        })
    )
}

module.exports = webpackConfig

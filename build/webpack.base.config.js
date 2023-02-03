/*
 * @Author: wangjiaxin@leedarson.com
 * @Date: 2020-03-03 15:28:54
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-02-03 13:51:10
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('./env.config')[NODE_ENV];
    const IS_DEVELOPMENT = NODE_ENV === 'development';


    const webpackConfig = {
        entry: {
            index: resolve('src/index.ts')
        },
        output: {
            path: resolve('./dist'),
            publicPath: config.staticPath,
            filename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`,
            chunkFilename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`
        },
        externals: {},
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                // {
                //     test: /\.(png|jpg|gif|svg)$/,
                //     use: [{
                //         loader: 'url-loader',
                //         query: {
                //             limit: 1,
                //         }
                //     }]
                // },
                // {
                //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                //     use: [{
                //         loader:'file-loader',
                //         option:  {
                //             name: `${config.filePath}fonts/${config.filenameHash ? '[name].[hash:8]' : '[name]'}.[ext]`
                //     }}],
                // },
                // {
                //     test: /\.less$/,
                //     include: resolve('src'),
                //     use: [
                //         {
                //             loader: MiniCssExtractPlugin.loader,
                //             options: {
                //                 hmr: IS_DEVELOPMENT,
                //             },
                //         },
                //         'css-loader',
                //         'postcss-loader',
                //         'less-loader'
                //     ]
                // }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                'process.env.STATIC_PATH': JSON.stringify(config.staticPath),
                'process.env.HOST': JSON.stringify(config.HOST)
            }),
            new HtmlWebpackPlugin({
                filename: `index.html`,
                template: resolve('index.html'),
                chunks: ['manifest', 'vendor', 'app', 'common', 'index'],
                hash: false,
                inject: 'body',
                xhtml: false,
                minify: {
                    removeComments: true,
                }
            }),
            new MiniCssExtractPlugin({
                filename: IS_DEVELOPMENT ? 'style.css' : 'css/[name].[contenthash:8].css',
                chunkFilename: IS_DEVELOPMENT ? '[id].css' : 'css/[id].[contenthash:8].css',
            })
        ],
        resolve: {
            alias: {
                '@app': resolve('src/app/index.ts'),
                '@layout': resolve('src/layout/index.js'),
                '@modules': resolve('src/app/modules'),
                '@utils': resolve('src/utils'),
                '@less': resolve('src/assets/less'),
                '@locales': resolve('src/locales'),
            },
            extensions: ['.ts', '.js', '.json']
        },
    };



    // 公共代码
    webpackConfig.optimization = {
        splitChunks: {
            cacheGroups: {
                app: {
                    test: /[\\/]src\/app[\\/]/,
                    chunks: 'all',
                    name: 'app',
                    minChunks: 1,
                    priority: 10
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1,
                    priority: 10
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    chunks: 'all',
                    name: 'common',
                    minChunks: 3,
                    priority: 10
                }
            }
        },
        moduleIds: 'deterministic',
        runtimeChunk: {
            name: 'manifest',
        }
    };

    // 开发环境服务器配置
    if (IS_DEVELOPMENT) {
        webpackConfig.devServer = {
            compress: false,
            host: '127.0.0.1',
            port: config.port,
            hot: true,
            historyApiFallback: true
        };
        // webpack watch 配置
        webpackConfig.watchOptions = {
            poll: 500,
            ignored: 'node_modules'
        };
        // 热更新
        // webpackConfig.plugins.push(
        //     new webpack.HotModuleReplacementPlugin()
        // );
    } else {
        // 压缩css
        webpackConfig.plugins.push(
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: { safe: true }
            })
        );
    }
    return webpackConfig;
};

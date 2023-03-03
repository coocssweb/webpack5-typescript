
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { resolve } = require('./utils');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const WebpackBar = require('webpackbar');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('./env.config')[NODE_ENV];
    const IS_DEVELOPMENT = NODE_ENV === 'development';


    const webpackConfig = {
        entry: {
            index: resolve('src/index.tsx')
        },
        output: {
            path: resolve('./dist'),
            publicPath: config.staticPath,
            filename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`,
            chunkFilename: `${config.filePath}js/${config.filenameHash ? '[name].[chunkhash:8]' : '[name]'}.js`
        },
        externals: {
          // react: 'React',
          // 'react-dom': 'ReactDOM',
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                  test: /\.(tsx?|jsx?)$/,
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            name:  IS_DEVELOPMENT? '[name].[ext]': '[name].[contenthash:8].[ext]',
                            outputPath: `${config.filePath}/images`,
                        },
                    }]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [{
                        loader:'file-loader',
                        options:  {
                            name: IS_DEVELOPMENT? '[name].[ext]' :'[name].[contenthash:8].[ext]',
                            outputPath: `${config.filePath}/fonts`,
                        }
                      }],
                },
                {
                    test: /\.less$/,
                    include: resolve('src'),
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: IS_DEVELOPMENT,
                            },
                        },
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                'process.env.STATIC_PATH': JSON.stringify(config.staticPath),
                'process.env.HOST': JSON.stringify(config.HOST),
                'process.env.MOCK': IS_DEVELOPMENT
            }),
            new HtmlWebpackPlugin({
                filename: `index.html`,
                template: resolve('index.html'),
                chunks: IS_DEVELOPMENT ?  [] : ['manifest', 'vendor', 'index'],
                hash: false,
                inject: 'body',
                xhtml: false,
                minify: {
                    removeComments: true,
                }
            }),

            // new WebpackBar({
            //   name: IS_DEVELOPMENT ? '正在启动' : '正在打包',
            //   color: '#fa8c16',
            // }),

        ],
        watchOptions: {
          ignored: /node_modules/,
        },
        resolve: {
            alias: {
                '@app': resolve('src/app/index.ts'),
                '@layout': resolve('src/layout/index.js'),
                '@modules': resolve('src/app/modules'),
                '@utils': resolve('src/utils'),
                '@less': resolve('src/assets/less'),
                '@locales': resolve('src/locales'),
            },
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
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
      // 公共代码
      webpackConfig.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1,
                    priority: 10
                }
            }
        },
        moduleIds: 'deterministic',
        runtimeChunk: {
            name: 'manifest',
        }
      };
      new MiniCssExtractPlugin({
        filename: IS_DEVELOPMENT ? 'style.css' : 'css/[name].[contenthash:8].css',
        chunkFilename: IS_DEVELOPMENT ? '[id].css' : 'css/[id].[contenthash:8].css',
      }),
      // 压缩css
      webpackConfig.plugins.push(
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { safe: true }
        })
      );

      webpackConfig.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            configFile: resolve('./tsconfig.json'),
          },
        })
      );
    }
    return webpackConfig;
};

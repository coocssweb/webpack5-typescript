const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV = 'production';
const webpackBaseConfig = require('./webpack.base.config')(NODE_ENV);


const webpackConfig = webpackMerge.merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
      new BundleAnalyzerPlugin()
    ],
});

module.exports = webpackConfig;

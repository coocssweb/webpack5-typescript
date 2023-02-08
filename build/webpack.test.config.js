
const webpackMerge = require('webpack-merge');
const NODE_ENV = process.env.NODE_ENV = 'test';
const webpackBaseConfig = require('./webpack.base.config')(NODE_ENV);
const webpackConfig = webpackMerge.merge(webpackBaseConfig, {
    mode: 'development'
});

module.exports = webpackConfig;

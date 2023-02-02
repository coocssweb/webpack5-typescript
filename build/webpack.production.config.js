/*
 * @Author: wangjiaxin@leedarson.com 
 * @Date: 2020-03-03 15:29:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-02-02 09:18:44
 */
const webpackMerge = require('webpack-merge');
const NODE_ENV = process.env.NODE_ENV = 'production';
const webpackBaseConfig = require('./webpack.base.config')(NODE_ENV);
const webpackConfig = webpackMerge.merge(webpackBaseConfig, {
    mode: 'production'
});

module.exports = webpackConfig;
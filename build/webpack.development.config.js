/*
 * @Author: wangjiaxin@leedarson.com 
 * @Date: 2020-03-03 15:29:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-02-02 09:18:53
 */
const webpackMerge = require('webpack-merge');
const NODE_ENV = process.env.NODE_ENV = 'development';
const webpackBaseConfig = require('./webpack.base.config')(NODE_ENV);
const webpackConfig = webpackMerge.merge(webpackBaseConfig, {
    mode: 'development'
});
module.exports = webpackConfig;
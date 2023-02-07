/*
 * @Author: wangjiaxin@leedarson.com
 * @Date: 2020-03-03 15:29:09
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-02-07 10:16:17
 */
const webpackMerge = require('webpack-merge');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { resolve } = require('./utils');

const NODE_ENV = process.env.NODE_ENV = 'production';
const webpackBaseConfig = require('./webpack.base.config')(NODE_ENV);


const webpackConfig = webpackMerge.merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
      new PurgeCSSPlugin({
        paths: glob.sync(`${resolve('./src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
        whitelist: ['html', 'body']
      }),
    ],
});

module.exports = webpackConfig;

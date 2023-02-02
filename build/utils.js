/*
 * @Author: wangjiaxin@leedarson.com 
 * @Date: 2023-02-01 14:36:57 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2023-02-01 14:36:57 
 */
const path = require('path');

exports.resolve = function resolve (...args) {
    return path.join(__dirname, '..', ...args);
};
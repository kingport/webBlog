/**
 * 使用dll技术 对某些第三方库进行单独打包
 * 
 * 
 */
const webpack = require('webpack');
const {resolve} = require('path');
module.exports = {
  entry: {
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(_dirname, 'dall'),
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(_dirname, 'dll/manifest.json')
    })
  ]
}
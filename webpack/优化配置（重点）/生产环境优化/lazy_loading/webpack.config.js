/**
 * lazy_loading  懒加载
 * 触发点击的时候再加载方法
 * // 
 * 懒加载 import （'./方法文件',webpackprefetch: true）.then(() => {})
 * webpackprefetch 预加载 会将JS提前加载
 * 懒加载 需要用的时候才会加载 文件体积大的话加载时间长
 * 正常加载可以认为是并行加载（同一时间加载多个文件）
 * 预加载： 等待其他资源加载完毕 再偷偷加载资源 （兼容性很差）
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  // 单入口
  entry: 
    './src/js/index.js',
  output: {
    // 取文件名 [name] 取文件名
    filename: '[name].[contenthash: 10].js',
    path: resolve(_dirname, 'build')
  },
  module: {},
  plugins: [
    // html插件 打包html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production',
}

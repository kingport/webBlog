/**
 * PWA（serverwork） 离线加载 没网也可以正常访问
 * 渐进式网路开发应用程序 离线访问技术 （淘宝）
 * worbox -- worbox-webpack-plugin
 * 入口文件注册serviceworker
 * 处理兼容性
 * if('serviceWorker' in navigator) {
 *  window.addEventLister.register('load', () => {
 *      navigator.serviceworker
 *      .register('/service-worker.js')
 *      .then(() => {
 *        console.log('sw注册成功')
 *      })
 *      .catch(() => {
 *      })
 *  })
 * }
 * eslint 不认识window navigator 全局变量
 * 需要修改配置
 * package.json中 "env": { "browser":true}
 * 
 * SW代码必须运行在服务器上
 * -- node.js
 * -- npm i serve -g 
 *    serve -s build  启动服务器 将build目录下所有资源暴露出去
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorboxWebpackPlugin = require('worbox-webpack-plugin');


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
    new OptimizeCssAssetsWebpackPlugin(),
    // pwa 技术插件
    // 1 帮助serviceworker快速启动
    // 2 删除旧的serviceworker
    // 生成一个serviceworker 配置文件
    new WorboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWating: true
    })
  ],
  mode: 'production',
}

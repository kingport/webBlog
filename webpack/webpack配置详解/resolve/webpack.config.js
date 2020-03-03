const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
  },
  module: {
  },
  pulgins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'devlopment',
  // 解析配置路径别名
  resolve: {
    // 配置解析模块路径别名：简写路径
    // 写路径没有提示
    alias: {
      $css: resolve(__dirname,'src/css')
    },
    // 配置省略文件路径后缀名 
    extensions: ['.js','.json','jsx'],
    // 告诉webpack 解析模块去找哪个目录
    modules: [resolve(__dirname, '../node_modules')]
  }
}
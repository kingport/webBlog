const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 
 *    
 */
module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称 目录）
    filename: 'built.js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: resolve(_dirname, 'build'),
    // 所有资源引入的公共路径前缀 --> imgs/a.jpg ---> /imgs/a.jpg
    publicPath: '/',
    // 非入口chunk的名称
    chunkFilename: '[name]_chunk.js',
    // 整个库向外暴露的变量名
    library: '[name]',
    // 变量名添加到哪里
    libraryTarget: 'window'
  },
  pulgins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'devlopment'
}
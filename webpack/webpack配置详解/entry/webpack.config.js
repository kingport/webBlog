const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * entry 入口
 * 1 string --打包形成一个chunk 输出一个bundle文件 单入口
 *    此chunk的名称默认是 main
 * 2 array --
 *    多入口
 *    所有文件最终会形成一个chunk 输出出去只有一个bundle文件
 *    一般来讲只有在HMR功能让html热更新生效
 * 3 object 
 *    多入口 
 *    有几个入口文件就有几个chunk 输出几个bundle文件
 *    此chunk的名字是key值
 *    --- 特殊用法 {index: []}
 *    
 */
module.exports = {
  entry: './src/index.js',
  // entry: [], // 多入口 不常用
  // entry: {},
  output: {
    filename: 'built.js',
    path: resolve(_dirname, 'build')
  },
  pulgins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'devlopment'
}
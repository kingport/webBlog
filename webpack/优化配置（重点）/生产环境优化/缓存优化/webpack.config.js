/**
 * babel 缓存
 * 改变其中一个模块其他模块不变 cacheDirectory： true
 * 让第二次打包更快
 * 
 * 文件资源缓存 强缓存不会经过服务器 所以文件更改打包会导致不会刷新
 * 上线代码运行缓存更好使用
 *  1 hash：每次webpack打包 生成一个唯一的hash值 导致一个css js的哈希值都会变 都会重新刷新
 *  2 chunkhash：根据chunk生成hash值 如果打包涞源同一个chunk 那么hash值会一样
 *    问题： JS和css还是同一个hash
 *    原因： css被引入到js文件中
 *  3 contenthash： 根据文件内容生成hash
 *    内容不会hash不会变
 * 
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    './src/js/index.js',
    './src/js/index.html'
  ],
  output: {
    filename: 'built.js',
    path: resolve(_dirname, 'build')
  },
  module: {
    // loader 配置
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 配置 略
          presets: [],
        },
        // 开启babel缓存 第二次构建的时候会读取之前的缓存
        cacheDirectory: true
      }   
    ]
  },
  plugins: [
    // plugins 配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'develoment',
  devServer: {
    // 构建后的项目路径
    contentBase: resolve(__dirname, 'build'),
    // 启动压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 当修改了配置 必须重启webpack
    hot: true,
    devtool: 'source-map'
  }
}
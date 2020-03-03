const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 
 *    
 */
module.exports = {
  entry: './src/index.js',
  output: {
  },
  module: {
    rules: [
      // loader 配置
      {
        test: /\.js$/,
        // 排除node_modules下的JS文件
        exclude: /node_modules/,
        // 只检查src目录下
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行
        // enforce: 'post'
        // 单个loader使用loader
        loader: 'eslint-loader',
        options: {

        }
        // use: ['style-loader','css-loader']
      },
      {
        //以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  pulgins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'devlopment'
}
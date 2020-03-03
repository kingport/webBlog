/**
 * 提取css或者单独文件
 * 插件 mini-css-extract-plugin
 * 插件自带loader
 * 
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(_dirname, 'build')
  },
  module: {
    // loader 配置
    rules: [       
      // 处理css 略
      {
        test: /\.css$/,
        use: [
          // 'style-loader', //不能用此loader
          MiniCssExtractPlugin.loader, // 会将css单独提取
          'css-loader'
        ]
      },  
    ]
  },
  plugins: [
    // plugins 配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 指定目录
      filename: '/css/built.css'
    })
  ],
  mode: 'develoment',
}
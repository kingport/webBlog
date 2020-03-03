/**
 * JS压缩 调整mode为production
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// 设置nodejs环境变量
procss.env.NODE_ENV = 'development';
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(_dirname, 'build')
  },
  module: {
      // loader 配置
    rules: [     
     
    ]
  },
  plugins: [
    // plugins 配置
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      // 指定目录
      filename: '/css/built.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 生产环境会自动压缩JS代码
  mode: 'production',
}
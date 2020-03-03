/**
 * 代码分割
 * 
 * 
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义环境变量
process.env.NODE_ENV = 'production';

// 复用loader
const commonCss = [
  MiniCssExtractPlugin,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => {
        require('postcss-preset-env')()
      }
    }
  }
]

module.exports = {
  // 单入口
  // entry: {
    // './src/js/index.js'
  // }
  entry: {
    // 多入口 有一个入口 最终输出一个bundle 但是不方便 不灵活
    main: './src/index.js',
    test: './src/test.js'
  },
  output: {
    // 取文件名 [name] 取文件名
    filename: '[name].[contenthash: 10].js',
    path: resolve(_dirname, 'build')
  },
  module: {},
  plugins: [
    // html插件
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

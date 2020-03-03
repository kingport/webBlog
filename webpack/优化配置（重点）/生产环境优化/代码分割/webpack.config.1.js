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
  entry:
    './src/js/index.js'
  ,
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
    new OptimizeCssAssetsWebpackPlugin(),
    
  ],
  // 可以将node_modules 单独打包一个chunk输出
  // import 动态导入语法 能将某个文件单独打包
  // 自动分析多入口文件中有没有公共的依赖 如果有打包成一个单独的chunk
  optimization: {
      splitChunks: {
        chunks:'all'
      }
  },
  mode: 'production',
}

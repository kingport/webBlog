/**
 * externals
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 开启多进程打包
          // 利：多进程
          // 弊：进程启动大概600ms 通信也需要开销
          // 只有工作消耗时间比较长，才需要多进程打包
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {version: 3},
                    targets: {
                      chrome: '60'
                    }
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // html插件 打包html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  // 拒绝jq被打包进来
  externals: {
    jquery: 'jQuery'
  },
  mode: 'production',
}

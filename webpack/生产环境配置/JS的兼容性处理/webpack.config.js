/**
 * JS 兼容性es6 在ie或者其他浏览器中 会有语法错误问题
 * JS 兼容性处理 
 *    1 babel-loader @babel/core @babel/preset-env
 *      只能转换一些基本语法 promise语法不会兼容 基本语法解决高级语法不能
 *    2 全部JS兼容性的处理 -- @babel/polyfill  直接引用在index.js中
 *      只需要解决部分兼容性问题 但是全部引入 体积太大
 *    3 按需解决兼容性问题 core-js
 *      
 * 结合第一和第三 基本和按需加载
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设 指示babel 做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                 // 指定兼容性做到哪个版本浏览器
                 targets: {
                   ie: '9',
                   // 等等
                 }
              }
            ]

          ]
        }
      }
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
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'develoment',
}
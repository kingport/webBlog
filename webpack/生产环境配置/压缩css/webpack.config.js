/**
 * CSS压缩 optimize-css-assets-webpack-plugin
 * 
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
      // 处理css 略
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 会将css单独提取
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                // postcss的插件
                require('postcss-preset-env')()
              }
            }
          }              
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
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'develoment',
}
/**
 * CSS兼容使用postcss-loader
 * 
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
          // 'style-loader', //不能用此loader
          MiniCssExtractPlugin.loader, // 会将css单独提取
          'css-loader',
          /**
           * css 兼容处理 postcss--- postcss-loader postcss-preset-env
           * 帮助postcss 找到package.json中browserslist里面的配置
           */
          /**
           * 默认找生产环境 所以设置node环境变量 procss.env.NODE_ENV = 'development';
              "browserslist": {
                "development": [
                  开发环境配置
                ],
                "production":[
                  生产环境配置
                ]
              }
           * 
           */
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
    })
  ],
  mode: 'develoment',
}
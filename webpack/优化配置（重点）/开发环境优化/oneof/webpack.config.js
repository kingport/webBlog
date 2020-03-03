/**
 * oneof 一下loader只会匹配一个
 * 能让loader性能处理的更好
 * 注意: 不能同时处理2个loader
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
        oneOf: {

        },
      },
       // 处理less
      {
        test: /\.less$/,
        // 使用多个用use
        use: ['style-loader','css-loader', 'less-loader']
      },
      // 处理css 略
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 处理图片资源 略
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 *1024,
          name: '[hash: 10].[ext]',
          // 关闭es6模块
          esModule: false,
          // 指定输出到该目录下
          outputpath: 'imgs'
        }
      },
      // 处理html中img资源 略
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 处理其他资源
      {
        test: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      },      
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
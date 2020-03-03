const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
  },
  module: {
  },
  pulgins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'devlopment',
  // 解析配置路径别名
  resolve: {
    // 配置解析模块路径别名：简写路径
    // 写路径没有提示
    alias: {
      $css: resolve(__dirname,'src/css')
    },
    // 配置省略文件路径后缀名 
    extensions: ['.js','.json','jsx'],
    // 告诉webpack 解析模块去找哪个目录
    modules: [resolve(__dirname, '../node_modules')]
  },
   // 开发环境
  devServer: {
    // 运行代码目录
    contentBase: resolve(__dirname, 'build'),
    // 监视文件 变化会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    
    port: 5000,
    compress: true,
    open: true,
    hot: true,

    // 不需要启动日志信息
    clientLogLevel: 'none',
    quiet: true,

    // 出错不用全局提示
    overlay: false,

    // 服务器代理 解决跨域
    proxy: {
      '/api': {
        // 一旦接收到/api/xxx的请求 就回转发到另外一个服务器
        target: 'http://localhost:3000',
        // 请求的时候去掉api
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  }
}
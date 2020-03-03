import { resolve } from 'url';
const { path } = require('path');

module.exports = {
  entry: './src/idnex',
  output: 'built.js',
  module:  {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 如何打包其他文件(除了html js css 以外的资源)
      // exclude 过滤
      {
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  pulgins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  // 开发服务器 devServer 用来自动化构建 自动刷新
  // 特点 只会在内存中编译打包，不会有任何输出
  // 下载 webpack-dev-server 包
  // 启动devserver指令 npx webpack-dev-server
  devServer: {
    // 构建后的项目路径
    contentBase: resolve(__dirname, 'build'),
    // 启动压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
}

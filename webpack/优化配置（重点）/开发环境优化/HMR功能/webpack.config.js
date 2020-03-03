/**
 *  开发环境下
 *  1. 当我们修改样式文件的时候 其他没有变化的文件也会重新打包
 *  2. 当模块数量多的时候 修改其中一个的时候其余都要重新打包
 * HMR: hot module replacement 热模块替换
 * 一个模块发生变化 只会重新打包这一个模块而不是打包所有 
 * 极大提升代码构建速度
 * 样式文件 可以使用HMR功能 loader中自动做了
 * JS文件 默认没有HMR功能的
 *    解决方案： 修改JS代码，添加支持HMR功能
 *    注意： HMR只能处理非入口JS文件
 *    module.hot.accept()方法
 * html文件 默认没有HMR功能 同时会导致html不能热更新了
 *  解决方案： 
 *    修改entry入口为数组 将html文件引入
 *    通常html文件只有一个 所以不需要做HMR功能
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
    hot: true
  }
}
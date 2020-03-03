/**
 *  开发环境
 * source-map 提供源代码到构建后代码映射技术
 * 构建代码配置出错 通过映射找出源代码错误
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * 
 * source-map 外部
 *  错误代码准确信息和位置
 * inline-source-map 内联 只生成一个
 *  错误代码准确信息和位置
 * hidden-source-map 外部
 *  提供错误代码 错误原因 不能提供位置 不能追踪源代码位置 只能提供构建后代码位置
 * eval-source-map 内联 每一个文件都生成一个source-map
 *  
 * nosources-source-map 外部
 * cheap-source-map 外部
 * 
 * 开发环境： 速度快  eval > inline
 *          调试更友好 source-map > cheap-module-source-map
 * 生产环境： 源代码要进行隐藏 
 *          内联方案会使代码体积很大 排除此方案
 *          --直接使用source-map / cheap-source-map
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
    hot: true,
    devtool: 'source-map'
  }
}
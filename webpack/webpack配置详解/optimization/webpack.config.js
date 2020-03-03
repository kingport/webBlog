const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
  },
  module: {
    rules: [
      // loader 配置
      {
        test: /\.js$/,
        // 排除node_modules下的JS文件
        exclude: /node_modules/,
        // 只检查src目录下
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行
        // enforce: 'post'
        // 单个loader使用loader
        loader: 'eslint-loader',
        options: {

        }
        // use: ['style-loader','css-loader']
      },
      {
        //以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  pulgins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'prokduction',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30 * 1024,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticnameDelimiter: '~',
      name: true, // 可以使用命名规则
      // 分割chunk的组
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 当前打包模块和之前是同一个 就会复用
          reuseExistingChunk: true
        }
      }
    },
    // 将文件的hash值 单独打包成一个文件
    // 修改a文件导致b文件contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer:[
       // 配置生产环境的压缩方案 js/css
       new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
}
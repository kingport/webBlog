/**
 * 
 * 正常来讲 一个文件只能被一个loader处理
 * 当一个文件要被多个loader处理 那么一定要指定loader执行先后顺序
 *  先执行eslint 再执行babel
 * 
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义环境变量
process.env.NODE_ENV = 'production';

// 复用loader
const commonCss = [
  MiniCssExtractPlugin,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => {
        require('postcss-preset-env')()
      }
    }
  }
]

module.exports = {
  entry: './src/index.js',
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
        use: [
          ...commonCss,
          'less-loader']
      },
      // 处理css 
      {
        test: /\.css$/,
        use: [...commonCss]
      },
      // 处理图片资源 
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        // 配置 优化
        options: {
          // 8kb 以下使用base64处理
          limit: 8 *1024,
          name: '[hash: 10].[ext]',
          // 关闭es6模块
          esModule: false,
          // 指定输出到该目录下
          outputpath: 'imgs'
        }
      },
      // 处理html中img资源 
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
      // 处理JS语法检查
      {
        // package.json 中 eslintConfig添加配置 airbnb规则
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint',
        // 自动修复格式
        options: {
          fix: true
        }
      },
      // 处理JS兼容
      {        
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: {version: 3},
              targets: {
                fix: '50'
              }
            }
          ]
        }
      }       
    ]
  },
  plugins: [
    // html插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production',
}
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
  mode: 'development'
}

/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.base')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    port: 8080,
    open: false,
    inline: true,
    compress: true,
    hot: true,
    contentBase: path.join(__dirname, '../'),
    historyApiFallback: true,
    proxy: {}, // 代理请求
    stats: 'minimal'
  } // 开发服务器：run dev/start 的配置，如端口、proxy等
})

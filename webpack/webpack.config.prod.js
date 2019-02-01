/* eslint-disable */
const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBaseConfig = require('./webpack.config.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
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
          MiniCssExtractPlugin.loader,
          // 'style-loader',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css'
    }),
    new UglifyJsPlugin({
      exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
      cache: true,
      parallel: true, // 开启并行压缩，充分利用cpu
      sourceMap: false,
      extractComments: false, // 移除注释
      uglifyOptions: {
        compress: {
          unused: true,
          warnings: false,
          drop_console: true,
          drop_debugger: true
        },
        output: {
          comments: false
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true },
        mergeLonghand: false,
        discardComments: {
          removeAll: true // 移除注释
        }
      },
      canPrint: true
    })
  ] // 插件的配置：打包优化、资源管理和注入环境变量
})

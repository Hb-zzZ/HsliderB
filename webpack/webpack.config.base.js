/* eslint-disable */
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'), // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  output: {
    path: path.resolve(__dirname, '../dist'), // 解析路径为 ./dist
    filename: '[name].[hash:8].js'
  }, // 出口
  devServer: {}, // 开发服务器：run dev/start 的配置，如端口、proxy等
  stats: 'errors-only',
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    alias: {
      '@src': path.resolve(__dirname, '../src')
    }
  }, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  module: {
    rules: [

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images/', // 输出到images文件夹
              limit: 500 // 是把小于500B的文件打成Base64的格式，写入JS
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }, // 模块配置：配置loader（处理非 JavaScript 文件，比如 less、sass、jsx、图片等等）等
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // 抽离自己写的公共代码
          chunks: 'initial',
          name: 'common', // 打包后的文件名，任意命名
          minChunks: 2, // 最小引用2次
          minSize: 0 // 只要超出0字节就生成一个新包
        },
        styles: {
          name: 'styles', // 抽离公用样式
          test: /\.css$/,
          chunks: 'all',
          minChunks: 2,
          enforce: true
        },
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: path.resolve(__dirname, '../public/index.html'), // 配置要被编译的html文件
      hash: true,
      // 压缩 => html
      minify: {
        // removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true // 折叠 html 为一行
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    })
  ]
}

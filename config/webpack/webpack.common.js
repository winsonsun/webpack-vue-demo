const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkg = require('../../package.json')

module.exports = {
  entry: {
    'app': './src/app/main.js'
  },
  devtool: 'source-map',
  output: {
    filename: 'js/[name]-[chunkhash:7].js'
  },
  // Reference: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['.js', '.pug', '.css', '.vue', '.scss', '.sass'],
    alias: {
      'app': 'src/app',
      'vue$': 'vue/dist/vue'
    }
  },
  module: {
    rules: [
      // Preloaders
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      // Loaders
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [['es2015', {'modules': false}], 'stage-2']
        }
      },
      {
        test: /\.(scss|css|sass)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /^((?!font).)*\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader?publicPath=../&name=assets/img/[name]-[hash:7].[ext]'
      },
      // support for font files
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?publicPath=../&name=fonts/[name]-[hash:7].[ext]'
      },
      // support for .pug files
      {
        test: /\.pug$/,
        exclude: ['/node_modules/'],
        loader: 'pug-loader',
        query: {
          a: {
            b: 'yo'
          }
        }
      }
    ],
    loaders: [
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ],
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src/style', 'sass')]
        }
      }
    }),
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    // Reference: https://github.com/erm0l0v/webpack-md5-hash
    new WebpackMd5Hash(),
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('css/[name]-[hash:7].css'),
    // new webpack.ProvidePlugin({
    //   Promise: 'es6-promise'
    //   // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    // }),
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: pkg.name,
      template: '!!pug-loader!src/public/index.pug',
      locals: {
        test: 'test'
      },
      inject: false,
      environment: process.env.NODE_ENV,
      minify: {
        minimize: false,
        caseSensitive: true,
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  // Nice colored output
  stats: {
    colors: true
  }
}
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/Index.js',
    './src/assets/sass/style.scss',
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.min.js',
  },
  cache: true,
  optimization: {
    minimizer: [new TerserJSPlugin({
      terserOptions: {
        sourceMap: false,
        compress: {
          warnings: false,
          drop_console: true
        }
      }
    })],
  },
  module: {
    rules: [{
      test: /.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { sourceMap: false } },
        { loader: 'sass-loader', options: { sourceMap: false } },
      ],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: 'babel-loader',
      options: {
        presets: ['react', 'stage-0', 'env'],
        plugins: ['transform-class-properties', 'transform-decorators-legacy'],
      },
    },
    {
      test: /\.(jpe?g|png|svg|gif|woff|woff2|eot|ttf)$/,
      use: {
        loader: 'url-loader',
        options: {
          imit: 8192,
          name: './assets/images/[name].[ext]',
        },
      },
    }],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({ filename: 'style.min.css' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/', to: './assets/', force: true },
      ]
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
  ],
  devServer: {
    contentBase: './dist/',
    watchContentBase: true,
    historyApiFallback: true,
  },
};

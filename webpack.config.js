const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/Index.js',
    './src/assets/sass/style.scss',
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
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
        test: /\.(jpe?g|png|svg|gif|woff|woff2|eot|ttf|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            imit: 8192,
            name: './assets/images/[name].[ext]',
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new MiniCssExtractPlugin({
      filename: env ? '[name].css' : '[name].[hash].css',
      chunkFilename: env ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/', to: './assets/', force: true },
      ]
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './public/',
    watchContentBase: true,
    historyApiFallback: true,
  },
};

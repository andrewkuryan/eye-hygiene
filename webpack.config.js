const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const APP_TITLE = 'Eye Hygiene';
const SRC_DIR = 'src';
const DIST_DIR = 'dist';
const SCRIPT_ENTRY_POINT = 'index.tsx';
const SCRIPT_OUTPUT = 'index.js';
const HTML_ENTRY_POINT = 'index.html';
const HTML_OUTPUT = 'index.html';
const STYLES_OUTPUT = 'index.css';

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, SRC_DIR, SCRIPT_ENTRY_POINT),
  output: {
    filename: SCRIPT_OUTPUT,
    path: path.resolve(__dirname, DIST_DIR),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '@/layout': path.resolve(__dirname, 'src', 'layout'),
      '@/logic': path.resolve(__dirname, 'src', 'logic'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                paths: [path.resolve(__dirname, 'src', 'utils', 'styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.svg?$/,
        issuer: /\.tsx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: STYLES_OUTPUT,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: HTML_OUTPUT,
      template: path.resolve(__dirname, SRC_DIR, HTML_ENTRY_POINT),
      title: APP_TITLE,
      stylesFilename: STYLES_OUTPUT,
      scriptFilename: SCRIPT_OUTPUT,
    }),
  ],
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [
      new HtmlMinimizerPlugin({
        minify: HtmlMinimizerPlugin.swcMinify,
        minimizerOptions: {},
      }),
      new TerserPlugin(),
    ],
  },
  devServer: {
    static: [path.resolve(__dirname, DIST_DIR)],
    hot: true,
  },
});

const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

const APP_TITLE = 'Eye Hygiene';
const SRC_DIR = 'src';
const DIST_DIR = 'dist';
const STATIC_DIR = 'static';
const SCRIPT_ENTRY_POINT = 'index.tsx';
const SCRIPT_OUTPUT = 'index.js';
const WORKERS_DIR = 'workers';
const HTML_ENTRY_POINT = 'index.html';
const HTML_OUTPUT = 'index.html';
const STYLES_OUTPUT = 'index.css';

const workerEntries = fs
  .readdirSync(path.resolve(__dirname, SRC_DIR, WORKERS_DIR), { withFileTypes: true })
  .reduce(
    (acc, v) => ({
      ...acc,
      ...(v.isFile()
        ? {
            [v.name]: {
              import: path.resolve(__dirname, SRC_DIR, WORKERS_DIR, v.name),
              filename: path.join(
                WORKERS_DIR,
                path.format({ name: path.parse(v.name).name, ext: '.js' }),
              ),
            },
          }
        : {}),
    }),
    {},
  );

module.exports = (env, argv) => ({
  entry: {
    main: {
      import: path.resolve(__dirname, SRC_DIR, SCRIPT_ENTRY_POINT),
      filename: SCRIPT_OUTPUT,
    },
    ...workerEntries,
  },
  output: {
    path: path.resolve(__dirname, DIST_DIR),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '@/layout': path.resolve(__dirname, 'src', 'layout'),
      '@/logic': path.resolve(__dirname, 'src', 'logic'),
      '@/service': path.resolve(__dirname, 'src', 'service', 'index.ts'),
      '@/workers': path.resolve(__dirname, 'src', 'workers', 'ports'),
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
      APP_TITLE,
      STYLES_OUTPUT,
      SCRIPT_OUTPUT,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, STATIC_DIR), to: path.resolve(__dirname, DIST_DIR) },
      ],
    }),
    new DefinePlugin({
      APP_TITLE: JSON.stringify(APP_TITLE),
      WORKERS_DIR: JSON.stringify(WORKERS_DIR),
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
    static: [path.resolve(__dirname, DIST_DIR), path.resolve(__dirname, STATIC_DIR)],
    hot: true,
  },
});

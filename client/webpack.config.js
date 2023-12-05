const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

const workboxPlugin = require('workbox-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'notes-saved',
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc:'./src-sw.js',
        swDest:'src-sw.js',
      }),
     
      new WebpackPwaManifest ({
        fingerprints: false,
        inject: true,
        name: 'just another text editor',
        short_name:'text Editor',
        description: 'Another text editor',
        background_color: '#e6f0e6',
        theme_color:'#e6f0e6',
        start_url:'./',
        publicPath:'./',
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96,128,192,256,384,512],
          destination:path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

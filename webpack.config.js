const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "dist/index.html"),
    filename: "./index.html"
});
module.exports = {
  entry: './dist/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    // libraryTarget: 'commonjs2'

  },
   module: {
    rules: [
      {
        test: /\.js$/,

        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: { 
            presets: ['@babel/preset-env', '@babel/react'],
            plugins:['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
      
  plugins: [htmlWebpackPlugin , new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development')
    }
  })],

    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
        port: 3001
    }
};
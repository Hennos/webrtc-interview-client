const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'build'),
  },

  plugins: [new webpack.ProgressPlugin()],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /.css$/,

        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 3000,
  },

  devtool: 'source-map',
};

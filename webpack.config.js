const path = require('path');

module.exports = {
  entry: ['regenerator-runtime/runtime.js',  './src/lunar.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'lunar.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ]
      }
    ]
  }
};
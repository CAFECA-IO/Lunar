const path = require('path');

module.exports = {
  entry: './src/lunar.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'lunar.js'
  },
};
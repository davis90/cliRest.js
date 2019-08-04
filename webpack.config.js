const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const libraryName = 'clirest';
const outputFile = `${libraryName}.js`;

module.exports = {
  target: "node",
  entry: {
    apiFactory: `${__dirname}/src/api/apiFactory.js`
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: outputFile,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [{
      test: /.js$/,
      loader: 'babel-loader'
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      name: "vendors",
      chunks: 'all'
    }
  }
};

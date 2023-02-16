const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: './src/index.js', // the entry point of your app
  devtool: 'hidden-source-map', // disable sourcemaps
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: 'bundle.js', // the name of the output file
    path: path.resolve(__dirname, 'dist'), // the directory to output the bundle
  },
  module: {
    rules: [
      {
        test: /\.js$/, // match all JavaScript files
        exclude: /(node_modules)/, // exclude the node_modules directory
        use: {
          loader: 'babel-loader', // use the babel-loader to transpile JavaScript
          options: {
            presets: ['@babel/preset-env'], // use the @babel/preset-env preset for compatibility
          },
        },
      },
      {
        test: /\.css$/, // match all CSS files
        use: ['style-loader', 'css-loader'], // use the style-loader and css-loader to handle CSS imports
      },
    ],
  },
};

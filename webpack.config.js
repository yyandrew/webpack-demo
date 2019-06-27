const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ],
  devServer: {
    open: true // Open the page in browser
  }
}

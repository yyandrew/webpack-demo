const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parts = require('./webpack.parts')

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      })
    ]
  },
  parts.loadCSS(),
])
const productionConfig = merge([])
const developmentConfig = merge([
  parts.devServer()
])

module.exports = mode => {
  if (mode == 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}

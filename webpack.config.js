const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parts = require('./webpack.parts')
const path = require('path')
const glob = require('glob')

const PATHS = {
  app: path.join(__dirname, 'src')
}

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      })
    ]
  }
])

const productionConfig = merge([
  parts.extractCSS({
    use: 'css-loader'
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  })
])

const developmentConfig = merge([
  parts.devServer(),
  parts.loadCSS(),
])

module.exports = mode => {
  if (mode == 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}

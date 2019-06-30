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
  },
  parts.loadJavaScript({ include: PATHS.app })
])

const productionConfig = merge([
  {
    output: {
      chunkFilename: '[name].[chunkhash:4].js',
      filename: '[name].[chunkhash:4].js',
    },
  },
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:4].[ext]',
    }
  }),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.clean(),
  parts.attachRevision(),
  {
    optimization: {
      splitChunks: {
        chunks: 'initial'
      }
    }
  }
])

const developmentConfig = merge([
  parts.devServer(),
  parts.loadCSS(),
  parts.loadImages(),
])

module.exports = mode => {
  if (mode == 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}

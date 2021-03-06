const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

exports.devServer = () => ({
  devServer: {
    open: true // Open the page in browser
  }
})
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
})
exports.extractCSS = ({ include, exclude, use = []}) => {
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash:4].css',
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        }
      ]
    },
    plugins: [plugin],
  }
}
exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
})

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  }
})
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
})
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      }
    ]
  }
})
exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
})
exports.clean = path => ({
  plugins: [new CleanWebpackPlugin()],
})
exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    })
  ]
})
exports.enableSourceMap = () => ({
  devtool: 'source-map',
})

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')

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
    filename: '[name].css',
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

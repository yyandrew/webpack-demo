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

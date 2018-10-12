const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/'
  },
  devtool: 'source-map'
}

// The absolute path on this pc is below. Problem is that it is different on every pc
// C:\Users\Vader\Documents\javascriptProjects\BootcampJSCourse\boilerplate\public\scripts
// Luckily we can use Node's __dirname
// __dirname gives the path up until the root of the folder so iaw to here where webpack.config.js lives:
// C:\Users\Vader\Documents\javascriptProjects\BootcampJSCourse\boilerplate\
// But we can't just concatenate __dirname + \public\scripts !!!THAT SHIT DON'T WORK
// So luckily node gives us path (at the top of the file)
// can use a method on path, path.resolve, like we are doing in the output object

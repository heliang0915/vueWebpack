var path = require('path')
var webpack=require("webpack");
var WebpackDevServer=require("webpack-dev-server");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var vue=require("vue-loader");
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin;

//定义公共路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH=path.resolve(ROOT_PATH,'src/app.js');
var BUILD_PATH=path.resolve(ROOT_PATH,'build');
console.log(BUILD_PATH);
//,'vue-router','vue-resource'
module.exports = {
  entry: {
    app: './src/app.js',
    vueplus:['vue','vue-router','vue-resource']
  },
  output: {
    path:BUILD_PATH,
    publishPath: BUILD_PATH ,//'build/',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:7].[ext]'
      }
    ]
  },
  devServer: {
      // publicPath: "/dist/",
      stats: { colors: true },
      port: 8080,
      inline: true
  },
  vue: {
    loaders:{
      css:"style!css"
    }
  },
  babel:{
      presets:['es2015','stage-2'],
      plugins:['transform-runtime']
  },
  devtool:"#source-map",
  //第三方库配置
  plugins:[
      new CommonsChunkPlugin({
        name:"vueplus",
        filename:"vueplus.bundle.js",
        minChunks:Infinity
      }),
      new webpack.HotModuleReplacementPlugin()
  ]
}

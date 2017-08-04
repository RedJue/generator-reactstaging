
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 8080;

const HOST = 'localhost';

const args = process.argv;
const hot = args.indexOf('--hot') > -1;

// 本地环境静态资源路径
const localPublicPath = 'http://' + HOST + ':' + PORT + '/';

config.output.publicPath = localPublicPath; 
config.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);

// 开启热替换相关设置
if (hot === true) {
  config.entry.app.unshift('webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new OpenBrowserPlugin({ url: localPublicPath }));
}

// see http://webpack.github.io/docs/build-performance.html#sourcemaps
config.devtool = '#eval-cheap-module-source-map';

new WebpackDevServer(webpack(config), {
  hot: hot,
  inline: true,
  compress: true,
  stats: {
    chunks: false,
    children: false,
    colors: true
  },
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,
}).listen(PORT, HOST, function() {
  console.log(localPublicPath);
});




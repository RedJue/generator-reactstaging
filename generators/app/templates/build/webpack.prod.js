
var webpack = require('webpack');
var config = require('./webpack.config');

/*
process模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。
*/
var args = process.argv; //process.argv：当前进程的命令行参数数组。
// /*
// deploy 部署
// */
// // 测试环境静态资源 domain(域)
// var testPublicPath = '';
// // 生产环境静态资源 domain(域)
// var onlinePublicPath = '';

// if (online) {
//   config.output.publicPath = onlinePublicPath; 
// } else {
//   config.output.publicPath = testPublicPath; 
// }

// config.plugins.push(new RenamePlugin());
const uglify = args.indexOf('--uglify') > -1;
// 压缩 js, css
if (uglify) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  );
}
var compiler = webpack(config);

function callback(err, stats) {
  if (err) {
    console.log(err);
  } else {
    console.log(stats.toString({
      colors: true,
      chunks: false,
      children: false,
    }));
  }
}
compiler.run(callback);






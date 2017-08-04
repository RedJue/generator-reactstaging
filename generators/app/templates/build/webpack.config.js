const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");

// 项目根路径
const ROOT_PATH = path.resolve(__dirname, '../');
// 项目源码路径
const SRC_PATH = ROOT_PATH + '/src';
// 产出路径
const DIST_PATH = ROOT_PATH + '/dist';

// node_modules
const NODE_MODULES_PATH = ROOT_PATH + '/node_modules';
const __DEV__ = process.env.NODE_ENV !== 'production';

var alias = {
    'components': SRC_PATH + '/components/'
}
//routes
alias = Object.assign(alias, {
    'routes': SRC_PATH + '/routes/'
});
// pages
alias = Object.assign(alias, {
    'pages': SRC_PATH + '/pages/'
});
// css
alias = Object.assign(alias, {
    'css': SRC_PATH + '/css/'
});
// img
alias = Object.assign(alias, {
    'img': SRC_PATH + '/img/'
});
// store
alias = Object.assign(alias, {
    'store': SRC_PATH + '/redux/store/'
});
//reducers
alias = Object.assign(alias, {
    'reducers': SRC_PATH + '/redux/reducers/'
});
//actions
alias = Object.assign(alias, {
    'actions': SRC_PATH + '/redux/actions/'
});

alias = Object.assign(alias, {
    'react-router': NODE_MODULES_PATH + '/react-router/lib/index.js',
    'react-redux': NODE_MODULES_PATH + '/react-redux/lib/index.js',
    'redux': NODE_MODULES_PATH + '/redux/lib/index.js',
    'redux-thunk': NODE_MODULES_PATH + '/redux-thunk/lib/index.js',
    'react-router-redux': NODE_MODULES_PATH + '/react-router-redux/lib/index.js',
    'redux-logger': NODE_MODULES_PATH + '/redux-logger/lib/index.js',
    'redux-promise-middleware': NODE_MODULES_PATH + '/redux-promise-middleware/dist/index.js',
    'normalize.css': NODE_MODULES_PATH + '/normalize.css/normalize.css'
});

var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ['css-loader', 'sass-loader']
});

var cssConfig = __DEV__ ? cssDev : cssProd;
const routeComponentRegex = /pages\/routes\/([^\/]+\/?[^\/]+\/?[^\/]+).(js|jsx)$/
module.exports = {
    devtool: 'eval',
    entry: {
        libs: [
            'react', 'react-dom'
        ],
        app: [SRC_PATH + '/app.jsx']
    },
    output: {
        path: DIST_PATH,
        filename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
        chunkFilename: __DEV__ ? 'js/[name].js' : 'js/[name].[chunkhash].js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: SRC_PATH,
                exclude: routeComponentRegex,
                loader: 'babel-loader'
            },
            {
                test: routeComponentRegex,
                include: SRC_PATH,
                loader: ['bundle-loader?lazy', 'babel-loader']
            }
            ,
            {
                test: /\.(scss|css)$/,
                include: SRC_PATH,
                use: cssConfig
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: ['file-loader?limit=10000&name=[name].[ext]&outputPath=images/&publicPath=../',
                    'image-webpack-loader']
            },
            {
                test: /\.html$/,
                use: ['file-loader?name=[name].[ext]&outputPath=html/'],
                exclude: [SRC_PATH + '/app.ejs']
            },
            {
                test: /\.html$/,
                loader: 'html-minify-loader',
                exclude: [SRC_PATH + '/app.ejs']
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000&name=[name].[ext]&outputPath=icons/'
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=fonts/'
            }
        ]
    },
    resolve: {
        modules: [SRC_PATH, "node_modules"],
        alias: alias,
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            chunks: ['app', 'libs'],
            template: SRC_PATH + '/app.ejs'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            disable: __DEV__,
            allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin(), //稳定模块ID 使chunkhash稳定 实现持久化缓存
        new OptimizeCssAssetsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["libs","manifest"], 
            /** 分离 单独打包webpack的runtime
             *  runtime里面包含chunkId和chunkhash对象
             *  chunk的内容发生变化会使runtime也变化，使libs也发生变化
             * 这样每次改变chunk都会改变基础模块的hash值 无法有效利用缓存
             */
            minChunks: Infinity,
        }),
        new InlineManifestWebpackPlugin({ 
            //使分离出来的manifest.js 内联进html页面 减少一次请求
            name: 'webpackManifest'
        }),
        new webpack.NoEmitOnErrorsPlugin(),//编译报错之后，调过输出阶段
        new webpack.LoaderOptionsPlugin({
            test: /\.html$/,
            options: {
                'html-minify-loader': {
                    empty: true,        // KEEP empty attributes
                    cdata: true,        // KEEP CDATA from scripts
                    comments: true,     // KEEP comments
                    dom: {                            // options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
                        lowerCaseAttributeNames: false,      // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
                    }
                }
            },
        })
    ]
}
    ;
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    devtool: 'eval',
    entry: {
        vendor: [
            'react',
            'react-dom',
        ],
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].bundle.[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
                        plugins: ['transform-decorators-legacy'],
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: ['file-loader?name=[name].[ext]&outputPath=images/',
                    'image-webpack-loader']
            },
            {
                test: /\.html$/,
                use: ['file-loader?name=[name].[ext]&outputPath=html/'],
                exclude: path.resolve(__dirname, 'src/index.html')
            },
            {
                test: /\.html$/,
                loader: 'html-minify-loader',
                exclude: path.resolve(__dirname, 'src/index.html')
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000&name=[name].[ext]&outputPath=icons/'
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=fonts/'
            },
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                loader: 'imports-loader?jQuery=jquery'
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        openPage:'index.html',
        port: 5555,
        stats: "errors-only",
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: !isProd,
            allChunks: true
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new OptimizeCssAssetsPlugin(),
        new webpack.ProvidePlugin({
            react: "react",
            "react-dom": "react-dom"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
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
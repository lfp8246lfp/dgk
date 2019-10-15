var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');



process.traceDeprecation = true;

// 环境
var isProd = process.env.NODE_ENV === 'production';
var cssLoader = isProd ? ExtractTextPlugin.extract('css-loader') : ['style-loader', 'css-loader'];
var devLoader = [
    { loader: 'style-loader' },
    { loader: 'css-loader?sourceMap' },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'sass-loader?sourceMap' }
];
var scssLoader = isProd ? ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader') : devLoader;

var config = {
    context: path.join(__dirname, './src'),
    entry: {
        app: './main.js'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js'
    },
    resolve: {
        extensions: ['.js', '.css', '.vue', '.json'],
        alias: {
            'src': path.join(__dirname, './src'),
            'assets': path.join(__dirname, './src/assets'),
            'components': path.join(__dirname, './src/components'),
            'utils': path.join(__dirname, './src/utils'),
            'views': path.join(__dirname, './src/views')
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
           
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: cssLoader
        }, {
            test: /\.scss$/,
            use: scssLoader
        }, {
            test: /\.html$/,
            use: 'vue-html-loader'
        }, {
            test: /\.(png|jpg|gif|svg|ico)$/,
            use: ['url-loader?limit=4096&name=[path][name].[ext]?[hash:7]']
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: 'url-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            )
        }),
        new HtmlWebpackPlugin({
            template: '../index.html',
            inject: true,
            minify: {
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true
            },
            favicon: '../favicon.ico'
        }),
        // 注入webpack运行的环境变量（是否为开发环境）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        // new webpack.LoaderOptionsPlugin({
        //     vue: {
        //         postcss: [require('postcss-px2rem')({ remUnit: 75, propWhiteList: [] })]
        //     },
        // })
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8092,
        hot: false,
        historyApiFallback: true,
        noInfo: true,
        disableHostCheck: true,
        proxy: {
            '/mock': {
                target: 'http://localhost:9098'
            },
            '/casapi': {
                target: 'https://cas.houbank.net',
                changeOrigin: true
            }
        },
        contentBase: path.join(__dirname, './')
    },
    devtool: '#eval-source-map',
    externals: {
        'AMap': 'AMap'
    }

    
};

// build production
if (isProd) {
    config.devtool = '#source-map';

    config.module.rules[0].options = {
        loaders: {
            sass: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'vue-style-loader'
            })
        }
    };

    config.plugins.push(
        new ExtractTextPlugin('css/[name].[hash:7].css'),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'static'),
                to: path.join(__dirname, 'dist/static')
            }
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

if (!isProd) {
    // mock server startup
    var db = require('./mock/db.js');
    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router(db);
    var middlewares = jsonServer.defaults();

    server.use(middlewares);
    server.use('/mock', router);
    server.listen(9098, function () {
        /* eslint-disable */
        console.log('Mock API Server is running!');
    });
}

module.exports = config;

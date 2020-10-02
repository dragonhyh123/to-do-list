var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const Happypack = require("happypack");

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.tsx'),
        // 将 第三方依赖 单独打包
        vendor: ['react', 'react-dom','moment','antd']
    },
    output: {
        path: __dirname + "/dist",
        // filename 属性表示的是如何命名出来的入口文件，规则是一下三种：
        // [name] 指代入口文件的name，也就是上面提到的entry参数的key，因此，我们可以在name里利用/，即可达到控制文件目录结构的效果。
        // [hash]，指代本次编译的一个hash版本，值得注意的是，只要是在同一次编译过程中生成的文件，这个[hash].js
        //的值就是一样的；在缓存的层面来说，相当于一次全量的替换。
        filename: "js/[name].[chunkhash:8].js",
        // publicPath 参数表示的是一个URL 路径（指向生成文件的跟目录），用于生成css/js/图片/字体文件
        // 等资源的路径以确保网页能正确地加载到这些资源.
        // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值.
        // 例如，在localhost（即本地开发模式）里的css文件中边你可能用“./test.png”这样的url来加载图片，
        // 但是在生产模式下“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu上边的。
        // 这就意味着在生产环境你必须手动更新所有文件里的url为CDN的路径。
        //开发环境：Server和图片都是在localhost（域名）下
        //.image {
        // background-image: url('./test.png');
        //}
        // 生产环境：Server部署下HeroKu但是图片在CDN上
        //.image {
        //  background-image: url('https://someCDN/test.png');
        //}
        publicPath: './'
    },

    mode:"production",

    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['*', '.js', '.json', '.less','.jsx','.ts','.tsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            '@components': path.resolve(__dirname,'src/js/components')
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,        //为了提高打包速度，一定要把node_modules排除
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['es2015', 'react']
                    }
                }

                //用Happypack提高打包速度
                // test: /\.(js|jsx)$/,
                // exclude: /node_modules/,
                // loader: 'happypack/loader?id=js',
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }, {
                test: /\.css$/,
                // exclude: /node_modules/, 删掉次行  不然打包会报错  因为antd.css 在node_modules中
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },{
                test: /\.scss$/,
                // exclude: /node_modules/, 删掉次行  不然打包会报错  因为antd.css 在node_modules中
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', "sass-loader"]
                })
            }, {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: '8192',
                        outputPath: 'images/',
                        publicPath : '/images'
                    }
                }
            }, {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: '8192',
                        outputPath: 'font/'
                    }
                }
            },
            {
                test:/\.(ts|tsx)$/,
                use:['ts-loader'],
                exclude: /node_modules/

                //用Happypack提高打包速度
                // test:/\.(ts|tsx)$/,
                // exclude: /node_modules/,
                // loader:'happypack/loader?id=ts',
            }
        ]
    },
    plugins: [
        // webpack 内置的 banner-plugin
        new webpack.BannerPlugin("Copyright by 617962636@qq.com"),

        // html 模板插件
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html'
        }),

        // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),

        //报错的原因是webpack4已经升级不支持这种写法了,也就是说不在plugins里面进行操作。而是放在了optimization里面,写法不变
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         //supresses warnings, usually from module minification
        //         warnings: false
        //     }
        // }),

        // 分离CSS和JS文件
        new ExtractTextPlugin('css/[name].[chunkhash:8].css'),

        // 提供公共代码
        // webpack4已经不再支持这种写法了，在optimization里面写
        // new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/[name].[chunkhash:8].js'}),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),

        //压缩CSS代码
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        }),

        //帮助我们分析一个bundle的构成,它可以帮我们生成一张bundle的模块组成结构图，每个模块所占的体积一目了然
        // new Analyzer(),

        // new Happypack({
        //     id:'js',
        //     loaders:[{
        //         loader:'babel-loader',
        //         options:{presets: ['es2015', 'react']},
        //     }]
        // }),
        //
        // new Happypack({
        //     id:'ts',
        //     loaders:[{
        //         loader:'ts-loader',
        //         options:{},
        //     }]
        // })

        //Moment.js是一个日期时间处理相关的库，为了做本地化它会加载很多语言包，对于我们来说一般用不到其他地区的语言包，但它们会占很多体积，这时就可以用IgnorePlugin来去掉
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname,'dist/dll/manifest.json')),
        })
    ],
    optimization:{
        //压缩代码，移除多余的空格、换行及执行不到的代码，缩短变量名，在执行结果不变的前提下将代码替换为更短的形式
        minimize: true,
        minimizer: [new TerserPlugin({
            test:/\.js?$/,
            exclude:/\/node_modules/,
        })],
        //webpack4提取vendor，取代webpack3的commonchunkplugin
        splitChunks: {
            chunks: "all",
        }
    }
}
// 代码压缩
const TerserPlugin = require('terser-webpack-plugin');
// 进度条
const WebpackBar = require('webpackbar');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
let HyperDown = require('hyperdown');
let parser = new HyperDown;
// 查看项目size
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//监控日志
// const SentryCliPlugin = require('@sentry/webpack-plugin');
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'test'


// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-router': 'VueRouter',
        axios: 'axios',
    },
    // cdn的css链接
    css: [
          '//statics.easyliao.com/web/public/plugin/nprogress/0.2.0/nprogress.min.css',
    ],
    // cdn的js链接
    js: [
        '//statics.easyliao.com/web/vue/vue/2.6.14/vue.min.js',
        '//statics.easyliao.com/web/vue/vue-router/3.5.2/vue-router.min.js',
        '//statics.easyliao.com/web/vue/vuex/3.6.2/vuex.min.js',
        '//statics.easyliao.com/web/vue/axios/0.21.1/axios.min.js',
        '//statics.easyliao.com/web/public/plugin/echarts/5.1.2/echarts.min.js',
        '//statics.easyliao.com/web/public/plugin/nprogress/0.2.0/nprogress.min.js',
        '//statics.easyliao.com/web/public/plugin/lodash/4.17.21/lodash.min.js',
    ]
}

module.exports = {
    productionSourceMap: false,
    lintOnSave: false,//去掉eslint检验
    publicPath: '/webcall-operate/view',
    filenameHashing:true,//去掉hash
    css: {
        extract:true,
        requireModuleExtension: true,
        sourceMap: false,
        loaderOptions: {

        }
    },
    chainWebpack: config => {
        // 清除css，js版本号
        // 修改生产配置
        config.plugin('extract-css').tap(() => [{
            filename: `css/[name].css`,
            chunkFilename: `css/[name].css`
        }])
        // config
        //       .plugin('webpack-bundle-analyzer')
        //       .use(BundleAnalyzerPlugin)
        //最小化代码
        config.optimization.minimize(true);

        // 解决ie11兼容ES6
        config.entry('main').add('babel-polyfill');

        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                  .use('sass-resources-loader')
                  .loader('sass-resources-loader')
                  .options({
                      // 引入多个全局sass文件
                      resources: ['./src/assets/base/common/index.scss']
                  })
                  .end()
        });
        config.resolve.alias
              .set('@', path.join(__dirname, 'src'))
              .set('@assets', path.join(__dirname, 'src/assets'))
              .set('@scss', path.join(__dirname, 'src/assets/style'))

        config.module.rule('md')
              .test(/\.md/)
              .use('vue-loader')
              .loader('vue-loader')
              .end()
              .use('vue-markdown-loader')
              .loader('vue-markdown-loader/lib/markdown-compiler')
              .options({
                  // markdown-it config
                  preset: 'default',
                  breaks: true,
                  raw: true,
                  typographer: true,
                  preventExtract: true,
                  preprocess:  (markdownIt, source)=> {
                      return parser.makeHtml(source);//重点在这里！！！
                  }
              })
        // ============压缩图片 start============
        // config.module
        //       .rule('images')
        //       .use('image-webpack-loader')
        //       .loader('image-webpack-loader')
        //       .options({ bypassOnDebug: true })
        //       .end()
        // ============压缩图片 end============

        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============
        // 移除 prefetch 插件
        config.plugins.delete('prefetch-index');
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload-index');
    },
    configureWebpack: config => {
        config.plugins.push(new WebpackBar(), new ProgressBarWebpackPlugin());

        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction) config.externals = cdn.externals

        // 生产环境相关配置
        if (isProduction) {
            //关闭 webpack 的性能提示
            config.performance = {
                hints: false,
            };
            // 去掉注释
            config.plugins.push(
                  new TerserPlugin({
                      extractComments:false,
                      terserOptions: {
                          output: { // 删除注释
                              comments: false
                          },
                          ecma: undefined,
                          warnings: false,
                          parse: {},
                          compress: {
                              drop_console: true,
                              drop_debugger: true,
                              pure_funcs: ['console.log'] // 移除console
                          }
                      },
                      sourceMap: false,
                      parallel: true
                  }),
                  // 压缩js
                  // new TerserPlugin({
                  //     cache: true,
                  //     parallel: true,
                  //     sourceMap: false,
                  //     extractComments:false,
                  //     terserOptions: {
                  //         ecma: undefined,
                  //         warnings: false,
                  //         parse: {},
                  //         compress: {
                  //             drop_debugger: true, // 删除 debugger
                  //             drop_console: true, // 删除 console
                  //             pure_funcs: ['console.log'] // 移除console
                  //         },
                  //         mangle: true, // 不跳过错误的名称
                  //         module: false,
                  //         output: null,
                  //         toplevel: false,
                  //         nameCache: null,
                  //         ie8: false,
                  //         keep_classnames: undefined,
                  //         keep_fnames: false,
                  //         safari10: true,
                  //     },
                  // })
            );

            // 开启分离js
            config.optimization = {
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 30000, // 依赖包超过30000bit将被单独打包
                    automaticNameDelimiter: '_',
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                                return `${packageName.replace('@', '')}`;
                            },
                            priority: 10
                        }
                    }
                }
            };

        }
    },
    devServer: {
        port: 2062,
        proxy: {
            '/api': {
                // target: 'http://call.easyliao.com', // 生产
                target: 'http://prd19.easyliao.com', // 测试
                // target: 'http://192.168.169.24:7003',//崔世英
                // target:'http://192.168.169.26:8080',//朝辉
                // target: "http://192.168.169.45", //鹏涛
                // target: 'http://192.168.169.168:8081',//耀强
                // target: 'http://192.168.169.246:8081',//耀强
                // target: 'http://192.168.169.138:8080', // 朝晖
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '', //路径重写npm
                },
            },
        },
    },
}

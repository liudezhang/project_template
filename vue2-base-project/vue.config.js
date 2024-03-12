const { defineConfig } = require("@vue/cli-service")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const WebpackObfuscator = require("webpack-obfuscator")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

const devPlugins = []

const prodPlugins = [
  // gzip 压缩
  new CompressionWebpackPlugin({
    algorithm: "gzip", // 压缩算法
    test: /\.(js|html|css)$/, // 匹配文件名
    threshold: 2 * 1024, // 超过2kb压缩
    minRatio: 0.8, // 压缩比例
    deleteOriginalAssets: false, // 删除源文件
  }),
  // 代码混淆
  new WebpackObfuscator(),
  // 打包速度分析
  new SpeedMeasurePlugin(),
  // 图片压缩
  new ImageMinimizerPlugin({
    minimizer: {
      implementation: ImageMinimizerPlugin.imageminMinify,
      options: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 9 }],
          [
            "svgo",
            {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                      addAttributesToSVGElement: {
                        params: {
                          attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        ],
      },
    },
  }),
]

const plugins = Object.assign(
  // 公共插件
  [],
  process.env.NODE_ENV === "production" ? prodPlugins : devPlugins
)

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  // terser-webpack-plugin 配置
  terser: {
    terserOptions: {
      mangle: true, // 混淆
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  chainWebpack: (config) => {
    // 图片压缩 低于4kb的图片转为base64 (默认)
    config.module.rule("images").set("parser", {
      dataUrlCondition: {
        maxSize: 4 * 1024,
      },
    })
    // 设置标题
    // config.plugin("html").tap((args) => {
    //   args[0].title = "测试标题"
    //   return args
    // })
    // !移除 prefetch 插件 首屏加载速度优化
    // config.plugins.delete("prefetch")
  },

  configureWebpack: {
    name: "vue3.0",
    plugins,
    optimization: {
      // 代码分割 优化  代码分割的作用是把一个大文件拆分成多个小文件，这样可以提高应用的性能，因为拆分后的文件可以被多个页面共享。
      splitChunks: {
        chunks: "all",
        // maxInitialRequests: 5, // 一个入口最大的并行请求数
        cacheGroups: {
          // 抽离第三方插件
          vendor: {
            chunks: "all",
            test: /node_modules/, // 指定是node_modules下的第三方包
            name: "vendor",
            minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
            maxInitialRequests: 5, // 一个入口最大的并行请求数
            minSize: 0, // 最小尺寸，默认0
            priority: 50, // 优先级(权重)   值越大，越先提取
          },

          // element-ui 单独打包
          elementUI: {
            chunks: "all",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            name: "element-ui",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },

          // echarts 单独打包
          // echarts: {
          //   chunks: "all",
          //   test: /[\\/]node_modules[\\/]echarts[\\/]/,
          //   name: "echarts",
          //   minChunks: 1,
          //   maxInitialRequests: 5,
          //   minSize: 0,
          //   priority: 90,
          // },

          // 抽离自己写的公共代码，common这个名字可以随意起
          common: {
            chunks: "all", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            name: "common", // 任意命名
            test: /src/, // 正则规则验证，如果符合就提取 chunk
            minChunks: 2, // 引用次数最少
            maxInitialRequests: 5, // 一个入口最大的并行请求数
            minSize: 0, // 最小尺寸，默认0
            priority: 1, // 优先级
          },

          // 公共样式
          styles: {
            name: "styles",
            test: /\.(css|scss|less)$/, // 可自定义拓展你的规则
            chunks: "all", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            enforce: true, // 强制
          },

          // // 公共图片
          // images: {
          //   name: "images",
          //   test: /\.(png|jpg|jpeg|gif|svg)$/,
          //   chunks: "all",
          //   enforce: true,
          //   maxSize: 1024 * 10, // 超过10kb的图片会被压缩
          //   minSize: 1024 * 5, // 小于5kb的图片不会被压缩
          //   minChunks: 1, // 被引用次数大于等于这个次数的图片才会被压缩
          //   maxAsyncRequests: 5, // 最大的按需加载次数
          // },
        },
      },
    },
    // 启用 webpack5 内置缓存 提高二次构建速度
    cache: {
      type: "filesystem", // 使用文件缓存
      allowCollectingMemory: true, // 允许缓存可以收集内存中的数据  默认false
    },
  },
})

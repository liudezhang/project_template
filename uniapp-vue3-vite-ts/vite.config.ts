import { defineConfig, loadEnv } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import path from "path"
import AutoImport from "unplugin-auto-import/vite"
import UnoCSS from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "")

  return {
    define: {
      MODE_ENV: JSON.stringify(env.MODE_ENV) // 将.env中的APP_ENV变量注入到全局
    },
    plugins: [
      uni(),
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app", "pinia"],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: "src/auto-import.d.ts",
        // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
        eslintrc: {
          enabled: true, // 是否开启
          filepath: ".eslintrc-auto-import.json" // 生成的文件位置
        }
      })
    ],
    resolve: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    build: {
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      minify: "terser", // 生产环境使用terser压缩
      terserOptions: {
        compress: {
          // 生产环境移除console debugger
          drop_console: env.VITE_BUILD_DROP_CONSOLE === "true",
          drop_debugger: env.VITE_BUILD_DROP_CONSOLE === "true"
        }
      }
    },
    optimizeDeps: {
      force: true
    }
  }
})

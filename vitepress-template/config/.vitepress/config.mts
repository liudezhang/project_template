import { defineConfig, loadEnv } from "vitepress";

import nav from "../nav/index";
import sidebar from "../sidebar/index";
import path from "node:path";

// 加载环境变量
const env = loadEnv("", process.cwd());

const excludes = env.VITE_EXCLUDE.split(/[,，]/) || [];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vitepress-template",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    search: {
      // 搜索相关配置
      provider: "local",
    },
  },
  base: `/${env.VITE_BASE_PATH || ""}/`, // 部署站点的基础路径
  // 源文件目录  (相对于当前目录少一级，具体原因不知道)
  srcDir: "../docs",
  // 输出目录
  outDir: "../dist",
  // 缓存目录
  cacheDir: "../node_modules/.vitepress/.cache",
  srcExclude: excludes,
  markdown: {
    // lineNumbers: true, // 代码块显示行号
    theme: "one-dark-pro", // 代码块主题
    image: {
      lazyLoading: true, // 图片懒加载
    },
    config(md) {
      // 使用自定义插件
    },
  },
  // 额外的 Vite 配置
  vite: {
    resolve: {},
    clearScreen: false, // 在每次重新加载页面时是否清除控制台
    optimizeDeps: {
      force: true, // 强制依赖预构建
    },
    plugins: [],
  },
});

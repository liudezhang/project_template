import type { DefaultTheme } from "vitepress";

import path from "path";
import fs from "fs-extra";

import { createSidebar } from "./createSidebar";

const sidebar = createSidebar(path.resolve(__dirname, "../../docs/"));
fs.writeJson(path.resolve(__dirname, "./sidebar.json"), sidebar, {
  spaces: 2,
});

// 一个侧边栏的配置项
// export default [
//   {
//     text: "Home",
//     link: "/index",
//   },
//   {
//     text: "Examples",
//     collapsed: false,
//     items: [
//       {
//         text: "Markdown Examples",
//         link: "/examples/markdown-examples",
//       },
//       {
//         text: "Runtime API Examples",
//         link: "/examples/api-examples",
//       },
//     ],

//   },
// ] as DefaultTheme.Config['sidebar']

// 多个侧边栏的配置项
export default {
  // !静态侧边栏
  // "/node/": [
  //   {
  //     text: "Node",
  //     items: [
  //       {
  //         text: "Home",
  //         link: "/",
  //       },
  //     ]
  //   }
  // ]
  // !动态侧边栏
  ...sidebar,
} as DefaultTheme.Config["sidebar"];

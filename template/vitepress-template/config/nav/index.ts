import type { DefaultTheme } from "vitepress";

import path from "node:path";
import fs from "fs-extra";

import { createNav } from "./createNav";

const nav = createNav(path.resolve(__dirname, "../../docs/"));
fs.writeJson(path.resolve(__dirname, "./nav.json"), nav, {
  spaces: 2,
});

export default [
  // 静态导航栏
  {
    text: "Home",
    link: "/index",
  },
  // 动态导航栏
  ...nav,
] as DefaultTheme.Config["nav"];

/**
 *  自动生成导航栏
 */

// 不能用 require 引入模块，要用 import 引入模块 我也不知道为什么
// const path = require("path");
// const fs = require("fs");

import path from "node:path";
import fs from "node:fs";
import { loadEnv } from "vitepress";

// 排除的文件夹
const exclude = loadEnv("", process.cwd()).VITE_EXCLUDE.split(",");

// 递归生成导航栏
export function createNav(dir) {
  // nav 格式
  const nav = [
    // {
    //   text: "首页",
    //   link: "/",
    //   items:[
    //     {
    //       text: "首页",
    //       link: "/",
    //       items:[
    //         {
    //           text: "首页",
    //           link: "/",
    //         }
    //       ]
    //     }
    //   ]
    // }
  ];
  // 读取文件夹
  const files = fs.readdirSync(dir);
  // 遍历文件夹
  // files.forEach((file) => {
  //   // 排除的文件夹
  //   if (exclude.includes(file)) {
  //     return;
  //   }
  //   // 文件路径
  //   const filePath = path.resolve(dir, file);
  //   // 文件信息
  //   const stat = fs.statSync(filePath);
  //   // 如果是文件夹
  //   if (stat.isDirectory()) {
  //     // 递归
  //     // 添加到 nav
  //     nav.push({
  //       text: file,
  //       link: `/${file}/`,
  //     });
  //   }
  // });

  for (const file of files) {
    // 排除的文件夹
    if (exclude.includes(file)) {
      continue;
    }
    // 文件路径
    const filePath = path.resolve(dir, file);
    // 文件信息
    const stat = fs.statSync(filePath);

    // 如果是文件夹
    if (stat.isDirectory()) {
      nav.push({
        text: file,
        link: `/${file}/`,
      });
    }
  }

  return nav;
}

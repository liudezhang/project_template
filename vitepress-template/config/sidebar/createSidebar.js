// 递归生成侧边栏

import fs from "fs-extra";
import path from "node:path";
import { loadEnv } from "vitepress";

const excludes = loadEnv("", process.cwd()).VITE_EXCLUDE.split(/[,，]/) || [];

export function createSidebar(rootPath) {
  const sidebar = {};

  if (fs.existsSync(rootPath)) {
    const files = fs.readdirSync(rootPath);

    files.forEach((file) => {
      if (excludes.includes(file)) return;

      const filePath = path.join(rootPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const dirJson = path.join(filePath, "config", "dir.json");

        if (fs.existsSync(dirJson)) {
          const dir = fs.readFileSync(dirJson, "utf-8");
          const childSidebar = JSON.parse(dir);

          for (const key in childSidebar) {
            if (childSidebar.hasOwnProperty(key)) {
              const element = childSidebar[key];
              const sidebarItem = {
                text: element.title,
                link: `/${file}/${key}/`.replace(/\\/g, "/"),
                collapsed: true,
                items: [],
              };

              if (element.list && Object.keys(element.list).length > 0) {
                sidebarItem.items = createSidebarItems(
                  rootPath,
                  filePath,
                  key,
                  element.list,
                );
              }

              sidebar[`/${file}/`] = sidebar[`/${file}/`] || [];
              sidebar[`/${file}/`].push(sidebarItem);
            }
          }
        }
      }
    });
  }

  return sidebar;
}

// 递归生成子目录项 根目录路径 文件路径 父级键名 子目录项对象
function createSidebarItems(rootPath, filePath, parentKey, items) {
  const sidebarItems = [];

  for (const itemKey in items) {
    if (items.hasOwnProperty(itemKey)) {
      const item = items[itemKey];
      const relativePath = path.relative(rootPath, filePath);
      // 如果存在子目录 则递归生成
      if (item.list && Object.keys(item.list).length > 0) {
        sidebarItems.push({
          text: item.title,
          link: `/${relativePath}/${parentKey}/${itemKey}/`.replace(/\\/g, "/"),
          collapsed: true,
          items: createSidebarItems(
            rootPath,
            path.join(filePath, parentKey),
            itemKey,
            item.list,
          ),
        });
      } else {
        sidebarItems.push({
          text: item.title,
          link: `/${relativePath}/${parentKey}/${itemKey}`.replace(/\\/g, "/"),
        });
      }
    }
  }

  return sidebarItems;
}

const fs = require("fs-extra");

// 根据指定的数据结构，创建文件夹和文件 和 内容
// 1. 创建文件夹
// 2. 创建文件夹下的 index.md 文件
// 3. 创建文件夹下的文件

/**
 * 每个文件夹下要有一个 index.md 文件，内容为
 *  # title
 *  content
 * 文件内容为
 *  # title
 *  content
 */

// 使用 fs-extra 删除指定文件夹下的文件夹和文件 递归删除 特定文件夹除外 保留
function deleteDir(path, exclude = ["config"]) {
  fs.readdirSync(path).forEach((file) => {
    const curPath = `${path}/${file}`;
    // 是文件夹
    if (fs.statSync(curPath).isDirectory()) {
      // 如果是特定文件夹，不删除
      if (exclude.includes(file)) {
        return;
      }
      fs.rm(curPath, { recursive: true });
    } else {
      fs.rm(curPath);
    }
  });
}

// 根据 data 数据结构生成 数据结构
function createDataStructure(data) {
  const dataStructure = [
    // {
    //   title: "标题",
    //   path: "路径",
    //   content: "内容",
    //   list: [
    //     {
    //       title: "子标题",
    //       path: "子路径",
    //       content: "内容",
    //       list: [
    //         {
    //           title: "子子标题",
    //           path: "子子路径",
    //           content: "内容",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "标题",
    //   path: "路径",
    // },
  ];

  function createNode(nodeData, key) {
    const obj = {
      title: nodeData.title,
      content: nodeData.content,
      path: `${key}`,
    };

    if (nodeData.list && Object.keys(nodeData.list).length) {
      obj.list = [];
      for (const key in nodeData.list) {
        if (Object.hasOwnProperty.call(nodeData.list, key)) {
          const item = nodeData.list[key];
          const childNode = createNode(item, key);
          obj.list.push(childNode);
        }
      }
    }

    return obj;
  }

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const item = data[key];
      const nodeData = createNode(item, key);
      dataStructure.push(nodeData);
    }
  }

  return dataStructure;
}

/**
 * 递归创建文件夹和文件
 */
function createDir(dir, path = "./") {
  const dirList = Object.keys(dir);
  dirList.forEach((item, index) => {
    const itemPath = path + item;
    const itemContent = dir[item];

    if (itemContent.list) {
      fs.mkdirSync(itemPath);
      createDir(itemContent.list, itemPath + "/");

      const list = [];
      for (const key in itemContent.list) {
        if (Object.hasOwnProperty.call(itemContent.list, key)) {
          const element = itemContent.list[key];
          list.push({
            title: element.title,
            path: key,
          });
        }
      }
      const content = `# ${itemContent.title}\n\n${list
        .map((item) => {
          if (/\.md$/.test(item.path)) {
            return `- [${item.title}](${item.path})`;
          } else {
            return `- [${item.title}](${item.path}/)`;
          }
        })
        .join("\n")}`;

      fs.writeFileSync(`${itemPath}/index.md`, content);
    } else {
      fs.writeFileSync(
        `${itemPath}`,
        `# ${itemContent.title}\n\n${itemContent.content}`,
      );
    }
  });
}

// 根据 dir 创建 index.md 递归生成
function createIndexMd(dir, path = "./", name) {
  const data = createDataStructure(dir);

  let content = `# ${name}知识点\n\n`;

  function addLevel(array, level = 1) {
    array.forEach((item) => {
      item.level = level;
      if (item.list && item.list.length > 0) {
        addLevel(item.list, level + 1);
      }
    });
  }

  addLevel(data);

  // console.log(JSON.stringify(data, null, 2));

  function createContent(data, parentPath = "") {
    data.forEach((item) => {
      if (item.level > 1) {
        if (/\.md$/.test(item.path)) {
          content += `${"\t".repeat(item.level - 2)}- [${item.title}](${parentPath + item.path})\n\n`;
        } else {
          content += `${"\t".repeat(item.level - 2)}- [${item.title}](${parentPath + item.path}/index.md)\n\n`;
        }
      } else {
        content += `${"#".repeat(item.level + 1)} ${item.title}\n${item.content}\n\n`;
      }

      if (item.list) {
        createContent(item.list, parentPath + item.path + "/");
      }
    });

    return content;
  }

  content = createContent(data);

  fs.writeFileSync(path + "index.md", content);
}

module.exports = {
  deleteDir,
  createDir,
  createIndexMd,
};

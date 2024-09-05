const path = require("path");

const nodeList = require("../docs/example/config/dir.json");
const { createDir, deleteDir, createIndexMd } = require("./createDir.js");

const { sleep } = require("../utils/index.js");

// 生成文件夹的路径
const dirPath = path.join(__dirname, "../docs/example/");

// 删除之前生成的文件夹
deleteDir(dirPath);

sleep(500).then(() => {
  // 生成文件夹
  createDir(nodeList, dirPath);
});

sleep(300).then(() => {
  createIndexMd(nodeList, dirPath, "example");
});

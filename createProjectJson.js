import fs from "fs-extra";

// 排除的文件夹
const excludeDirs = ["node_modules", ".git", ".vscode", "dist", "public"];

// 读取当前项目下的文件夹
const dirs = fs.readdirSync("./");
// 过滤出文件夹
const dirsArr = dirs.filter((dir) => {
  return fs.statSync(dir).isDirectory() && !excludeDirs.includes(dir);
});

// 生成项目列表
const projectList = dirsArr.map((dir, index) => {
  const packageJson = fs.readJsonSync(`./${dir}/package.json`, {
    throws: false,
  });

  return {
    name: packageJson.name || dir,
    value: packageJson.description || dir,
    key: index + 1,
    description: packageJson.description || dir,
  };
});

// 写入文件
fs.writeJsonSync("./project.json", projectList);

const fs = require("fs-extra");
const { resolve } = require("path");
const { execSync } = require("child_process");

// 过滤出文件夹
const projectDirs = fs.readdirSync(resolve(__dirname, "../template"));

// 生成项目列表
const projectList = projectDirs.map((dir, index) => {
  const packageJson = fs.readJsonSync(
    resolve(__dirname, `../template/${dir}/package.json`),
    {
      throws: false,
    },
  );

  return {
    name: packageJson.name || dir,
    value: packageJson.name || dir,
    key: index + 1,
    description: packageJson.description || dir,
  };
});

// 写入文件
fs.writeJsonSync("./project.json", projectList, { spaces: 2 });

execSync("npm run prettier", {
  stdio: "inherit",
});

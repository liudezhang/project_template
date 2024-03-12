// commitlint提交检验规则 https://commitlint.js.org/#/reference-rules
// Commit message 包括三个部分：Header(必需)、Body(可选)和 Footer(可选)
// Header包括三个字段：type(必需)、scope(可选)和 subject(必需)
// <type>(<scope>): <subject>
// 提交类型(影响范围): 简短描述

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 限制Header最多200字
    // 'header-max-length': [2, 'always', 200],
    // 提交类型<type>枚举
    "type-enum": [
      2,
      "always",
      [
        "build", // 改变构建流程、或者增加依赖库、工具等 如webpack.config.js,package.json yarn.lock
        "chore", // 构建过程或辅助工具的变动，各种配置文件的修改，如.gitignore,tsconfig.json,.vscode,.tenone, eslint/stylelint,envConfig
        "ci", // 对CI自动化流程配置文件或脚本进行了修改
        "docs", // 只修改了项目说明文档
        "feat", // 新增功能，一个新的特性
        "fix", // 修复一个Bug
        "perf", // 性能优化
        "refactor", // 代码重构，既不是修复Bug(fix)也不是添加功能(feat)
        "revert", // 版本回滚，代码回退
        "test", // 修改或添加一个测试用例
        "clean", // 清理过时无用文件
        "merge", // 合并代码分支
        "style", //  只修改了样式文件(包括css/less/sass,图片,字体文件)
        "format", // 格式化,不影响代码含义的修改，比如空格、格式缩进、缺失的分号等
      ],
    ],
    // 'type-case': [0, 'always', 'start-case'],
    // 'type-empty': [0],
    // 'scope-empty': [0],
    // 'scope-case': [0],
    // 'subject-full-stop': [0, 'never'],
    // 'subject-case': [0, 'never'],
    // 'header-max-length': [0, 'always', 72],
  },
}

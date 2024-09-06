/** @type {import('cz-git').UserConfig} */

const typeList = [
  {
    value: "init",
    name: "init:      🎉   Initial commit | 初始化",
    emoji: ":tada:"
  },
  {
    value: "publish",
    name: "publish:   🚀   Update | 更新、发布一个版本",
    emoji: ":rocket:"
  },
  {
    value: "feat",
    name: "feat:      ✨   A new feature | 添加新特性",
    emoji: ":sparkles:"
  },
  {
    value: "fix",
    name: "fix:       🐛   A bug fix | 修复bug",
    emoji: ":bug:"
  },
  {
    value: "docs",
    name: "docs:      📝   Documentation only changes | 文档修改",
    emoji: ":memo:"
  },
  {
    value: "style",
    name: "style:     💄   Changes that do not affect the meaning of the code | 修改了空格、格式缩进、逗号等等，不改变代码逻辑",
    emoji: ":lipstick:"
  },
  {
    value: "refactor",
    name: "refactor:  ♻️    A code change that neither fixes a bug nor adds a feature | 代码重构，没有加新功能或者修复bug",
    emoji: ":recycle:"
  },
  {
    value: "perf",
    name: "perf:      ⚡️   A code change that improves performance | 优化相关，比如提升性能、体验",
    emoji: ":zap:"
  },
  {
    value: "WIP",
    name: "WIP:       🚧   Work in progress | 开发中",
    emoji: ":construction:"
  },
  {
    value: "release",
    name: "release:   🏹   Release | 发布",
    emoji: ":arrow_up:"
  },
  {
    value: "conflict",
    name: "conflict:  ⚔️    Conflict | 冲突",
    emoji: ":crossed_swords:"
  },
  {
    value: "merge",
    name: "merge:     🤝   Merge | 合并",
    emoji: ":handshake:"
  },
  {
    value: "test",
    name: "test:      ✅   Adding missing tests or correcting existing tests | 增加测试用例",
    emoji: ":white_check_mark:"
  },
  {
    value: "build",
    name: "build:     📦️   Changes that affect the build system or external dependencies | 依赖相关的内容",
    emoji: ":package:"
  },
  {
    value: "ci",
    name: "ci:        🎡   Changes to our CI configuration files and scripts | ci配置相关",
    emoji: ":ferris_wheel:"
  },
  {
    value: "chore",
    name: "chore:     🔨   Other changes that don't modify src or test files | 其他不修改src或测试文件的更改",
    emoji: ":hammer:"
  },
  {
    value: "revert",
    name: "revert:    ⏪️   Reverts a previous commit | 回滚到上一个版本",
    emoji: ":rewind:"
  },
  {
    value: "other",
    name: "other:     🎯   Other | 其他",
    emoji: ":dart:"
  }
]

const typeEnum = typeList.map((item) => item.value)

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 提交类型限制 0: 禁用 1: 警告 2: 错误
    "type-enum": [
      2,
      "always",
      [
        ...typeEnum
        // "init",
        // "publish",
        // "feat",
        // "fix",
        // "docs",
        // "style",
        // "refactor",
        // "perf",
        // "WIP",
        // "release",
        // "conflict",
        // "merge",
        // "test",
        // "build",
        // "ci",
        // "chore",
        // "revert",
        // "other"
      ]
    ]

    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: "选择关联issue前缀（可选）:",
      customFooterPrefix: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?"
    },
    scopes: [],
    types: typeList,
    useEmoji: true,
    emojiAlign: "center",
    useAI: false,
    aiNumber: 1,
    themeColorCode: "",
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      // { value: "link", name: "link:     链接 ISSUES 进行中" },
      // { value: "closed", name: "closed:   标记 ISSUES 已完成" }
    ],
    customIssuePrefixAlign: "top",
    emptyIssuePrefixAlias: "skip",
    customIssuePrefixAlias: "custom",
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: ""
  }
}

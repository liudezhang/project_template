---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vitepress-template"
  text: "A VitePress Site"
  tagline: 一个开箱即用的vitepress模板
  image:
    src: /logo.svg
    alt: vitepress
#   actions:
#     - theme: brand
#       text: Markdown Examples
#       link: /examples/markdown-examples
#     - theme: alt
#       text: API Examples
#       link: /examples/api-examples

# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

### 这是一个可以用来快速搭建文档网站的 VitePress 模板,根据指定的目录结构，自动生成侧边栏和导航栏和首页内容

步骤：

1. 在 `docs` 目录下创建 `[template]`文件夹
2. 在创建的`[template]`下创建 `config/dir.json` 文件，配置目录结构 ，可以参考 `docs/example/config/dir.json` 文件
3. 在 `create` 目录下创建 `[template].js` 文件，配置模板文件，可以参考 `create/example.js` 文件
4. 在终端中执行 `create/[template].js` 文件，生成文件夹和文件

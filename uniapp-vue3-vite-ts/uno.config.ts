import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini
} from "unocss"

// @unocss/transformer-directives 是 UnoCSS 的指令转换器，支持 @apply、@screen 和 theme() 指令。
import transformerDirectives from "@unocss/transformer-directives"

import presetWeapp from "unocss-preset-weapp"

import {
  extractorAttributify,
  transformerClass
} from "unocss-preset-weapp/transformer"

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify()

export default defineConfig({
  rules: [],
  theme: {
    // 解决小程序不支持 * 选择器
    // preflightRoot: ["page,::before,::after"]
  },
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      },
      cdn: "https://esm.sh/"
    })
  ],

  transformers: [
    transformerDirectives(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
})

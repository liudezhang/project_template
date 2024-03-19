import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini
} from "unocss"

// @unocss/transformer-directives 是 UnoCSS 的指令转换器，支持 @apply、@screen 和 theme() 指令。
import transformerDirectives from "@unocss/transformer-directives"

// import presetWeapp from "unocss-preset-weapp"

import type { Preset, SourceCodeTransformer } from "unocss"

import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
  transformerAttributify
} from "unocss-applet"

// uni-app
const isApplet = process.env?.UNI_PLATFORM?.startsWith("mp-") ?? false

const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
  presets.push(presetApplet())
  presets.push(presetRemRpx())
  transformers.push(transformerAttributify({ ignoreAttributes: ["block"] }))
  transformers.push(transformerApplet())
} else {
  presets.push(presetApplet())
  presets.push(presetAttributify())
  presets.push(presetRemRpx({ mode: "rpx2rem" }))
}

export default defineConfig({
  rules: [],
  theme: {
    // 解决小程序不支持 * 选择器
    // preflightRoot: ["page,::before,::after"]
  },
  presets: [
    ...presets,
    // presetMini(),
    // presetWeapp(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      },
      cdn: "https://esm.sh/"
    })
  ],

  transformers: [transformerDirectives(), ...transformers]
})

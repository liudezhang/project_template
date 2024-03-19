export {}

declare module "vue" {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

import type { AttributifyAttributes } from "@unocss/preset-attributify"

declare module "@vue/runtime-dom" {
  interface HTMLAttributes extends AttributifyAttributes {}
}

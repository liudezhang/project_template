import { createSSRApp } from "vue"
import store from "./store"
import "virtual:uno.css"
import "virtual:unocss-devtools"
import "@/style/index.scss"

import uviewPlus from "uview-plus"
import uViewPlusConfig from "@/config/uview_plus_config.js"

uni.$u.setConfig(uViewPlusConfig)

import App from "./App.vue"
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uviewPlus)

  return {
    app
  }
}

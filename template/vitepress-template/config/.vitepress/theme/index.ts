// https://vitepress.dev/guide/custom-theme
import { h, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import mediumZoom from "medium-zoom";

import "./style.css";
import "./style/custom.scss";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  setup() {
    // 使用 mediumZoom 插件 实现图片点击预览
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    );
  },
} satisfies Theme;

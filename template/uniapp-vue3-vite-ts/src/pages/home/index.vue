<template>
  <view class="home">
    <view class="">hello {{ userName }}</view>

    <view
      class="bg-green-200 h-2xl w-2xl"
      border="1 solid blue"
      flex="~ items-center justify-center"
    >
      change flag
    </view>

    <!-- Phosphor 图标中的基本锚点图标 -->
    <view class="i-ph-anchor-simple-thin"></view>

    <!-- 来自 Material Design 图标的橙色闹钟 -->
    <view class="i-mdi-alarm text-orange-400"></view>

    <!-- 大号 Vue 标志 -->
    <view class="i-logos-vue text-3xl"></view>

    <!-- Linght 模式下显示太阳，Dark 模式下显示月亮，引用自 Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon"></button>

    <!-- Twemoji 笑脸，悬停时变成眼泪 -->
    <view
      class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
    ></view>

    <view class="one">
      <button type="submit">提交</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user/index"

const userStore = useUserStore()

const userName = userStore.name
</script>

<style lang="scss" scoped>
.home {
  .one {
    @apply ~ items-center justify-center;
  }
}
</style>

<template>
  <view class="member pt-10 flex flex-col relative min-h-full w-full">
    <view class="flex-auto" flex="~ col  items-start justify-center">
      <view class="text-center">
        <image
          class="bg-red/10"
          src="https://img.cdn.sugarat.top/mdImg/MTY2ODA4OTc3MjcyMg==unocss-icon-gray.svg"
          mode="widthFix"
        />
        <image
          class="bg-blue/10"
          src="https://img.cdn.sugarat.top/mdImg/MTY2ODA4OTc3MjcyMg==unocss-icon-gray.svg"
          mode="widthFix"
        />
        <image
          class="bg-green/10"
          src="https://img.cdn.sugarat.top/mdImg/MTY2ODA4OTc3MjcyMg==unocss-icon-gray.svg"
          mode="widthFix"
        />
      </view>
      <view class="w-full!">
        <view
          class="text-center even:m3 odd:m3 even:bg-red odd:bg-green"
          v-for="item in 10"
          :key="item"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <view fw100 text="~ black center 3xl"> UnoCSS </view>
    <view m1 op80 text-lg fw300>
      The instant on-demand Atomic CSS engine.
    </view>
    <view m8 op80 text-2xl flex justify-center hover:op20>
      <view zoom-in-right i-carbon-logo-github animate="~ delay-100 "></view>
    </view>
    <view class="op80 fw600 text-center">
      on-demand · instant · fully customizable
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>

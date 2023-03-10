<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-23 11:09:02
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-12 19:15:41
 * @FilePath: \杭州绿城\greentown-wap\src\components\global\widget-layer\widget-layer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <van-popup v-model="visible" position="right" class="widget-layer">
    <van-nav-bar v-bind="$attrs" v-on="$listeners" :title="title" left-arrow @click-left="$emit('close')">
      <template #right v-if="isRight">
        <span class="exit lvfont-close" @click="handleClosedApp"></span>
      </template>
    </van-nav-bar>
    <div class="popup-content"><slot /></div>
  </van-popup>
</template>

<script>
export default {
  name: 'WidgetLayer',
  props: {
    title: { type: String, default: '标题' },
    visible: { type: Boolean, default: false },
    isRight:{type: Boolean, default: false }
  },
  data() {
    return {
      dialogSize: { width: '100%', height: '100%'},
    };
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
.widget-layer {
  background-color: $success-color;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 9999 !important;
}
.van-nav-bar {
  background-color: $success-color;

  &::after {
    display: none;
  }
}
.exit{
  display: block;
  width: rem(90);
  height: 100%;
  color: #ffffff;
  font-size: rem(54);
  padding: rem(15) rem(15);
  line-height: rem(60);
}

:deep(.van-nav-bar__text) {
  color: #ffffff;
}

:deep(.van-nav-bar__content) {
  height: rem(90);
}

:deep(.van-nav-bar__title) {
  color: #ffffff;
  font-size: rem(36);
  font-weight: 400;
}

:deep(.van-nav-bar__left) {
  padding-left: rem(20);
  padding-right: rem(20);
}

:deep(.van-icon-arrow-left) {
  color: #ffffff !important;
  font-size: rem(40);
}

.popup-content {
  width: 100%;
  height: calc(100% - rem(90));
  overflow: auto;
  background: #fff;
  position: relative;
  z-index: 2;
}
</style>

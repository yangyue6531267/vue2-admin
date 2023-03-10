<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-12-08 18:00:05
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-08 20:04:49
 * @FilePath: \杭州绿城\greentown-wap\src\components\global\widget-select\widget-select.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="widget-select">
    <div class="widget-select-btn" @click="visible = true">
      <span>{{ buttonText }}</span>
      <i class="iconfont lvfont-arrow-down-bold"></i>
    </div>
    <van-popup v-model="visible" position="bottom" class="widget-layer" get-container="body">
      <van-picker :title="title" show-toolbar :default-index="index" :columns="options" @confirm="handleConfirm" @cancel="handleCancel" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'WidgetSelect',
  // model: { prop: 'value', event: 'change' },
  props: {
    text: { type: Object, default: {} },
    title: { type: String, default: '标题' },
    options: { type: Array, default: () => [] },
    valueKey: { type: String, default: 'text' },
  },
  data() {
    return {
      index: 0,
      visible: false,
      buttonText: '选择',
    };
  },
  watch: {
    text: {
      handler(now, old) {
        if (now !== old) this.buttonText = now.text;
      },
      immediate: true,
    },

    options: {
      handler(now, old) {
        if (now !== old) this.initial();
      },
      immediate: true,
    },
  },
  methods: {
    initial() {
      const { text, options } = this;
      const index = options.findIndex(item => item.text == text.text);
      this.index = index > -1 ? index : 0;
    },

    // 取消选择
    handleCancel() {
      this.visible = false;
    },

    // 确定选择
    handleConfirm(value) {
      this.visible = false;
      this.buttonText = value.text;
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-select {
  &-btn {
    width: rem(200);
    height: rem(60);
    padding: 0 rem(20);
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: rem(28);
      color: rgba($color: #333, $alpha: 0.6);
    }
    .iconfont {
      font-size: rem(28);
      margin-left: rem(10);
    }
  }
}
</style>

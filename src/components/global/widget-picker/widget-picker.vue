<template>
  <div class="widget-picker">
    <button :class="['widget-picker-button', { 'is-active': visible }]" @click="visible = true">{{ buttonText }}</button>
    <van-popup v-model="visible" position="bottom" class="widget-layer">
      <van-picker :title="title" show-toolbar :default-index="index" :columns="options" @confirm="handleConfirm" @cancel="handleCancel" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'WidgetPicker',
  model: { prop: 'value', event: 'change' },
  props: {
    text: { type: [String, Number], default: '选择' },
    value: { type: [String, Number], default: '' },
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
        if (now !== old) this.buttonText = now;
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
      const index = options.findIndex(item => item.text == text);
      this.index = index > -1 ? index : 0;
    },

    // 取消选择
    handleCancel() {
      this.visible = false;
    },

    // 确定选择
    handleConfirm(data) {
      const { valueKey } = this;
      this.visible = false;
      this.buttonText = data.text;
      this.$emit('change', data[valueKey]);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-picker {
  &-button {
    display: block;
    height: rem(60);
    background: rgba($color: #000000, $alpha: 0.05);
    border-radius: rem(36);
    font-size: rem(28);
    line-height: rem(39);
    color: rgba($color: #000000, $alpha: 0.6);
    padding-left: rem(26);
    padding-right: rem(56);
    position: relative;
    border: none;
    outline: none;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: rem(22);
      border-style: solid;
      margin-top: rem(-5);
      border-width: rem(10) rem(8) 0;
      border-color: #100c08 transparent;
      border-radius: rem(3);
      transition: 0.3s ease-in-out;
    }

    &.is-active::after {
      transform: rotate(180deg);
    }
  }
}
</style>

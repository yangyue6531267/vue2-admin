<template>
  <span :class="['widget-ranking', icon]">{{ text || '' }}{{ value || '-' }}</span>
</template>

<script>
export default {
  name: 'WidgetRanking',
  props: {
    icon: { type: String, default: 'lvfont-crown' }, // 图标
    text: { type: String, default: '' }, // 文字
    value: { type: [String, Number], default: '-' }, // 数值
  },
};
</script>

<style lang="scss" scoped>
.widget-ranking {
  height: rem(32);
  font-size: rem(20);
  line-height: rem(32);
  padding-left: rem(6);
  padding-right: rem(7);
  background: linear-gradient(to right, #b37239 0%, #e4ad7c 82.89%);
  border-radius: rem(4);
  display: inline-block;
  vertical-align: top;
  position: relative;
  color: #fff;

  &::before {
    padding-right: rem(5);
  }
}
</style>

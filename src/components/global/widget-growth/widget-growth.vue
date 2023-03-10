<template>
  <span class="widget-growth">
    <i class="widget-growth__icon lvfont-increase"></i>
    <em class="widget-growth__text">{{ name }}</em>
    <em class="widget-growth__text">{{ data }}</em>
    <em class="widget-growth__text">{{ unit }}</em>
  </span>
</template>

<script>
export default {
  name: 'WidgetGrowth',
  props: {
    name: { type: String, default: '同比' },
    unit: { type: String, default: '亿元' },
    data: { type: [String, Number], default: '' },
  },
};
</script>

<style lang="scss" scoped>
.widget-growth {
  display: block;
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  color: #316bd8;

  &__icon {
    font-size: 16px;
    line-height: 1;
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
  }

  &-text {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>

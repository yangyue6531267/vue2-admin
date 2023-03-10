<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-13 14:37:10
 * @FilePath: \杭州绿城\greentown-wap\src\components\global\widget-tabs\widget-tabs.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="widget-tabs">
    <div class="widget-tabs__list">
      <template v-for="(item, index) in data">
        <span class="widget-tabs__item" :class="{ active: item.value === selected, disabled: item.disabled }" :disable="true" :key="index" @click="handleSwitch(item)">{{
          item.label
        }}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WidgetTabs',
  model: { prop: 'value', event: 'change' },
  props: {
    data: { type: Array, default: () => [] },
    value: { type: [Number, String], default: 0 },
  },
  data() {
    return {
      selected: 0,
    };
  },
  watch: {
    value: {
      handler(now, old) {
        if (now === old) return;
        if (now) this.selected = now;
      },
      immediate: true,
    },
  },
  methods: {
    handleSwitch({ value, disabled }) {
      if (disabled) {
        return;
      }
      this.$emit('change', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.widget-tabs {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto rem(30);

  &__list {
    width: 100%;
    height: rem(60);
    padding: rem(4);
    border-radius: rem(6);
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__item {
    flex: 1;
    height: 100%;
    font-size: rem(28);
    line-height: rem(52);
    text-align: center;
    padding: 0 rem(30);
    border-radius: rem(6);
    white-space: nowrap;
    transition: 0.25s ease-in-out;
    &.disabled{
      color:rgba(51,51,51,0.2)
    }

    &.active {
      color: #425bb5;
      background-color: #fff;
      font-weight: 500;
    }
  }
}
</style>

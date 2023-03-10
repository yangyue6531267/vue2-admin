<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-30 16:10:47
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-26 15:22:31
 * @FilePath: \杭州绿城\greentown-wap\src\components\widget\widget-legend.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="widget-legend">
    <div class="item" v-for="(item, i) in data" :key="i">
      <i :class="item.icon" :style="{ color: item.color }"></i>
      <span class="title">{{ item.title }}</span>
      <span class="value">{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  // 白底模块头部legend
  name: 'WidgetLegend',
  props: {
    data: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.widget-legend {
  width: 100%;
  padding: rem(20) rem(20);
  background: #fff;
  line-height: rem(30);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    flex: 1;
    // margin-right: 10px;
    display: flex;
    align-items: center;
    i {
      font-size: rem(22);
      margin-right: rem(6);
    }
    .title {
      font-style: normal;
      font-weight: 400;
      font-size: rem(20);
      color: rgba($color: #333, $alpha: 0.6);
      margin-right: rem(6);
    }
    .value {
      font-style: normal;
      font-weight: 500;
      font-size: rem(24);
      color: rgba($color: #333, $alpha: 0.6);
    }
  }
}
</style>

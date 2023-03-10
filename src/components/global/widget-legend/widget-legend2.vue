<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-30 16:10:47
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-11-30 19:03:24
 * @FilePath: \杭州绿城\greentown-wap\src\components\widget\widget-legend.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="widget-legend2">
    <div class="item" v-for="(item, i) in data" :key="i">
      <i :class="item.icon" :style="{ color: item.color }"></i>
      <span class="title">{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  // 灰底模块内legend
  name: 'WidgetLegend2',
  props: {
    data: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.widget-legend2 {
  width: 355px;
  margin-left: 10px;
  border-radius: 12px;
  padding: 10px;
  background: rgba($color: #425bb5, $alpha: 0.05);
  line-height: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    flex: 1;
    margin-right: 10px;
    display: flex;
    align-items: center;
    i {
      font-size: 18px;
      margin-right: 5px;
    }
    .title {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      color: rgba($color: #333, $alpha: 0.6);
      margin-right: 5px;
    }
    .value {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: rgba($color: #333, $alpha: 0.6);
    }
  }
}
</style>

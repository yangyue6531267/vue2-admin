<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-10-30 14:47:40
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-11-08 23:23:35
 * @FilePath: \杭州绿城\greentown-web\src\components\widget\widget-badge-title.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <h4 class="widget-badge-title" @click="$emit('alert')" :style="{ color }">
    <span class="name">{{ title }}</span>
    <span class="icon lvfont-more"></span>
    <span class="tags">{{ count }}</span>
  </h4>
</template>

<script>
export default {
  name: 'widgetBadgeTitle',
  props: {
    color: { type: String, default: '#000' },
    title: { type: String, default: '' },
    count: { type: [String, Number], default: 0 },
  },
};
</script>

<style lang="scss" scoped>
.widget-badge-title {
  color: #000;
  font-size: 20px;
  line-height: 1.4;
  padding-bottom: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  .name {
    display: inline-block;
    vertical-align: top;
    padding-right: 8px;
  }

  .icon {
    display: block;
    margin-top: 2px;
  }

  .tags {
    color: #fff;
    height: 20px;
    background: #d84b42;
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    padding: 0 13px;
    margin-left: 10px;
    margin-top: 1px;
  }
}
</style>

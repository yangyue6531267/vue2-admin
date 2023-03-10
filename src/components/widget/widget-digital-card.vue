<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-10 15:08:16
 * @FilePath: \杭州绿城\greentown-wap\src\components\widget\widget-digital-card.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="widget-digital-card">
    <i :class="['icon', icon]"></i>
    <p class="name">{{ data.name }}</p>
    <p class="label">{{ data.type }}</p>
    <p class="value">{{ data.value }}</p>
  </div>
</template>

<script>
export default {
  name: 'WidgetDigitalCard',
  props: {
    icon: { type: String, default: 'lvfont-warning' },
    data: { type: Object, default: () => ({}) },
  },
};
</script>

<style lang="scss" scoped>
.widget-digital-card {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: rem(24) rem(120) rem(24) 0;
  position: relative;

  .icon {
    width: rem(46);
    height: rem(46);
    color: #d84b42;
    font-size: rem(24);
    border-radius: rem(8);
    background-image: linear-gradient(-45deg, #fceded 36%, #ffffff 36%, #ffffff 50%, #fceded 50%, #fceded 86%, #ffffff 86%, #ffffff 100%);
    background-position: rem(-2) 0;
    background-repeat: repeat;
    background-size: rem(16) rem(16);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: rem(12);
  }

  .name {
    color: #333;
    font-size: rem(28);
    line-height: rem(46);
    white-space: nowrap;
    margin-left: rem(24);
  }

  .label {
    display: block;
    height: rem(38);
    padding: 0 rem(15);
    background: rgba(51, 51, 51, 0.05);
    line-height: rem(38);
    border-radius: rem(20);
    margin-left: rem(36);
    font-size: rem(20);
    color: rgba(51, 51, 51, 0.6);
  }

  .value {
    position: absolute;
    top: 0;
    right: 0;
    color: #d84b42;
    font-size: rem(36);
    font-weight: 500;
    line-height: rem(46);
    padding: rem(24) 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    transform: scaleY(0.5);
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:last-child::after {
    display: none;
  }
}
</style>

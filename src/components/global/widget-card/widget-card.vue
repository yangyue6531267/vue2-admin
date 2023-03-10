<template>
  <div class="widget-card">
    <h3 class="widget-card-head">
      <span :class="['icon', icon]"></span>
      <span class="name">{{ title }}</span>
      <span class="more el-icon-arrow-right"></span>
    </h3>
    <div class="widget-card-body" :class="layout">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetCard',
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    layout: { type: String, default: 'flex' },
  },
};
</script>

<style lang="scss" scoped>
.widget-card {
  &-head {
    width: 100%;
    height: 54px;
    padding: 16px 15px 10px;
    background-color: #ffffff;
    border-radius: 18px 18px 0 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .icon {
      display: block;
      width: 20px;
      height: 20px;
      color: #fff;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background: #1e4182;
    }

    .name {
      font-weight: 500;
      line-height: 28px;
      margin-left: 8px;
      font-size: 20px;
      color: #1e4182;
    }

    .more {
      color: #1e4182;
      font-size: 18px;
      line-height: 1;
      font-weight: 900;
      margin-left: 8px;
    }

    &::after {
      content: '';
      position: absolute;
      left: 15px;
      right: 15px;
      bottom: 0;
      height: 1px;
      background-color: #e6e6e6;
    }
  }

  &-body {
    height: calc(100% - 54px);
    border-radius: 0 0 18px 18px;
    background-color: #ffffff;
    padding-top: 10px;

    .flex {
      width: 100%;
      display: flex;
    }

    .block {
      display: block;
    }
  }
}
</style>

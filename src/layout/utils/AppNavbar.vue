<template>
  <div class="app-navbar">
    <div class="app-navbar__left">
      <span class="app-navbar__back lvfont-back" @click="handleBack"></span>
      <span class="app-navbar__date lvfont-calendar" @click="$emit('picker')"></span>
    </div>
    <div class="app-navbar__title" @click="$emit('switch')">{{ title }}</div>
    <div class="app-navbar__right">
      <span class="app-navbar__menu lvfont-menus" @click="$emit('open')"></span>
      <span class="app-navbar__exit lvfont-close" @click="handleClosedApp"></span> 
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: { type: String, default: '' },
  },
  data() {
    return {};
  },
  methods: {
    // 回退上页
    handleBack() {
      this.$router.back();
    },

    // 显示菜单
    handleOpened() {},

  },
};
</script>

<style lang="scss">
.app-navbar {
  position: fixed;
  z-index: 2006;
  top: 0;
  left: 0;
  width: 100%;
  height: rem(90);
  background-color: $success-color;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: rem(200);
  padding-right: rem(200);

  &__left {
    position: absolute;
    top: 0;
    left: 0;
    width: rem(180);
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: rem(15);

    span {
      display: block;
      width: rem(70);
      height: 100%;
      color: #ffffff;
      font-size: rem(54);
      padding: rem(15) rem(5);
      line-height: rem(60);
    }
  }

  &__title {
    color: #ffffff;
    font-size: rem(36);
    padding-right: rem(42);
    position: relative;
    @include singleLine;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: rem(8);
      width: rem(10);
      height: rem(10);
      border-style: solid;
      border-width: 0 rem(4) rem(4) 0;
      transform-origin: 75% 75%;
      transition: 0.3s ease-in-out;
      transform: rotate(45deg);
      margin-top: rem(-8);
    }

    &.visible::after {
      transform: rotate(225deg);
    }
  }

  &__right {
    position: absolute;
    top: 0;
    right: 0;
    width: rem(180);
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: rem(10);

    span {
      display: block;
      width: rem(90);
      height: 100%;
      color: #ffffff;
      font-size: rem(54);
      padding: rem(15) rem(15);
      line-height: rem(60);
    }
  }
}
</style>

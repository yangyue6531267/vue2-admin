<template>
  <div class="app-topnav" v-if="show">
    <div class="app-topnav-roll" role="tabroll">
      <div class="app-topnav-list" role="tablist">
        <div v-for="item in data" :key="item.name" :class="['app-topnav-item', { active: item.name === selected }]">
          <router-link :to="item.path">{{ item.title || '' }}</router-link>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      index:0
    };
  },
  props: {
    data: {
      type: Array, // 菜单列表
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false, // 是否显示菜单
    },
    type:{
      type: String,
      default: 'topnav', // 是否显示菜单
    }
  },
  computed: {
    selected() {
      const route = this.$route;
      console.log(this.data);
      console.log(route);
      return route.meta?.[this.type] || route.name;

    },
  },
};
</script>

<style lang="scss">
.app-topnav {
  position: fixed;
  z-index: 2006;
  top: rem(90);
  left: 0;
  width: 100%;
  height: rem(80);
  background-color: $success-color;
  overflow: hidden;
  border-bottom:1px solid #fff;

  &-roll {
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar-track-piece {
      display: none;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      display: none;
    }
  }

  &-list {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    padding: 0 rem(10);
  }

  &-item {
    height: 100%;
    a {
      display: block;
      height: 100%;
      font-size: rem(32);
      line-height: rem(48);
      white-space: nowrap;
      padding: rem(16) rem(20);
      transition: 0.35s ease-in-out;
      color: #ffffff;
      opacity: 0.4;
    }

    &.active a {
      color: #fff;
      font-weight: 600;
      opacity: 1;
    }
  }
}
</style>

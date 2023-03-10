<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-23 11:09:02
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-28 11:32:44
 * @FilePath: \杭州绿城\greentown-wap\src\layout\utils\AppTabbar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app-tabbar" v-if="show">
    <div class="app-tabbar-list" :style="{ alignItems:isIOS==='iOS'?'flex-start':'center'}">
      <div v-for="item in data" :key="item.name" :class="['app-tabbar-item', { active: item.name === selected }]">
        <router-link :to="item.path" class="app-tabbar-link">
          <div class="app-tabbar-icon"><img :src="tabIcon(item)" :alt="item.title" /></div>
          <div class="app-tabbar-text">{{ item.title || '' }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import RegionIcon from '@/assets/images/tabbar/region';
 
export default {
  props: {
    show: {
      type: Boolean,
      default: false, // 菜单列表
    },
    data: {
      type: Array,
      default: () => [], // 菜单列表
    },
  },
  mounted() {
  },
  computed: {
    selected() {
      const route = this.$route;
      return route.meta?.tabbar || route.name;
    },

    tabIcon() {
      const { selected } = this;
      return item => (item.name === selected ? RegionIcon[item.iconActive] : RegionIcon[item.icon])
    },
  },
};
</script>

<style lang="scss">
.app-tabbar {
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  width: 100%;
  height: rem(150);
  background: #fdfefe;
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);

  &-list {
    display: flex;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &-item {
    flex: 1;
  }

  &-link {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px 6px;
  }

  &-icon {
    width: 23px;
    height: 23px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-text {
    display: block;
    font-size: 10px;
    color: #989898;
    line-height: 1.4;
    margin-top: 2px;
  }

  &-item.active &-text {
    color: #3971e2;
  }
}
</style>

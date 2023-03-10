<template>
  <div :class="['app-container', contentClass]">
    <app-navbar :style="safeAreaTopTransform" :title="locate.name" @open="visibleMenu = true" @switch="visibleTree = true" @picker="visibleDate = true" />
    <app-topnav :style="safeAreaTopTransform" :show="showTabbar" :data="tabbarList" type="tabbar"/>
    <app-topnav :style="safeAreaTop" :show="showTopnav" :data="topnavList" type="topnav"/>

    <!-- <app-tabbar :show="showTabbar" :style="safeAreaBottom" :data="tabbarList" /> -->
    <div class="app-content" :style="safeAreaTop" ><router-view :key="index" /></div>
    <organize-tree :show.sync="visibleTree" :style="safeAreaCalcheight" @nodeClick="handleNodeClick" />
    <date-picker :show.sync="visibleDate" :style="safeAreaCalcheight" @change="handleDatepicker" />
    <menu-table :show.sync="visibleMenu" :isSearch.sync="isSearch" :style="safeAreaCalcheight" @flatData="getFlatDatalist" :data="menuTable" :async-data="collectMenus" />
    <widget-search class="menu-table" :style="safeAreaCalcheight" title="" :visible="isSearch" @close="isSearch = false" @searchModel='handleSearchModel'>
      <div v-for="(item,index) in SearchData">
        <menu-item type="list" class="newMenu" :name="item.name" :icon="item.icon"  @add="handleAdd(item)"
            @navigate="handleNavigate(item)" />
      </div>
    </widget-search>
  </div>
</template>

<script>
import AppTabbar from './utils/AppTabbar.vue';
import AppTopnav from './utils/AppTopnav.vue';
import AppNavbar from './utils/AppNavbar.vue';
import MenuTable from './utils/MenuTable.vue';
import DatePicker from './utils/DatePicker.vue';
import OrganizeTree from '@/components/organize-tree/organize-tree.vue';
import { traverseMatch } from '@/utils/traverse';
import { mapGetters } from 'vuex';
import MenusProject from '@/assets/images/menus/project/project';
import MenusRegion from '@/assets/images/menus/region/region';
let menusIcon;

export default {
  name: 'LayoutViewer',
  components: { AppTabbar, AppTopnav, AppNavbar, MenuTable, DatePicker, OrganizeTree,
      // 单个菜单
    MenuItem: {
      props: {
        icon: { type: String, default: '' }, // 图标
        name: { type: String, default: '' }, // 名字
        type: { type: String, default: 'list' }, // list 列表 | mine 关注
        editable: { type: Boolean, default: false }, // 是否可编辑
      },
      data() {
        return {
          events: { list: 'add', mine: 'remove' },
        };
      },
      computed: {
        emitName() {
          const { type, events, editable } = this;
          const name = events[type] || 'click';
          return editable ? name : 'navigate';
        },
      },
      render(h) {
        const { icon, name, type, emitName, editable } = this;
        const theme = `menu-table__state ${type}`;
        const handler = { click: () => this.$emit(emitName) };
        const vNodeSvg = <img src={`${menusIcon[name]}`}></img>;
        const vNodeIcon = <span class="menu-table__icon">{vNodeSvg}</span>;
        const vNodeName = <span class="menu-table__name">{name}</span>;
        const vNodeState = <span class={theme}></span>;
        return <div {...{ attrs: { class: 'menu-table__card' }, on: handler }}>{[vNodeIcon, vNodeName, editable ? vNodeState : null]}</div>;
      },
    },
  },
  data() {
    return {
      user: { name: '超级管理员', avatar: '', shape: 'radius' },
      logo: { collapse: '', expand: require('@assets/images/logo.svg') },
      menus: [],
      index: 0,
      visible: false,
      visibleMenu: false,
      visibleDate: false,
      visibleTree: false,
      isSearch:false,
      dynamicRoutes: { 0: '/region', 1: '/project' },
      collectMenus: [
        {
          id: 'RegionOverviewOperate',
          path: '/region/overview/operate',
          icon: 'lvfont-folder',
          name: '经营概况',
        },
        {
          id: 'RegionOverviewQuota',
          path: '/region/overview/quota',
          icon: 'lvfont-metrics',
          name: '年度指标',
        },
        {
          id: 'RegionOverviewPanoramic',
          path: '/region/overview/panoramic',
          icon: 'lvfont-folder',
          name: '全景经营兑现',
        },
        {
          id: 'RegionOverviewManage',
          path: '/region/overview/manage',
          icon: '',
          name: '管理事项',
        },
        {
          id: 'RegionInvestOverview',
          path: '/region/invest/overview',
          icon: 'lvfont-folder',
          name: '投资概览',
        },
        {
          id: 'RegionInvestDetail',
          path: '/region/invest/detail',
          icon: 'lvfont-folder',
          name: '投资项目明细',
        },
        {
          id: 'RegionInvestLandMarket',
          path: '/region/invest/land-market',
          icon: 'lvfont-folder',
          name: '土地市场',
        },
        {
          id: 'RegionInvestCashed',
          path: '/region/invest/cashed',
          icon: 'lvfont-folder',
          name: '投资兑现度',
        },
      ],
      flatData:[],
      SearchData:[]

    };
  },
  mounted() {
    // console.log('safeAreaInsets.support', safeAreaInsets.support)
    // console.log('safe-area-inset-top', safeAreaInsets.top)
    // console.log('safe-area-inset-bottom', safeAreaInsets.bottom)
  },
  computed: {
    ...mapGetters(['routes', 'locate', 'userInfo']),

    // 当前模块
    menuList() {
      const { locate = {}, routes } = this;
      const type = locate.type || 0;
      const item = routes.find(item => item.meta && item.meta.catid === type) || {};
      return item.children || [];
    },

    // 菜单表
    menuTable() {
      const { menuList = [] } = this;
      return menuList.map(item => {
        const items = [];
        const { name, path, meta, children = [] } = item;
        const length = children.length;
        const target = { id: name, path, name: meta?.title || '' };
        if (length === 0) {
          items.push({ id: name, path, name: meta?.title || '' });
        } else {
          for (let index = 0; index < length; index++) {
            const element = children[index];
            if (!element.meta.type || element.meta.type !== 'detail') {
              items.push({ id: element.name, path: element.path, icon: element.meta?.icon || '', name: element.meta?.title || '' });
            }
          }
        }

        target.children = items;
        return target;
      });
    },

    // tab菜单
    tabbarList() {
      const { menuList = [] } = this;
      return menuList.map(item => ({
        path: item.path,
        name: item.name,
        icon: item.meta.icon,
        title: item.meta?.title,
        iconActive: item.meta.iconActive,
      }));
    },

    // tab切换菜单
    topnavList() {
      const { routes, $route } = this;
      const target = traverseMatch(routes, $route.matched);
      return target.map(item => ({
        path: item.path,
        name: item.name,
        icon: item.meta.icon,
        title: item.meta?.title,
        iconActive: item.meta.iconActive,
      }));
    },

    // 内容标题
    contentClass() {
      const meta = this.$route.meta;
      const classname = [];
      const { topnavList } = this;
      if (meta.type !== 'detail') classname.push('app-existed__tabbar');
      if (meta.type !== 'detail' && topnavList.length > 0) classname.push('app-existed__topnav');
      return classname.join(' ');
    },

    // 是否显示tabbar
    showTabbar() {
      return this.$route?.meta?.type !== 'detail';
    },

    // 是否显示topnav
    showTopnav() {
      const { topnavList, $route } = this;
      return topnavList.length > 0 && $route?.meta?.type !== 'detail';
    },

    // 当前路由标题
    headerTitle() {
      const { meta = {} } = this.$route;
      return meta.title || '';
    },

    // safeAreaTopTransform
    safeAreaTopTransform() {
      return {
        transform: `translateY(${this.safeAreaInsets.top}px)`
      }
    },
    // safeAreaBoottom
    safeAreaTop() {
      return {
        transform: `translateY(${this.safeAreaInsets.top+40}px)`
      }
    },
  },
  methods: {
    handleTouchStart(){
      console.log(1)
    },
    handleTouchMove(){
      console.log(2)
    },
    handleTouchEnd(){
      console.log(3)
    },
    // 时间选择
    handlePick() {},

    // 获取数据
    getFlatDatalist(value){
      this.flatData = value
      menusIcon = this.flatData[0].path.includes('/region')? MenusRegion: MenusProject
    },  

    // 跳转链接
    handleNavigate(data) {
      this.isSearch = false;
      this.visibleMenu = false;
      this.$router.push({ path: data.path });
    },

    // 搜索回调
    handleSearchModel(data) {
      if(data){
        this.SearchData = this.flatData.reduce((pru,cur)=>{
          if(cur.name.includes(data)){
             pru.push(cur)
          }
          return pru
        },[])
      }else{
        this.SearchData= []
      }
    },

    // 打印内容
    handlePrint() {},

    // 显示组织树
    handleVisible() {
      const { visible } = this;
      this.visible = !visible;
    },

    // 日期全局选择
    handleDatepicker(data) {
      this.$store.commit('SET_DATETIME', data);
      this.index = this.index + 1;
    },

    // 点击数节点
    handleNodeClick(node) {
      const route = this.$route;
      const father = route.matched[0];
      const current = route.path;
      const routeNow = this.dynamicRoutes[node.type || 0];
      if (routeNow !== father.path) this.$router.replace(routeNow);
      this.index++;
    },
  },
}
</script>
<style lang="scss">
.app {
  &-container {
    width: 100%;
    height: 100%;
    padding-top: rem(90);
    overflow-x: hidden;
    overflow-y: auto;
    &.app-existed__topnav {
      padding-top: rem(170);
    }

    &.app-existed__tabbar {
      padding-bottom: rem(150);
    }
  }
}
</style>

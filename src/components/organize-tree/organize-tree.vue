<template>
  <widget-layer :title="tabTitle" :visible="visible" @close="handleClose" :isRight="true" >
    <ul class="organize-tabs">
      <template v-for="item in tabOption">
        <li :key="item.name" :class="['organize-tabs-item', { active: item?.name === tabActive }]" @click="handleChange(item)">
          <span>{{ item.label }}</span>
        </li>
      </template>
    </ul>
    <div class="organize-pane">
      <div class="organize-mine" v-show="tabActive === 'mine'">
        <div class="organize-list">
          <template v-for="item in storeList">
            <organize-item :key="item.code" :data="item" @navigate="handleNavigate" @collect="handleCollect" />
          </template>
        </div>
      </div>
      <div class="organize-tree" v-show="tabActive === 'tree'">
        <div class="organize-search">
          <van-search v-model="form.search" placeholder="请输入架构名称进行搜索" @search="handleSearch" />
        </div>
        <div v-if="form.search" class="organize-result">
          <div class="organize-list" v-if="searchList.length > 0">
            <template v-for="item in searchList">
              <organize-item :key="item.code" :data="item" @navigate="handleNavigate" @collect="handleCollect" />
            </template>
          </div>
          <div v-else class="organize-empty">没有搜索到内容</div>
        </div>
        <div v-else class="organize-viewer">
          <organize-path :data="routes" @switch="handleSwitch" />
          <!-- <div class="organize-locate">当前位置：{{ locate?.name }}</div> -->
          <van-swipe
            ref="vanSwipe"
            class="organize-region"
            :autoplay="0"
            :loop="false"
            :initial-swipe="selected"
            :show-indicators="false"
            :touchable="false"
          >
            <template v-for="(group, index) in levels">
              <template v-if="index === 0">
                <van-swipe-item class="organize-region-view" :key="index">
                  <template v-if="authRegion.length === 1">
                    <organize-item :data="authRegion[0]" @navigate="handleNavigate" @collect="handleCollect" />
                  </template>
                  <template v-for="item in group">
                    <organize-item
                      :key="item.code"
                      :data="item"
                      :show-child="true"
                      :show-level="authRegion.length === 1"
                      @switch="handleUnfold"
                      @navigate="handleNavigate"
                      @collect="handleCollect"
                    />
                  </template>
                </van-swipe-item>
              </template>
              <template v-else>
                <van-swipe-item class="organize-region-view" :key="index">
                  <template v-for="item in group">
                    <organize-item
                      :key="item.code"
                      :data="item"
                      :show-child="true"
                      @switch="handleUnfold"
                      @navigate="handleNavigate"
                      @collect="handleCollect"
                    />
                  </template>
                </van-swipe-item>
              </template>
            </template>
          </van-swipe>
        </div>
      </div>
    </div>
  </widget-layer>
</template>

<script>
import OrganizeItem from './organize-item.vue';
import OrganizePath from './organize-path.vue';
import { flattenedTree, traverseMatch, findTargetedPath } from './utils/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'OrganizeTree',
  components: { OrganizeItem, OrganizePath },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: { search: '' },
      routes: [], // 层级路由
      levels: [], // 层级视图
      flatTree: [], // 组织扁平化数组
      storeList: [], // 收藏列表
      searchList: [], // 搜索列表
      visible: false,
      selected: 0,
      tabTitle: '组织/项目切换',
      tabActive: 'tree',
      tabOption: [
        // { label: '我的收藏', name: 'mine' },
        { label: '组织架构', name: 'tree' },
      ],
    };
  },
  watch: {
    show: {
      handler(now, old) {
        if (now !== old) this.visible = now;
      },
      immediate: true,
    },
  },
  computed: mapGetters(['locate', 'authRegion']),
  mounted() {
    const { locate, authRegion } = this;

    const items = new Array(8).fill([]);
    const routes = findTargetedPath(authRegion, locate.code); // 面包屑导航路径
    const levels = traverseMatch(authRegion, routes);
    const length = routes.length;

    this.routes = length > 1 ? routes.slice(0, -1) : routes;


    this.levels = items.map((item, index) => levels[index] || item);
    this.flatTree = flattenedTree(authRegion);

    this.handleChange(this.tabOption[0]);
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.visible = false;
      this.$emit('update:show', false);
    },

    // 标签更改
    handleChange({ name, label }) {
      // this.tabTitle = label;
      this.tabActive = name;
      if (name === 'tree') {
        this.$nextTick(() => {
          this.$refs.vanSwipe?.resize();
          this.selected = this.routes.length - 1;
        });
      }
    },

    // 层级切换
    handleSwitch(item, index) {
      const { routes } = this;
      this.routes = routes.slice(0, index + 1);
      this.$refs.vanSwipe.swipeTo(index);
    },

    // 组织搜索
    handleSearch(data) {
      const items = [];
      if (data.length >= 1) {
        this.flatTree.forEach(item => item?.name.includes(data) && items.push(item));
        this.searchList = items;
      } else {
        this.searchList = items;
      }
    },

    // 展开组织
    handleUnfold(data) {
      const { routes, selected } = this;
      if(routes.some((item)=>{return item.level===data.level})){
        this.routes =  routes.reduce((pur,cur)=>{
          if(cur.level===data.level){
            cur = data
          }
          pur.push(cur)
          return pur
        },[])
      }else{
        this.routes.push(data);
      }
      this.levels[Number(data.level)-1] = data.children;
      this.$refs.vanSwipe.next();
    },

    // 收藏区域
    handleCollect() {},

    // 跳转链接
    handleNavigate(data) {
      const { locate } = this;
      const value = data.code || '';

      if (locate.code !== value) {
        this.$store.commit('user/SET_LOCATE', data);
        this.$emit('nodeClick', data);
      }
      this.$nextTick(() => this.$emit('update:show', false));
    },
  },
};
</script>

<style lang="scss" scoped>
.organize {
  &-tabs {
    height: rem(80);
    background-color: $success-color;
    padding: 0 rem(10);
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-item {
      color: #ffffff;
      opacity: 0.4;
      padding: 0 rem(20);
      font-size: rem(32);
      transition: 0.3s ease-in-out;

      &.active {
        opacity: 1;
      }
    }
  }

  &-pane {
    height: calc(100% - rem(80));
    background-color: #F3F6FA;
  }

  &-mine {
    height: 100%;
    overflow: auto;
  }

  &-tree {
    height: 100%;
    overflow: auto;
  }

  &-empty {
    color: #bababa;
    padding: rem(60);
    font-size: rem(28);
    text-align: center;
  }

  &-search {
    .van-search {
      padding: rem(30) rem(30) rem(20);
      background-color: transparent;
    }

    :deep(.van-search__content) {
      height: rem(66);
      padding-left: rem(30);
      border-radius: rem(33);
      background-color: #fff;

      .van-cell {
        font-size: rem(28);
      }
    }
  }

  &-result {
    height: calc(100% - rem(116));
    padding-bottom: rem(24);
    overflow: auto;
  }

  &-viewer {
    height: calc(100% - rem(116));
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-locate {
    font-size: rem(24);
    line-height: rem(34);
    padding: rem(24) rem(30) 0;
    color: #333333;
    opacity: 0.6;
  }

  &-region {
    flex:1;
    // height: calc(100% - rem(105));
    padding-top: rem(16);
    padding-bottom: rem(60);

    :deep(.van-swipe-item) {
      overflow: auto;
    }
  }
}

.widget-layer {
  background-color: #f3f6fa;
}
</style>

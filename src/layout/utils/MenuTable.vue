<template>
  <widget-layer class="menu-table" :title="title" :visible="visible" :isRight="true" @close="handleClose">
    <!-- <div class="favorites-pane">
      <header-block type="mine" name="我的关注" @toggle="handleUpdate" />
      <ul class="menu-table__list">
        <li class="menu-table__item" v-for="item in asyncData" :key="item.id">
          <menu-item
            type="mine"
            :name="item.name"
            :icon="item.icon"
            :editable="editable"
            @remove="handleRemove(item)"
            @navigate="handleNavigate(item)"
          />
        </li>
      </ul>
    </div> -->
    <div class="organize-search">
      <van-search ref="organizeSearch" placeholder="请输入模块名进行搜索" disabled @click="handleFous" />
    </div>
    <div class="menu-table__group" v-for="(group, index) in listData" :key="'group' + index">
      <header-block :name="group.name" />
      <ul class="menu-table__list">
        <li class="menu-table__item" v-for="(item, index) in group.children" :key="'groupChildren' + index">
          <menu-item type="list" :name="item.name" :icon="item.icon" :editable="editable" @add="handleAdd(item)" @navigate="handleNavigate(item)" />
        </li>
      </ul>
    </div>
  </widget-layer>
</template>

<script>
import { render } from 'nprogress';
import MenusProject from '@/assets/images/menus/project/project';
import MenusRegion from '@/assets/images/menus/region/region';
let menusIcon;
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    asyncData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editable: false,
      visible: false,
      isSearch: false, // 搜索弹窗
      listData: [],
      childList: {},
      options: [],
      flatData: [],
      SearchData: [],
      title: '',
    };
  },
  watch: {
    show: {
      handler(now, old) {
        if (now !== old) this.visible = now;
      },
      immediate: true,
    },
    data: {
      handler(now, old) {
        if (now !== old) {
          if (now[0].name === '区域首页') {
            this.title = '区域导航';
            menusIcon = MenusRegion;
            this.childList = {
              营销专项: ['合同', '回款'],
              货值专项: ['货值概览', '货值兑现', '供销匹配'],
              效率专项: ['节点概览', '运营效率'],
              利润: ['净利润', '归母净利润'],
              两费: ['两费费率', '管理费', '营销费'],
              资金: ['资金变动', '重要收支', '销售监管资金'],
            };
          } else {
            this.title = '项目导航';
            menusIcon = MenusProject;
            this.childList = {
              经营情况: ['项目经营状况', '年度指标达成', '核心指标对比表'],
              '项目进度/现金流': ['现金流曲线', '项目整体进度'],
              经营策划决策点跟踪: ['固化类决策点', '限制类决策点'],
              '净利润/现金流': ['净利润_现金流'],
            };
          }
          this.solveMenuData(now);
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 添加关注
    handleAdd(data) {
      console.log('add', data);
    },

    handleFous(data) {
      this.$refs.organizeSearch.blur();
      this.$emit('update:isSearch', true);
    },

    // 移除关注
    handleRemove(data) {
      console.log('remove', data);
    },

    // 关闭弹窗
    handleClose() {
      this.visible = false;
      this.$emit('update:show', false);
    },

    // 编辑菜单
    handleUpdate(data) {
      this.editable = data === 'edit';
    },

    // 跳转链接
    handleNavigate(data) {
      this.$router.push({ path: data.path });
      this.$emit('update:show', false);
      this.isSearch = false;
    },
    // 处理菜单数据
    solveMenuData(list) {
      this.listData = list.map(item => {
        let children = [];
        item.children.map(child => {
          if (this.childList[child.name]) {
            this.childList[child.name].map(name => {
              child.name = name;
              children.push(JSON.parse(JSON.stringify(child)));
            });
          } else {
            children.push(child);
          }
        });
        item.children = children;
        return item;
      });
      const flatten = arr => {
        return arr.reduce((res, curr) => res.concat(Array.isArray(curr.children) ? flatten(curr.children) : curr), []);
      };
      this.$emit('flatData', flatten(this.listData));
    },
  },
  components: {
    // 标题
    HeaderBlock: {
      props: {
        type: {
          type: String,
          default: 'list',
        },
        name: {
          type: String,
          default: 'list',
        },
      },
      data() {
        return {
          status: 'show',
          statusText: { edit: '完成', show: '管理' },
        };
      },
      methods: {
        // 编辑状态切换
        handleToggle() {
          const { status } = this;
          this.status = status === 'edit' ? 'show' : 'edit';
          this.$emit('toggle', this.status);
        },
      },
      render(h) {
        const { type, name, status, statusText } = this;
        const attrs = { class: 'menu-header__action' };
        const handler = { click: () => this.handleToggle() };
        const actionText = statusText[status];
        const vNodeTitle = <h4 class="menu-header__title">{name}</h4>;
        const vNodeAction = type === 'list' ? null : <button {...{ attrs, on: handler }}> {actionText}</button>;
        return <div class="menu-header">{[vNodeTitle, vNodeAction]}</div>;
      },
    },

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
};
</script>

<style lang="scss">
.favorites {
  &-pane {
    margin-bottom: rem(20);
    background-color: #fff;
  }
}
.newMenu {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  height: rem(124);
  border-bottom: 1px solid rgba($color: #333333, $alpha: 0.1);
}
.menu {
  &-table {
    &.widget-layer {
      background-color: #e8edf1;
    }

    &__list {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      background-color: #ffffff;
      padding: 0 rem(30) rem(30);
      width: 100%;
    }

    &__item {
      flex: none;
      width: 25%;
      padding: rem(30) rem(10) 0;
    }

    &__card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    &__name {
      display: block;
      font-size: rem(24);
      line-height: rem(34);
      white-space: nowrap;
      text-align: center;
      color: #000000;
      opacity: 0.6;
    }

    &__icon {
      display: block;
      width: rem(80);
      height: rem(80);
      text-align: center;
      line-height: rem(80);

      svg {
        width: 70%;
        height: 70%;
      }
    }

    &__state {
      position: absolute;
      top: 0;
      left: 50%;
      width: rem(24);
      height: rem(24);
      border-radius: 50%;
      margin-left: rem(24);

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: rem(12);
        height: rem(4);
        background-color: #fff;
        transform: translate(-50%, -50%);
      }

      &.list {
        background-color: $primary-color;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: rem(4);
          height: rem(12);
          background-color: #fff;
          transform: translate(-50%, -50%);
        }
      }

      &.mine {
        background-color: $danger-color;
      }
    }
  }

  &-header {
    display: flex;
    height: rem(75);
    line-height: rem(45);
    padding: rem(30) rem(30) 0;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;

    &__title {
      color: #010101;
      font-weight: 500;
      font-size: rem(32);
    }

    &__action {
      color: $primary-color;
      font-size: rem(28);
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
}
</style>

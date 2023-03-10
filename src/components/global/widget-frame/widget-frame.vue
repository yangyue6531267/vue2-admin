
<script>
import { requestFullScreen, exitFullScreen } from '@/components/matrix/utils';
// import {enterFullscreen,isFullscreenEnabled } from '@/utils/utils'
import popupFullBox from '@/components/fullBox/index'



export default {
  name: 'widget-frame',
  inheritAttrs: false,
  props: {
    url: { type: String, default: '' }, // 更多的跳转路径
    fullId: { type: String, default: '' }, // 全屏id
    more: { type: String, default: '' }, // 右侧内容,
    title: { type: String, default: '' }, // 标题名称
    extra: { type: String, default: '' }, // 附加内容，如单位，提示
    value: { type: [Number, String], default: 0 }, // tabs的默认值
    options: { type: Array, default: () => [] }, // 如果有tabs的length大于0
    bodyClass: { type: String, default: '' }, // 内容区域的class
    bodyStyle: { type: [String, Object], default: '' }, // 内容区域的style
    eventName: { type: String, default: 'more' }, // more图标的触发时间名称
    border: { type: Boolean, default: true }, // 内容底部分割先
    moreType:{ type: Boolean, default: false },
  },
  data() {
    return {
      icons: {
        more: 'lvfont-arrow-right',
        full: 'lvfont-fullscreen1',
      },
    };
  },
  computed: {
    bodyAttrs() {
      const { border, bodyClass, bodyStyle } = this;
      const className = `widget-frame-body ${bodyClass} ${border ? 'border' : ''}`;
      if (typeof bodyStyle === 'string') {
        return { class: className, style: bodyStyle };
      } else {
        const styleList = Object.entries(bodyStyle);
        const styleTemp = styleList.map(([key, val]) => `${key.replace(/[A-Z]/g, val => `-${val.toLocaleLowerCase()}`)}: ${val}`);
       
        return { class: className, style: styleTemp.join(';') };
      }
    },
  },
  watch: {
    dataInfo:{
      handler(now, old) {
      },
      immediate: true,
    }
  },
  mounted(){
  },  
  methods: {
    // 下拉切换
    handleChange(data) {
      this.$emit('change', data);
    },
     // 全屏切换
     initFullBox () {
      let dataInfo;
      let content;
      this.$children.map((item)=>{
        if (item.$options.name==='Chart') {
            dataInfo= item.$props,
            content = 'Chart'
          }else if(item.$options.name==='WidgetTable'){
                dataInfo= item.$props,
                content='WidgetTable'
          }
        })
      const fullBox = popupFullBox({
        showClose: true,
        contentType: content,
        contentProps: dataInfo,
        contentEvents: {
          change: (v) => {
            // 300毫秒后关闭窗口
            fullBox.close(300)
          }
        },
        contentWrapperStyle: {
          padding: "10px"
        }
      })
    },
    

    // 需要跳转链接
    handleNavigate() {
      const { url, eventName } = this;
      if (!url) return this.$emit(eventName);
      this.$router.push({ path: url });
    },
  },
  render(h) {
    const { more,title, extra, value, options, bodyAttrs, $scopedSlots } = this;
    const icon = this.icons[more];
    const vNodeContent = <div {...{ attrs: bodyAttrs }}>{$scopedSlots.default && $scopedSlots.default()}</div>; // 内容容器

    // 只显示content内容
    if (!title && !$scopedSlots.title) return <div class="widget-frame">{vNodeContent}</div>;

    // 自定义header整体内容
    if ($scopedSlots.header) {
      const vNodeHeader = <div class="widget-frame-head">{$scopedSlots.header()}</div>;
      return <div class="widget-frame">{[vNodeHeader, vNodeContent]}</div>;
    }

    // 自定义header内部内容
    const moreAttrs = { class: `icon ${icon} ${more}` }; // 更多功能的属性
    const moreEvent = more ? { click: () => {
      if(more === 'more') {
        this.handleNavigate()
      }else if(more === 'full') {
        this.moreType?this.$emit('open',true):this.initFullBox()
      }
    } } : {}; // 更多功能的事件
    const vNodeMore = $scopedSlots.more ? $scopedSlots.more() : more ? <span {...{ attrs: moreAttrs, on: moreEvent }}> </span> : null; // 更多功能的节点
    const tabsProps = { options, data: value }; // options的属性
    const tabsEvent = { change: $event => this.handleChange($event) }; // tabs的事件
    const vNodeTabs = $scopedSlots.tabs ? $scopedSlots.tabs() : options.length > 0 ? <tab-list {...{ props: tabsProps, on: tabsEvent }} /> : null; // tab节点
    const vNodeTitle = $scopedSlots.title ? $scopedSlots.title() : <h3 class="title"> {title} </h3>; // 标题
    const vNodeExtra = $scopedSlots.extra ? $scopedSlots.extra() : extra ? <p class="extra"> {extra} </p> : null; // 附件内容，如单位
    const vNodeLeft = <div class="widget-frame-title">{[vNodeTitle, vNodeExtra]}</div>;
    const vNodeRight = <div class="widget-frame-affix">{[vNodeTabs, vNodeMore]} <slot name='fullRight'></slot></div>;
    const vNodeHeader = <div class="widget-frame-head">{[vNodeLeft, vNodeRight]}</div>;
    return <div class="widget-frame">{[vNodeHeader, vNodeContent]}</div>;
  },
  components: {
    tabList: {
      props: {
        options: { type: Array, default: () => [] },
        data: { type: [Number, String], default: 0 }
      },
      data() {
        return {
          value: '',
          index: 0,
          label: '请选择',
          visible: false,
        };
      },
      watch: {
        options: {
          handler(now, old) {
            if (now && now !== old) {
              this.initial();
            }
          },
          immediate: true,
        }
      },
      render(h) {
        const { value, label, index, options, visible } = this;
        const props = { columns: options, 'show-toolbar': true, 'value-key': 'label', 'default-index': index };
        const attrs = { class: `tab-label ${visible ? 'active' : ''}` };
        const handler = { cancel: () => (this.visible = false), confirm: $event => this.handleChange($event) };
        const popupAttrs = { value: visible, round: true, position: 'bottom','get-container':"#app" };
        const vNodeLabel = <span {...{ attrs, on: { click: () => (this.visible = true) } }}>{label}</span>;
        const vNodePopup = (
          <van-popup {...{ props: popupAttrs, on: { 'click-overlay': () => (this.visible = false) } }}>
            <van-picker {...{ props: props, on: handler }} />
          </van-popup>
        );

        return <div class="tab">{[vNodeLabel, vNodePopup]}</div>;
      },
      methods: {
        // 初始化
        initial() {
          const { data, options } = this;
          if (data && options.length > 0) {
            const index = options.findIndex(item => item.value === data);
            if (index === -1) return;
            const current = options[index];
            this.value = data;
            this.label = current.label;
            this.index = index;
          }
        },

        // 下拉菜单
        handleChange(data) {
          this.label = data.label;
          this.value = data.value;
          this.visible = false;
          this.$emit('change', data);
        },
      },
    },
  },
};
</script>

<style scoped lang="scss">
.widget-frame {
  overflow: hidden;
  background-color: #fff;

  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: rem(70);
    padding: rem(30) rem(30) 0;
    position: relative;
    z-index: 5;
  }

  &-body {
    padding: rem(24) rem(30) rem(30);
    background-color: #fff;

    &.border {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: rem(30);
        right: rem(30);
        bottom: 0;
        height: 1px;
        background-color: #ebebeb;
        transform: scaleY(0.5);
      }
    }
  }

  &-title {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    line-height: rem(40);

    .title {
      font-style: normal;
      font-weight: bold;
      font-size: rem(28);
      line-height: rem(40);
      color: #000000;
      display: inline-block;
      position: relative;
    }

    .extra {
      color: #adadad;
      font-size: rem(20);
      margin-left: rem(20);
    }
  }

  &-affix {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;

    .icon {
      display: block;
      color: #000000;
      width: rem(40);
      height: rem(40);
      font-size: rem(36);
      line-height: rem(42);
      text-align: center;
      margin-left: rem(20);
      cursor: pointer;

      &.full {
        width: rem(66);
        height: rem(66);
        padding: rem(10);
        line-height: rem(44);
        background: #ffffff;
        border: 1px solid rgba(49, 107, 216, 0.1);
        box-shadow: 0px 4px 4px rgba(83, 131, 247, 0.1);
        border-radius: 50%;
        color:rgba($color: #425BB5, $alpha: 1);
      }
    }

    :deep(.tab-label) {
      display: block;
      height: rem(40);
      color: rgba(51,51,51,0.6);
      font-size: rem(28);
      line-height: rem(40);
      padding-top: rem(2);

      &::after {
        content: '\e613';
        font-size: rem(24);
        line-height: rem(40);
        font-family: 'lvfont';
        display: inline-block;
        vertical-align: top;
        text-align: center;
        margin-left: rem(12);
        transition: 0.25s ease-in-out;
        transform: rotate(90deg);
        width: rem(40);
        height: rem(40);
      }

      &.active::after {
        transform: rotate(270deg);
      }
    }
  }
}
</style>

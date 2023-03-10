<!-- 全屏窗口组件 -->
<template>
    <div name="pop" :duration="300">
      <div class="fullbox" v-show="visible" :class="className" @touchmove.prevent="" @mousewheel.prevent="">
        
        <div class="fullbox-pane">
          <div class="title" v-show="title">{{title}}</div>
          <div class="content-wrap" :style="safeAreaCalcFull">
              <template>
                <slot>
                  <div class="back" v-show="showClose" @click="close">
                      <i class="iconfont lvfont-fullscreen1"></i>
                  </div>
                    <component ref="fullBoxContent" v-if="content" :is="content" v-bind="contentProps" v-on="contentEvents"></component>
                </slot>
              </template>
          </div>
        </div>
      </div>
    </div>
</template>
  <script>
   import vueScroll from "vuescroll";
  export default {
    name: 'FullBox',
    components: {
      vueScroll
    },
    components: {
    //   Scroll
    },
    props: {
      // 是否显示窗口
      value: {
        type: Boolean,
        default: false
      },
      // 标题
      title: {
        type: String,
        default: '请选择'
      },
      // 是否显示关闭按钮
      showClose: {
        type: Boolean,
        default: true
      },
      // 弹窗内容组件
      content: Object,
      // 弹窗内容组件的props
      contentProps: Object,
      // 弹窗内容组件的事件
      contentEvents: Object,
      // 内容包裹器样式
      contentWrapperStyle: Object,
      // 样式名
      className: {
        type: String,
        default: ''
      },
      // 点击“关闭”按钮时的回调函数（如果返回false，窗口不关闭；无返回值或者返回值为true，则窗口关闭）
      onBoxColse: {
        type: Function,
        default: () => true
      }
    },
    data () {
      return {
        // 是否显示
        visible: this.value,
        // 滚动条初始化事件id
        scrollEventId: 'fullbox' + new Date().getTime(),
        ops:{
            vueScroll:{},
            scrollPanel:{},
            rail:{
                    opacity:'0.1',
                    border:'1px solid #f2f2f2',
                    size:'6px'
            },
            bar:{
                        size:'6px',
                        background:'#999',
                        keepShow:true,
                    }
                }
        
      }
    },
    watch: {
      value (val) {
        this.visible = val
      },
      visible (val) {
        if (val && this.scroll) {
          this.$nextTick(() => {
            this.$eventBus.$emit('init-scroll-' + this.scrollEventId)
          })
        }
      }
    },
    methods: {
      /**
       * 关闭窗口
       * @param delayTime 延时关闭时间(单位：毫秒)
       */
      close (delayTime) {
        if (this.onBoxColse(this.$refs.fullBoxContent) !== false) {
          this.doClose(delayTime)
        }
      },
      // 执行关闭窗口操作
      doClose (delayTime) {
        if (delayTime && typeof delayTime === 'number' && delayTime > 0) {
          setTimeout(() => {
            this.visible = false
            this.$emit('input', this.visible)
            this.$emit('close')
          }, delayTime)
        } else {
          this.visible = false
          this.$emit('input', this.visible)
          this.$emit('close')
        }
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .iconfont {
    font-size: rem(42);
    color: #425bb5;
  }
  .fullbox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #FFF;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    transition: all .3s ease;
    z-index: 99999;
    .back {
      height: rem(60);
      width: rem(60);
      position: absolute;
      top: 5vw;
      right: 5vw;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      border: 1px solid rgba(49, 107, 216, 0.1);
      box-shadow: 0px 4px 4px rgb(83 131 247 / 10%);
      border-radius: 50%;
      .close-icon {
        font-size: 30px;
        color: #666;
      }
    }
    .fullbox-pane {
      display: flex;
      flex-direction: column;
      height: 100%;
      .title {
        flex: none;
        padding: 0 3em 0 1em;
        height: rem(10);
        line-height: rem(40);
        background-color: #f5f5f5;
        border-bottom: solid 1px #E5E5E5;
        font-size: 32px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
      }
      .content-wrap {
        position: relative;
        top: -100vw;
        width: 100vh;
        height: 100vw;
        background: #F9FBFF;
        transform: rotate(90deg);
        transform-origin: bottom left;
      }
    }
  }
  
  .pop-enter-active, .pop-leave {
    transform: translateX(0);
    // transform: scale(1);
    // opacity: 1;
  }
  .pop-enter, .pop-leave-active {
    transform: translateX(100%);
    // transform: scale(.5);
    // opacity: 0;
  }
  </style>
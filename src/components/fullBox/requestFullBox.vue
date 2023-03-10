<!-- 全屏窗口组件 -->
<template>
    <div>
        <div v-if="!value">
            <slot name="full">
            </slot>
        </div>
        <div name="pop" :duration="300" v-else>
            <div class="fullbox">
                <div class="fullbox-pane">
                    <div class="content-wrap" :style="safeAreaCalcFull">
                        <div class="back" @click="close">
                            <i class="iconfont lvfont-fullscreen1"></i>
                        </div>
                        <vueScroll :ops="ops">
                            <slot name="full">
                            </slot>
                        </vueScroll>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vueScroll from "vuescroll";
export default {
    name: 'Full',
    components: {
        vueScroll
    },
    props: {
        // 是否显示窗口
        value: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            // 是否显示
            ops: {
                vueScroll: {},
                scrollPanel: {},
                rail: {
                    opacity: '0.1',
                    border: '1px solid #f2f2f2',
                    size: '6px'
                },
                bar: {
                    size: '6px',
                    background: '#999',
                    keepShow: true,
                }
            }
        }
    },
    methods: {
        close() {
            this.$emit('close', false)
        },
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
/**
 * 全屏窗口组件
 */
import Vue from 'vue'
import FullBox from './fullBox.vue'
import WidgetTable  from './../global/widget-table/widget-table.vue'
import Chart from './../global/widget-chart/widget-chart.vue';



// FullBox构造函数
const FullBoxConstructor = Vue.extend({
  extends: FullBox
})

function initInstance (instance, options) {
  // 窗口标题
  instance.title = options.title || ''
  // 是否显示关闭按钮
  instance.showClose = typeof options.showClose === 'boolean' ? options.showClose : true
  // 窗口内容组件
//   instance.content = typeof options === 'object' && options._isVue ? options : options.content

  instance.content = options.contentType == 'Chart' ? Chart : WidgetTable
  console.log(options.contentType === 'Chart',111);

  // 窗口内容组件参数
  instance.contentProps = typeof options.contentProps === 'object' ? options.contentProps : {}
  // 窗口内容组件事件
  instance.contentEvents = typeof options.contentEvents === 'object' ? options.contentEvents : {}
  // 内容包裹器样式
  instance.contentWrapperStyle = options.contentWrapperStyle
  // 自定义样式名
  instance.className = options.className || ''
//   // 是否显示滚动条
//   instance.scroll = options.scroll === false ? false : true
//   // scroll-content 背景颜色
//   instance.scrollContentBgColor = options.scrollContentBgColor
  // “关闭”回调函数
  if (options.onBoxColse && typeof options.onBoxColse === 'function') {
    instance.onBoxColse = options.onBoxColse
  }
  // 父节点
  let parentElement = options.parentElement || document.body

  // 关闭时移除
  instance.$on('input', visible => {
    if (!visible) {
      setTimeout(() => {
        parentElement.removeChild(instance.$el)
        instance.$destroy()
      }, 2000)
      /* // 获取popBox元素，如果Popop组件从refs中获取，如果Alert或Confirm组件，先获取Popop，在从Popop组件refs中获取
        let popBox = instance.$refs.popBox || (instance.$refs.basePop && instance.$refs.basePop.$refs.popBox)
        popBox.addEventListener('transitionend', event => {
        // 动画完成后移除DOM节点
        // parentElement.removeChild(instance.$el)
        if (event.target.parentNode && event.target.parentNode.parentNode) {
          event.target.parentNode.parentNode.removeChild(event.target.parentNode)
        }
        // 销毁组件
        instance.$destroy()
      }) */
    }
  })
  // console.log('instance.$el=', instance.$el)
  // 将节点添加到文档
  parentElement.appendChild(instance.$el)

  instance.visible = true
  instance.closed = false
}

// 显示弹出窗口
export function popupFullBox (options = {}, vmExtends = {}) {
  let instance = new FullBoxConstructor({
    el: document.createElement('div'),
    ...vmExtends
  })
  initInstance(instance, options)
  return instance
}

export default popupFullBox
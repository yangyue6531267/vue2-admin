<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-23 11:09:02
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-26 17:20:00
 * @FilePath: \杭州绿城\greentown-wap\src\components\organize-tree\organize-path.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
export default {
  name: 'OrganizePath',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listData: [],
    };
  },
  watch: {},
  computed: {
    isLast() {
      const count = this.data.length;
      return index => index === count - 1;
    },
  },
  render(h) {
    const { data = [] } = this;
    const length = data.length;
    console.warn(length);
    if (length<2) {
      return
    }
    const vNodeRoutes = data.map((item, index) => {
      const props = { key: index };
      const listener = { click: () => this.$emit('switch', item, index) };
      // if (index === length - 1) {
      //   const attrs = { class: 'organize-path-item readonly' };
      //   return <div {...{ props, attrs }}>{item.name}</div>;
      // } else {
        const attrs = { class: 'organize-path-item' };
        return <div {...{ props, attrs, on: listener }}>{item.name}</div>;
      // }
    });

    return <div style="overflow-x: scroll"><div class="organize-path">{vNodeRoutes}</div></div> ;
  },
};
</script>

<style lang="scss" scoped>
.organize-path {
  display: flex;
  min-height: rem(100);
  line-height: rem(100);
  justify-content: flex-start;
  align-items: center;
  padding: 0 rem(30);
  flex-direction: column;
  writing-mode: vertical-lr;
  &-item {
    writing-mode: horizontal-tb;
    color: $primary-color;
    font-size: rem(32);
    &.readonly {
      opacity: 0.6;
      color: #333333;
    }
  }

  &-item + &-item {
    &::before {
      content: '\e613';
      font-size: rem(28);
      font-family: 'lvfont';
      margin: 0 rem(6);
    }
  }
}

.organize-path:after{
      content:"";

      display: block;

      height: 0;
      clear: both;
      visibility: hidden;
  }
</style>

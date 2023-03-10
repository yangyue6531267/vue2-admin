<script>
export default {
  name: 'WidgetThan',
  props: {
    type: { type: String, default: 'success' }, // 显示类型
    text: { type: String, default: '同比' }, // 文字
    unit: { type: String, default: '%' }, // 单位
    arrow: { type: String, default: 'up' }, // 向上up|想想down
    value: { type: [String, Number], default: '-' }, // 数值
  },
  computed: {
    // 显示内容
    content() {
      const { text, unit, value } = this;
      return `${text || ''}${value || '-'}${unit || ''}`;
    },

    // class属性
    className() {
      const { type, arrow } = this;
      // const arrow = this.value < 0 ? 'down' : 'up'
      const selector = `widget-than ${type || 'success'} ${arrow || 'up'}`;
      return { class: selector };
    },
  },
  render(h) {
    const { content, className } = this;
    return <span {...{ attrs: className }}>{content}</span>;
  },
};
</script>

<style lang="scss" scoped>
.widget-than {
  height: rem(28);
  font-size: rem(20);
  line-height: rem(28);
  padding-left: rem(30);
  display: inline-block;
  vertical-align: top;
  position: relative;

  &.danger {
    color: $danger-color;
  }

  &.success {
    color: $success-color-light;
  }

  &.warning {
    color: $warning-color;
  }

  &.primary {
    color: $primary-color;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    border-style: solid;
    border-color: currentColor transparent;
    transform: translate(0, -50%);
  }

  &.up::before {
    border-width: 0 rem(8) rem(12);
  }

  &.down::before {
    border-width: rem(12) rem(8) 0;
  }
}
</style>

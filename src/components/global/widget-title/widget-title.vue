<script>
export default {
  name: 'WidgetTitle',
  props: {
    top: { type: [String, Number], default: '' },
    name: { type: String, default: '' },
    more: { type: String, default: '' },
    brief: { type: String, default: '' },
  },
  computed: {
    wrapStyle() {
      const { top } = this;
      const sTop = /[rem|em|px|vw|vh|%]$/.test(top) ? top : `${top || 0}px`;
      return `margin-top: ${sTop}`;
    },
  },
  render(h) {
    const { name, more, brief, wrapStyle, $scopedSlots } = this;
    const opts = { attrs: { class: 'more' }, on: { click: () => this.$emit('more') } }; // 更多的属性
    const attrs = { class: 'widget-title', style: wrapStyle };

    const vNodeName = <strong>{name}</strong>;
    const vNodeMore = <p {...opts}>{more}</p>;
    const vNodeBrief = brief ? <small>{brief}</small> : null;
    const vNodeTitle = <h4 class="name">{[vNodeName, vNodeBrief]}</h4>;
    const vNodeOther = $scopedSlots.more ? $scopedSlots.more() : Boolean(more) ? vNodeMore : null;
    return <div {...{ attrs }}>{[vNodeTitle, vNodeOther]}</div>;
  },
};
</script>

<style lang="scss" scoped>
.widget-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    strong {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #000;
      mix-blend-mode: normal;
    }

    small {
      color: rgba($color: #000000, $alpha: 0.8);
      font-size: 16px;
      margin-left: 1.25rem;
    }
  }

  .more {
    display: block;
    color: $text-color-gray;
    font-size: 14px;
    margin-left: 1.75rem;
    padding-right: 20px;
    position: relative;
    transition: 0.25s ease-in-out;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 5px;
      width: 10px;
      height: 10px;
      border-style: solid;
      border-color: currentColor;
      border-width: 1px 1px 0 0;
      transform: translate(0, -50%) rotate(45deg);
      transition: 0.25s ease-in-out;
    }

    &:hover {
      color: #3e66df;
    }
  }
}
</style>

<!--suppress ALL -->
<script>
export default {
  name: 'WidgetPane',
  props: {
    type: { type: String, default: 'blue' },
    size: { type: String, default: '63px' },
    padding: { type: String, default: '20px' },
  },
  render(h) {
    const { size, type, padding, $scopedSlots } = this;
    const attrs = { class: `widget-pane lvfont-flower ${type}`, style: `font-size: ${size}; padding: ${padding}` };
    const vNodes = $scopedSlots.default ? $scopedSlots.default() : null;
    return <div {...attrs}>{vNodes}</div>;
  },
};
</script>

<style lang="scss">
.widget-pane {
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
    color: transparent;
    opacity: 0.6;
  }

  &.blue {
    background: linear-gradient(90deg, #e9f1ff 0%, #f5f9ff 110.23%);
    border: 1px solid rgba(38, 70, 137, 0.2);

    &::before {
      background: linear-gradient(90deg, rgba(49, 107, 216, 0.08) 0%, rgba(49, 107, 216, 0) 100%);
      background-clip: text;
    }
  }

  &.gray {
    background: linear-gradient(90deg, #f1f1f1 0%, #fbfbfb 100%);
    border: 1px solid rgba(104, 104, 104, 0.2);

    &::before {
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
      background-clip: text;
    }
  }

  &.red {
    background: linear-gradient(90deg, #fff1e4 0%, #fffcf9 100%);
    border: 1px solid rgba(193, 141, 96, 0.2);

    &::before {
      background: linear-gradient(90deg, rgba(169, 122, 81, 0.1) 0%, rgba(169, 122, 81, 0) 100%);
      background-clip: text;
    }
  }
}
</style>

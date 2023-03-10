<script>
const isNull = value => [undefined, null, '', 0].includes(value);

export default {
  name: 'WidgetBadge',
  props: {
    type: { type: String, default: 'danger' },
    value: { type: [String, Number], default: 0 },
  },
  render(h) {
    const { type, value } = this;
    const attrs = { class: `widget-badge ${type || ''}` };
    if (isNull(value)) return null;
    return <span {...{ attrs }}>{value}</span>;
  },
};
</script>

<style lang="scss" scoped>
.widget-badge {
  height: rem(28);
  font-size: rem(20);
  border-radius: rem(28);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 rem(16);
  color: #ffffff;

  &.danger {
    background-color: $danger-color;
  }

  &.warning {
    background-color: $warning-color;
  }

  &.primary {
    background-color: $primary-color;
  }
}
</style>

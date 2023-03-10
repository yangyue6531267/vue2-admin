<script>
import takeAt, { toCamel, isNull, isLinkNum } from '../takeAt';

export default {
  name: 'TableCell',
  props: {
    data: { type: Object, default: () => ({}) }, // 表格数据
    column: { type: Object, default: () => ({}) }, // 配置
  },
  watch: {},
  computed: {
    value() {
      const { data, column } = this;
      if (!column.prop) return '';
      const result = takeAt(data, column.prop);
      if (column.formatter) return column.formatter(result);
      return result;
    },

    emitName() {
      const { prop, emit } = this.column;
      return toCamel(emit) || toCamel(prop) || 'click';
    },

    tagStyles() {
      const styles = [];
      const { column } = this;
      if (column.color) styles.push(`color: ${column.color};`);
      if (column.background) styles.push(`background-color: ${column.background};`);
      return styles.join(' ');
    },
  },
  render(h) {
    const { value, column, emitName, tagStyles, $scopedSlots } = this;
    const unit = isNull(value) ? '' : column.unit;
    const valid = isNull(value) ? '-' : value;
    const handler = { click: () => this.$emit(emitName || 'click') };
    const classTags = { class: 'tag', style: tagStyles };
    const classText = { class: 'text', style: column.color ? `color: ${column.color}` : '' };
    const vNodeTags = <span {...{ attrs: classTags, on: handler }}>{valid}</span>;
    const vNodeText = <span {...{ attrs: classText, on: handler }}>{[valid, unit]}</span>;
    if (column.type === 'tag') return vNodeTags;
    return vNodeText;
  },
};
</script>

<style lang="scss" scoped>
.tag {
  width: 100%;
  padding: 3px 12px;
  border-radius: 15px;
  vertical-align: top;
}
</style>

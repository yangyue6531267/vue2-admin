<script>
import { isStr, isUndef } from '../takeAt';

export default {
  name: 'TableHead',
  props: {
    item: { type: Object, default: () => ({}) }, // 表格数据
    column: { type: Object, default: () => ({}) }, // 配置
  },
  watch: {},
  computed: {
    // 头部文字
    styleText() {
      const { item = {} } = this;
      if (isUndef(item.style)) return '';
      if (isStr(item.style)) return item.style;
      const list = Object.entries(item.style);
      const value = list.map(([key, val]) => {
        const prop = key.replace(/[A-Z]/g, val => '-' + val.toLocaleLowerCase()); // 驼峰转小写连接线
        return `${prop}: ${val}`;
      });
      return value.join(';');
    },

    className() {
      const { item } = this;
      if (item.sortable) return 'head sort';
      return 'head';
    },
  },
  render(h) {
    const { item, column, className, styleText } = this;
    const attrs = { class: className, style: styleText };
    const vNodeSubLabel = item.subLabel ? <em {...{ attrs: { class: 'sub-head' } }}>{item.subLabel}</em> : null;
    return <span {...{ attrs }}>{[column.label, vNodeSubLabel]}</span>;
  },
};
</script>

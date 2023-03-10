<script>
import takeAt, { toCamel, isFunc, isDef, isNull, isEmptyObj, isLinkNum } from '../takeAt';

export default {
  name: 'TriTableText',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    column: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // 表格列属性
    props() {
      const { column } = this;
      const { label, width, fixed = false, align = 'center', extend = {}, sortable = false, overflow = false } = column;
      const props = { label, width, align, fixed, sortable, 'show-overflow-tooltip': overflow };
      return Object.assign(props, extend);
    },
  },
  render(h) {
    const { data, props, hidden } = this;
    const { prop, emit, color, suffix, prefix, formatter } = data;
    const classname = ['tri-table-text', { 'is-link': isDef(emit) }];

    const scopedSlot = {
      default: scope => {
        const valid = takeAt(scope.row, prop);
        const append = (isFunc(suffix) ? suffix(scope.row) : suffix) || ''; // 后缀
        const prepend = (isFunc(prefix) ? prefix(scope.row) : prefix) || ''; // 前缀
        const content = isFunc(formatter) ? formatter(valid, scope.row, prop) : isEmptyObj(this.option) ? valid : this.option[valid]; // 内容
        const handlers = isDef(emit) ? { click: () => this.$emit(emit, { prop, data: scope.row, value: content, index: scope.$index }) } : {}; // 方法
        const fontColor = (isFunc(color) ? color(scope.row) : color) || ''; // 文字颜色
        const fontStyle = { color: fontColor };

        return (
          <span style={fontStyle} class={classname} {...{ on: handlers }}>
            {[prepend, isDef(content) ? content : '', append]}
          </span>
        );
      },
    };
    return hidden ? null : <el-table-column {...{ props }} scopedSlots={scopedSlot} />;
  },
};
</script>

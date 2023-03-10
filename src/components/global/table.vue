<template>
  <el-table
    :data="data"
    ref="table"
    :row-key="rowKey"
    :show-header="showHeader"
    :stripe="stripe"
    :class="{ 'stripe-inverse': stripeInverse }"
    :border="border"
    :header-cell-style="headerStyle"
    :highlight-current-row="highLight"
    :height="height"
    :max-height="maxHeight"
    :row-class-name="rowClass"
    :span-method="spanMethod"
    @current-change="handleCurrentChangeTable"
    @row-click="handleRowClick"
    @cell-mouse-enter="handleCellMouseEnter"
    @select-all="handleSelectAll"
    @selection-change="handleSelectionChange"
    style="width: 100%"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      :width="selection.width || '55'"
      :align="selection.align"
      :header-align="selection.headerAlign || selection.align"
      :min-width="selection.minWidth"
      :selectable="checkboxT"
      :fixed="selection.fixed"
    ></el-table-column>
    <template v-for="(list, index) in tableColumn">
      <tableColumn
        :coloumn-header="list"
        :slotColumns="slotColumns"
        :slotHeaders="slotHeaders"
        v-if="list.children && list.children.length"
        :key="index"
      >
        <template :slot="'hd-' + list.prop" slot-scope="scope">
          <slot :name="'hd-' + list.prop" v-bind="scope"> </slot>
        </template>
        <template :slot="list.prop" slot-scope="scope">
          <slot :name="list.prop" v-bind="scope"> </slot>
        </template>
        <template v-for="(item, i) in list.children">
          <div :slot="item.prop" :key="i" class="slot">
            <slot :name="item.prop"> {{ item.prop }} </slot>
          </div>
        </template>
      </tableColumn>
      <template v-else>
        <el-table-column
          :prop="list.prop"
          :label="list.label"
          :min-width="list.minWidth"
          :width="list.width"
          :align="list.align"
          :header-align="list.headerAlign"
          :fixed="list.fixed"
          :sortable="list.sortable"
          :sort-by="list.prop"
          :key="index"
          :resizable="list.resizable || false"
          :show-overflow-tooltip="list.tooltip"
          :class-name="list.className"
          v-if="!list.hide"
        >
          <template slot="header" slot-scope="scope">
            <slot v-if="slotHeaders && slotHeaders.indexOf(list.prop) > -1" :name="'hd-' + list.prop" v-bind="scope"> </slot>
            <template v-else>
              <div class="th" v-html="scope.column.label"></div>
            </template>
          </template>
          <template slot-scope="scope">
            <slot v-if="slotColumns && slotColumns.indexOf(list.prop) > -1" :name="list.prop" v-bind="scope"> </slot>
            <template v-else>
              <div :class="tdClass(list, scope.row)" :style="list.style">{{ scope.row[list.prop] }}</div>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--???????????????-->
      <slot name="oprate"> </slot>
    </template>
    <div slot="empty" class="mt10">
      <div class="empty">{{ emptyText }}</div>
    </div>
  </el-table>
</template>

<script>
import tableColumn from './table-column';

export default {
  name: '',
  props: {
    data: { type: Array, default: () => [] }, // ????????????
    tableColumn: { type: Array, default: () => [] }, // ????????????
    slotColumns: { type: Array, default: () => [] }, //?????????????????????
    slotHeaders: { type: Array, default: () => [] }, // ????????????????????????
    /* ???????????? */
    'show-header': {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* ????????????????????????????????????????????? */
    stripe: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* ??????????????????????????????????????????????????? */
    stripeInverse: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* row key */
    'row-key': {
      type: String,
      default: () => {
        return '';
      },
    },
    /* ?????????????????? */
    border: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* ?????????????????? */
    selection: [Boolean, Object],
    /* ???????????????????????? */
    highLight: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* Table????????? */
    height: [String, Number],
    /* Table??????????????? */
    'max-height': [String, Number],
    /* ???????????????????????? */
    'empty-text': {
      type: String,
      default: () => {
        return '????????????????????????????????????';
      },
    },
    /* ????????????????????????????????????????????? */
    'no-empty-img': {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* ??????className */
    'row-class': {
      type: String,
      default: () => {
        return '';
      },
    },
    /* ???????????????????????? */
    'header-style': {
      type: Object,
      default: () => {
        return {};
      },
    },
    /* ?????????????????? */
    'show-tooltip': {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    /* ?????????????????????????????? */
    'span-method': {
      type: Function,
      default: () => {
        return ({ row, column, rowIndex, columnIndex }) => {};
      },
    },
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  computed: {
    tdClass() {
      return (item, data) => {
        const value = data[item.prop];
        const types = /([+|-]*)\d+(\.*\d*)$/.test(value) ? 'num' : 'str';
        return ['td', { ellipsis: item.tooltip }, item.theme, types];
      };
    },
  },
  mounted() {},
  watch: {
    data() {
      this.data.forEach(row => {
        if (row.selected || row.checked) this.$refs.table.toggleRowSelection(row, true);
      });
    },
  },
  updated() {
    this.$nextTick(() => {
      this.data.forEach(row => {
        if (row.selected || row.checked) this.$refs.table.toggleRowSelection(row, true);
      });
      if (this.$refs.table) this.$refs.table.doLayout();
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('selectionChange', val);
    },
    handleSelectAll(val) {
      if (val && val[0]) {
        this.handleSelectionAll();
      } else {
        this.handleSelectionClear();
      }
    },
    handleSelectionAll() {
      // ??????
      this.data.forEach(row => {
        if (!row.disabled) this.$refs.table.toggleRowSelection(row, true);
      });
    },
    handleSelectionClear() {
      // ????????????
      this.$refs.table.clearSelection();
    },
    handleSelectionAllToggle() {
      // ??????
      this.$refs.table.toggleAllSelection();
    },
    checkboxT(row, rowIndex) {
      if (row.disabled) {
        return false;
      } else {
        return true;
      }
    },
    handleRowClick(row) {
      this.$emit('rowClick', row);
    },
    handleCellMouseEnter(row) {
      this.$emit('cellMouseEnter', row);
    },
    handleCurrentChangeTable(currentRow, oldCurrentRow) {
      this.$emit('tabCurrentChange', currentRow, oldCurrentRow);
    },
  },
  components: {
    tableColumn,
  },
};
</script>

<style scoped lang="scss">
:deep(.flex) {
  display: flex;
}
@include resetTableStyle();

</style>

<template>
  <el-table-column
    :label="coloumnHeader.label"
    :min-width="coloumnHeader.minWidth"
    :width="coloumnHeader.width"
    :align="coloumnHeader.align"
    :header-align="coloumnHeader.headerAlign"
    :fixed="coloumnHeader.fixed"
    :sortable="coloumnHeader.sortable || false"
    :resizable="coloumnHeader.resizable || false"
    :show-overflow-tooltip="coloumnHeader.tooltip"
    :class-name="coloumnHeader.className"
    v-if="!coloumnHeader.hide"
  >
    <template slot="header" slot-scope="scope">
      <slot v-if="slotHeaders && slotHeaders.indexOf(coloumnHeader.prop) > -1" :name="'hd-' + coloumnHeader.prop" v-bind="scope"> </slot>
      <template v-else>
        <div class="th" v-html="scope.column.label"></div>
      </template>
    </template>
    <template slot-scope="scope">
      <slot v-if="slotColumns && slotColumns.indexOf(list.prop) > -1" :name="list.prop" v-bind="scope"> </slot>
      <template v-else>
        <div class="td" :class="{ ellipsis: list.tooltip }">{{ scope.row[list.prop] }}</div>
      </template>
    </template>
    <template v-for="(list, index) in coloumnHeader.children">
      <tableColumn
        :coloumn-header="list"
        :slotColumns="slotColumns"
        :slotHeaders="slotHeaders"
        v-if="list.children && list.children.length"
        :key="index"
      ></tableColumn>
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
              <div :class="tdClass(list, scope.row)">{{ scope.row[list.prop] }}</div>
            </template>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import tableColumn from './table-column';

export default {
  name: 'tableColumn',
  props: ['coloumnHeader', 'slotColumns', 'slotHeaders'],
  data() {
    return {};
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
  methods: {},
  components: {
    tableColumn,
  },
};
</script>

<style scoped lang="scss">
.num {
  text-align: right;
}

.str {
  text-align: left;
}
</style>

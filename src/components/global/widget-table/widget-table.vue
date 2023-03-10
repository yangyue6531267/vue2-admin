<!-- 表格组件 -->
<template>
  <el-table
    :data="tableData"
    :stripe="stripe"
    :border="border"
    :row-key="rowKey"
    :tree-props="props"
    :row-style="rowStyle"
    :cell-style="cellStyle"
    :header-cell-style="headStyle"
    :default-sort="sortProps"
    :default-expand-all="expand"
    @sort-change="sortChangefirst"
    class="widget-table"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(item, index) in columns">
      <template v-if="item.children && item.children.length > 0">
        <el-table-column
          :key="item.prop"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
          :align="item.align || 'left'"
          :fixed="item.fixed || false"
          :sort-by="item.prop"
          :sortable="item.sortable"
          :sort-orders="['descending', 'ascending']"
          :resizable="item.resizable || false"
          :min-width="item.minWidth"
          :class-name="item.type"
          :header-align="item.headAlign || 'center'"
          :show-overflow-tooltip="item.overflow === false ? item.overflow : true"
        >
          <template v-slot:header="{ column }">
            <table-head :item="item" :column="column" />
          </template>
          <template v-for="(col, idx) in item.children">
            <template v-if="col.children && col.children.length > 0">
              <el-table-column
                :key="`col${idx}`"
                :prop="col.prop"
                :width="col.width"
                :label="col.label"
                :align="col.align || 'left'"
                :fixed="col.fixed || false"
                :sort-by="col.prop"
                :sortable="col.sortable"
                :resizable="col.resizable || false"
                :min-width="col.minWidth"
                :class-name="col.type"
                :header-align="col.headAlign || 'center'"
                :show-overflow-tooltip="item.overflow === false ? item.overflow : true"
              >
                <template v-slot:header="{ column }">
                  <table-head :item="col" :column="column" />
                </template>
                <template v-for="(cell, index) in col.children">
                  <el-table-column
                    :key="`cell${index}`"
                    :prop="cell.prop"
                    :width="cell.width"
                    :label="cell.label"
                    :align="cell.align || 'left'"
                    :fixed="cell.fixed || false"
                    :sortable="cell.sortable"
                    :resizable="cell.resizable || false"
                    :min-width="cell.minWidth"
                    :class-name="cell.type"
                    :header-align="cell.headAlign || 'center'"
                    :show-overflow-tooltip="cell.overflow === false ? cell.overflow : true"
                  >
                    <template v-slot:header="{ column }">
                      <table-head :item="cell" :column="column" />
                    </template>
                    <template v-slot="{ row, $index }">
                      <slot
                        v-if="cell.type === 'slot'"
                        :name="cell.slot"
                        v-bind:data="{ data: row, item: cell, line: $index, value: row[cell.prop] }"
                      ></slot>
                      <table-cell v-else :data="row" :column="cell" v-on="$listeners"> </table-cell>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
            <el-table-column
              :key="`col${idx}`"
              :prop="col.prop"
              :width="col.width"
              :label="col.label"
              :align="col.align || 'left'"
              :fixed="col.fixed || false"
              :sortable="col.sortable"
              :resizable="col.resizable || false"
              :min-width="col.minWidth"
              :class-name="col.type"
              :header-align="col.headAlign || 'center'"
              :show-overflow-tooltip="col.overflow === false ? col.overflow : true"
              v-else
            >
              <template v-slot:header="{ column }">
                <table-head :item="col" :column="column" />
              </template>
              <template v-slot="{ row, $index }">
                <slot v-if="col.type === 'slot'" :name="col.slot" v-bind:data="{ data: row, item: col, line: $index, value: row[col.prop] }"></slot>
                <table-cell v-else :data="row" :column="col" v-on="$listeners"> </table-cell>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column
          :key="item.prop"
          :prop="item.prop"
          :width="item.width"
          :label="item.label"
          :align="item.align || 'left'"
          :fixed="item.fixed || false"
          :sort-by="item.prop"
          :sortable="item.sortable"
          :sort-orders="['descending', 'ascending']"
          :resizable="item.resizable || false"
          :min-width="item.minWidth"
          :class-name="item.type"
          :header-align="item.headAlign || 'center'"
          :show-overflow-tooltip="item.overflow === false ? item.overflow : true"
        > 
          <template v-slot:header="{ column }">
            <slot v-if="item.type === 'headSlot'" :name="item.slot" :data="column"></slot>
            <table-head v-else :item="item" :column="column" />
          </template>
          <template v-slot="{ row, $index }">
            <slot v-if="item.type === 'slot'" :name="item.slot" v-bind:data="{ data: row, item, line: $index, value: row[item.prop] }"></slot>
            <div v-else-if="item.type === 'changeColor'" :style="item.timeCollor[row[item.timeValueType]]">
                {{currentDate(row[item.prop])}}
            </div>
            <table-cell v-else :data="row" :column="item" v-on="$listeners"> </table-cell>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script>
import TableCell from './utils/table-cell.vue';
import TableHead from './utils/table-head.vue';
import dateFormatter from '@utils/timeFormatter';
import { traverseTable } from './takeAt';

export default {
  name: 'WidgetTable',
  props: {
    data: { type: Array, default: () => [] },
    props: { type: Object, default: () => ({ children: 'children', hasChildren: 'hasChildren' }) },
    border: { type: Boolean, default: true },
    stripe: { type: Boolean, default: false },
    expand: { type: Boolean, default: false },
    rowKey: { type: String, default: 'id' },
    columns: { type: Array, default: () => [] },
    rowStyle: { type: [Object, Function], default: () => ({}) },
    headStyle: { type: [Object, Function], default: () => ({}) },
    cellStyle: { type: [Object, Function], default: () => ({}) },
    sortProps: { type: Object, default: () => ({}) },
    sortExclude: { type: String, default: '' }, // first 和 last 未实现
  },
  components: { TableCell, TableHead },
  data() {
    return{
      newTableData:[],
      filerValue:["区域合计"]
    }
  },
  computed: {
    currentDate() {
      return (data)=>{
        if (data==null) {
            return '--'
        }else{
          return dateFormatter('YYYY-MM-DD',data);
        }
      }
    },
    tableData() {
      const { newTableData, props, rowKey } = this;
      traverseTable.index = 1;
      return traverseTable(newTableData, rowKey, props.children);
    },
  },
  watch:{
    data: {
      handler(value,oldvalue) {
        if(value==this.newTableData ) return
        this.newTableData = value;
      },
      immediate: true,
    },

  },
  methods: {
    sortChangefirst(column){
      //不参与排序的数组
      let freeGood = []
      //参与排序的数组
      let elseFree = []
      //fieldName 为对应列的prop
      const fieldName = column.prop
      const sortingType = column.order
      //降序
      if (sortingType == "descending"){
        this.newTableData.forEach(item => {
          //在整个tableData中找到不参与排序的所有数据
          if (item.isSort||this.filerValue.includes(item.projectCluster)) {
            //不参与排序的所有数据加到数组中
                freeGood.push(item)
            }else { 
                //参与排序的数据
                elseFree.push(item)
            }
        })
        //进行排序
        this.newTableData = [...freeGood,...elseFree.sort((a, b) => Number(b[fieldName]) - Number(a[fieldName]))]
      }else{
        this.newTableData.forEach(item => {
          if (item.isSort||this.filerValue.includes(item.projectCluster)) {
                  freeGood.push(item)
                }else { 
                  elseFree.push(item)
                }
        })
        this.newTableData = [...freeGood,...elseFree.sort((a, b) => Number(a[fieldName]) - Number(b[fieldName]))]
      }
    }
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
:deep(.sub-head) {
    display: block;
    font-size: rem(20);
    line-height: 1;
  }
.widget {
  &-table {
    width: 100%;
    font-size: rem(24);
    // border-radius: rem(10);
    overflow: hidden;
    box-sizing: border-box;

    .head {
      color: inherit;
      font-size: inherit;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
    }

    &::after {
      display: none;
    }

    :deep(th.el-table__cell) {
      background-color: #f4f6f9;

      &:nth-child(2n + 1) {
        background: linear-gradient(90deg, rgba(#e9f1ff, 0.4) 0%, rgba(#f5f9ff, 0.4) 112.5%);
      }
    }

    :deep(td.el-table__cell) {
      &:nth-child(2n + 1) {
        background: linear-gradient(90deg, rgba(#e9f1ff, 0.4) 0%, rgba(#f5f9ff, 0.4) 112.5%);
      }
    }

    :deep(.caret-wrapper) {
      position: absolute;
      top: 50%;
      right: 0;
      width: rem(36);
      height: rem(48);
      text-align: center;
      transform: translate(0, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .ascending {
        display: block;
        position: static;
        border-width: 0 rem(7) rem(7);
        border-color: #909399 transparent;
        margin-bottom: rem(2);
      }

      .descending {
        display: block;
        position: static;
        border-width: rem(7) rem(7) 0;
        border-color: #425bb5 transparent;
        margin-top: rem(2);
      }
    }

    :deep(th) {
      & > .cell {
        // text-align: left;
        position: relative;
        span{
          // color: rgba(51,51,51,0.8);
        }
      }
    }

    :deep(.el-icon-arrow-right) {
      color: #264689;
      transition: 0.35s ease-in-out;
    }

    :deep(.el-table__expand-icon) {
      position: absolute;
      top: 50%;
      right: 0;
      margin-right: 0;
      transform: translate(0, -50%);

      & + span {
        padding-right: rem(12);
      }
    }

    :deep(.el-table__expand-icon--expanded .el-icon-arrow-right) {
      transform: rotate(90deg);
    }

    :deep(.el-table__indent) {
      & ~ .text {
        display: inline;
      }
    }

    :deep(.el-table__placeholder) {
      width: 0;
    }

    :deep(td.tag) {
      .cell {
        line-height: 28px;
      }
    }

    :deep(.el-table__cell.is-sortable .cell) {
      padding-right: rem(36);
    }
  }
}
</style>

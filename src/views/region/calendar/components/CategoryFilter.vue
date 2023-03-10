<template>
  <widget-layer class="category-radio" :title="title" :visible="visible" right-text="确定" @click-right="handleConfirm" @close="handleClose">
    <div class="category-level" v-for="(group, index) in checkboxOptions" :key="index">
      <el-checkbox
        class="category-father"
        v-model="form[group.prop]"
        :indeterminate="group.indeterminate"
        @change="handleSelectAll($event, group, index)"
      >
        {{ group.label }}：
      </el-checkbox>
      <el-checkbox-group v-model="formChild[group.child]" @change="handleSelectSub($event, group, index)">
        <template v-for="item in group.children">
          <el-checkbox class="category-children" :key="item.value" :label="item.label" :checked="item.checked">
            <span> {{ item.label }}</span>
            <span class="heading">{{ item.heading }}</span>
          </el-checkbox>
        </template>
      </el-checkbox-group>
    </div>
  </widget-layer>
</template>

<script>
export default {
  name: 'CategoryFilter',
  model: { prop: 'value', event: 'change' },
  props: {
    show: { type: Boolean, default: false },
    title: { type: String, default: '选择分类' },
    value: { type: Object, default: () => ({}) },
    field: { type: Object, default: () => ({ prop: 'clazz0', child: 'types' }) },
  },
  data() {
    return {
      form: { meet: true, node: true, item: true },
      visible: false,
      formChild: { meetType: [], nodeType: [], itemType: [] },
      dialogSize: { width: '100%', height: '100%' },
      checkboxOptions: [
        {
          prop: 'meet',
          label: '会议',
          child: 'meetType',
          children: [
            { label: '集团/区域会议', value: '1', checked: true, types: ['集团会议', '区域会议'] },
            { label: '作战单元会议', value: '2', checked: true, heading: '(城市公司/项目群/片区)' },
            { label: '项目会议', value: '3', checked: true, types: ['项目会议活动'] },
          ],
        },
        {
          prop: 'node',
          label: '节点',
          child: 'nodeType',
          children: [
            { label: '里程碑节点', checked: true, value: '1' },
            { label: '一级节点', checked: true, value: '2' },
            { label: '跟投返本', checked: true, value: '3', types: ['返本分红', '跟投返本'] },
            { label: '首开', checked: true, value: '4', types: ['首开', '项目首开'] },
            { label: '批复/工规证', checked: true, value: '5', types: ['取得《建设工程规划许可证》', ' 批复/工规证'] },
            { label: '交付', checked: true, value: '6', types: ['项目交付', '交付'] },
            { label: '生活馆/样板房开放', checked: true, value: '7', types: ['生活馆/样板房开放', '样板房对外开放', '生活馆对外开放'] },
            { label: '主体结构封顶', checked: true, value: '8', types: ['主体结构封顶', '整体结顶', '首开结顶'] },
          ],
        },
        {
          prop: 'item',
          label: '重难点事项',
          child: 'itemType',
          children: [
            { label: '重难点', checked: true, value: '1' },
            { label: '会议新增事项', checked: true, value: '2' },
            { label: '资产处置', checked: true, value: '3' },
            { label: '清盘', checked: true, value: '4' },
            { label: '清算', checked: true, value: '5' },
            { label: '注销', checked: true, value: '6' },
          ],
        },
      ],
    };
  },
  watch: {
    show: {
      handler(now, old) {
        if (now !== old) this.visible = now;
      },
      immediate: true,
    },
  },
  mounted() {
    this.formatCheckboxData();
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:show', false);
    },

    // 确定选择
    handleConfirm() {
      this.formatCheckboxData();
      this.$emit('update:show', false);
    },

    // 父级选择
    handleSelectAll(value, data, index) {
      if (!data.children) return;
      if (value) {
        const items = data.children.map(item => item.label);
        this.$set(this.formChild, data.child, items);
      } else {
        this.$set(this.formChild, data.child, []);
      }
      this.$set(this.checkboxOptions[index], 'indeterminate', false);
    },

    // 子级分类选择
    handleSelectSub(value, data, index) {
      const count = data.children.length;
      const isWhole = value.length === count;
      this.$set(this.form, data.prop, isWhole);
      this.$set(this.checkboxOptions[index], 'indeterminate', !isWhole);
      data.children.forEach(item => value.includes(item.label));
    },

    // 格式化返回值
    formatCheckboxData() {
      const data = {};
      const { form, field, formChild, checkboxOptions } = this;
      const { fatherData = [], childrenData = [] } = {};

      checkboxOptions.forEach(row => {
        const { prop, child, label, children } = row;
        if (row.indeterminate || form[prop]) fatherData.push(label);
        children.forEach(item => {
          if (!item.checked) return;
          item.types ? childrenData.push(...item.types) : childrenData.push(item.label);
        });
      });

      data[field.prop] = fatherData.join(',');
      data[field.child] = childrenData.join(',');
      this.$emit('change', data);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-level {
  padding: rem(30);
}
</style>

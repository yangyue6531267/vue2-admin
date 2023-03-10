<!--
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-12-28 11:14:02
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-28 14:13:21
 * @FilePath: \杭州绿城\greentown-wap\src\views\region\calendar\components\SearchFilter.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <widget-layer class="search-filter" title="搜索" :visible="visible" @close="handleClose">
    <div class="search-box">
      <el-input v-model="keyword" placeholder="搜索职能/工作内容/组织/所属项目..." size="normal" clearable>
        <template slot="append">
          <div class="search-btn" @click="handleInput">
            <i class="iconfont lvfont-search1"></i>
            <em> 搜索</em>
          </div>
        </template>
      </el-input>
    </div>
  </widget-layer>
</template>

<script>
export default {
  name: 'SearchFilter',
  model: { prop: 'value', event: 'change' },
  props: {
    show: { type: Boolean, default: false },
    value: { type: String, default: () => ({}) },
  },
  data() {
    return {
      visible: false,
      keyword: '',
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
    this.keyword = this.value;
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit('update:show', false);
    },

    // 确定选择
    handleInput() {
      this.formatCheckboxData();
      this.$emit('update:show', false);
    },

    // 格式化返回值
    formatCheckboxData() {
      this.$emit('change', this.keyword);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-filter {

  .search-box {
    padding: rem(30);
    width: 100%;
    height: rem(80);
    :deep(.el-input-group__append) {
      padding: 0 rem(20);
    }
    .search-btn {
      width: rem(120);
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: rem(30);
        margin-right: rem(10);
        color: rgba($color: #333, $alpha: 0.6);
      }
      em {
        font-size: rem(26);
        color: rgba($color: #333, $alpha: 0.6);
      }
    }
  }
}
</style>

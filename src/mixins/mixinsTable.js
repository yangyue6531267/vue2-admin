export default {
  data() {
    return {
      total: 0, // 表格数据总量
      where: { limit: 10, page: 1 }, // 表格页码
      search: {},
      loading: false, // 表格加载效果
      tableData: [], // 表格数据
      selections: [], // 表格选中项
      selectOptions: {},
    };
  },
  methods: {
    // 获取列表数据(刷新/搜索)
    getData() {
      this.loadTableData().catch(err => {
        this.loading = false;
        console.error(err);
      });
    },

    // 表格搜索操作
    handleSearch(data, k) {
      this.where.page = 1;
      this.search = data;
      this.getData();
    },

    // 表格选中内容
    handleChoose(val) {
      this.selections = val;
    },

    // 表格翻页操作
    handleTurnPage(val) {
      this.where = val;
      this.getData();
    },
  },
};

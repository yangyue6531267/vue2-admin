export default {
  data() {
    return {
      detailData: {},
      detailTitle: '新增',
      detailLoading: false,
      detailVisible: false,
    };
  },
  methods: {
    // 提交表单
    handleViewer({ id }) {
      this.detailVisible = true;
    },
  },
};

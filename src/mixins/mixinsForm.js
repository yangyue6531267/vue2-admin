export default {
  data() {
    return {
      formData: {},
      formState: 'add',
      formTitle: '新增',
      formLoading: false,
      formVisible: false,
    };
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.formData = {};
    },

    // 提交表单
    handleSubmit(data) {
      const isAdd = this.formState === 'add';
      this.formLoading = true;
      this.submitFactory(data, isAdd)
        .then(({ code, msg }) => {
          this.$message.success(isAdd ? '添加成功' : '修改成功');
          this.formLoading = false;
          this.formVisible = false;
          this.formData = {};
          this.getData();
        })
        .catch(err => {
          console.log(err);
          this.formLoading = false;
        });
    },
  },
};

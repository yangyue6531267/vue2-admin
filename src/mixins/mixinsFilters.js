
import format from '@/utils/format';
import systemApi from '@api/system';
import { mapGetters } from 'vuex';
const safeAreaInsets = require('safe-area-insets');
export default {
  data() {
    return {
      // 时间选择最小闪
      TimeSelectminDate: '2022/12/01',
      // 移动端安全边界变量
      safeAreaInsets,
    };
  },
  computed: {
    // 当前是否是集团
    ...mapGetters(['IsInGroup']),
    // sage-area
    safeAreaCalcheight() {
      return {
        paddingTop: this.safeAreaInsets.top + 'px',
        // paddingBottom: this.safeAreaInsets.bottom + 'px',
      };
    },
    // 安全头部
    safeAreaCalcTop() {
      return {
        top: this.safeAreaInsets.top + 'px',
      };
    },
    safeAreaCalcMapTop() {
      return {
        top: this.safeAreaInsets.top + 50 + 'px',
      };
    },
    safeAreaCalcFull() {
      return {
        paddingLeft: this.safeAreaInsets.top + 'px',
        paddingRight: this.safeAreaInsets.bottom + 'px',
      };
    },
  },
  // 数据处理过滤函数
  filters: {
    solveTableStr: format.solveTableStr,
    solveTableNum: format.solveTableNum,
    getDanwei: format.getDanwei,
    solveTableStrDanwei: format.solveTableStrDanwei,
  },
  methods: {
    solveTableStr: format.solveTableStr,
    solveTableNum: format.solveTableNum,
    getDanwei: format.getDanwei,
    solveTableStrDanwei: format.solveTableStrDanwei,
    getColorClass: format.getColorClass,

    // 获取配置表月度滚动版本时间
    async xlGetByParamName(cb) {
      const data = await systemApi.getByParamName();
      if (!data) return;
      cb(data.paraMonth);
    },
    // 获取配置表月度滚动版本时间
    async xlGetByParamNameAll(cb) {
      const data = await systemApi.getByParamName();
      if (!data) return;
      cb(data);
    },
    // 获取配置表月度滚动版本时间
    async xlGetByParamNameOverallVal(cb) {
      const data = await systemApi.getByParamName({ paramName: '货值概览范围' });
      if (!data) return;
      cb(data.paramValue);
    },

    // 表格th样式
    tableThCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return { background: 'linear-gradient(90deg, #E9F1FF 0%, #F5F9FF 94.2%)', borderBottom: '0', color: '#333' };
      } else if (columnIndex % 2 === 1) {
        return { background: '#f4f6f9', color: 'rgba(0,0,0, 0.6)' };
      } else {
        return { background: '#f0f5fb', color: 'rgba(0,0,0, 0.6)' };
      }
    },

    // 表格td样式
    tableTdCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return { background: 'linear-gradient(90deg, #E9F1FF 0%, #F5F9FF 94.2%)', borderBottom: '0', color: 'rgba(0,0,0, 0.6)' };
      } else if (columnIndex % 2 === 1) {
        return { background: 'transparent', color: '#333' };
      } else {
        return { background: '#f7faff', color: '#333' };
      }
    },
    // 表格td样式-合计蓝色
    tableTdCellStyleHeji({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 0) {
          return { background: 'linear-gradient(90deg, #E9F1FF 0%, #F5F9FF 94.2%)', color: 'rgba(66, 91, 181, 1)' };
        } else if (columnIndex % 2 === 1) {
          return { background: 'transparent', color: 'rgba(66, 91, 181, 1)' };
        } else {
          return { background: '#f7faff', color: 'rgba(66, 91, 181, 1)' };
        }
      }
      if (columnIndex === 0) {
        return { background: 'linear-gradient(90deg, #E9F1FF 0%, #F5F9FF 94.2%)', borderBottom: '0', color: 'rgba(0,0,0, 0.6)' };
      } else if (columnIndex % 2 === 1) {
        return { background: 'transparent', color: '#333' };
      } else {
        return { background: '#f7faff', color: '#333' };
      }
    },

    // 关闭菜单
    handleClosedApp() {
      window?.h5sdk?.biz?.navigation?.close({
        onSuccess: function (result) {
          console.log(result);
        },
      });
    },
  },
};

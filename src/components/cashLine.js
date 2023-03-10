import { mapGetters } from 'vuex';
import projectApi from '@api/project';
import CashFlowCurve from '@/echarts/CashFlowCurve';
import dateFormatter from '@utils/timeFormatter';
import format from '@/utils/format';
function getDateTime(str) {
  if (str) {
    return Date.parse(str.replaceAll('-', '/'));
  } else {
    return 0;
  }
}

export default {
  data() {
    return {
      loading: false,
      items: [
        { prop: 'currentTime', title: '当前时间', brief: '', name: '', active: true },
        { prop: 'acquireLandTime', title: '拿地', brief: '', name: '' },
        { prop: 'openingTime', title: '开盘', brief: '', name: '' },
        { prop: 'cashFlowBackTime', title: '现金流回正', brief: '', name: '' },
        { prop: '', title: '返还80%本金', brief: '首次50%利润预分配', name: '' },
        { prop: '', title: '二次80%利润预分配', brief: '', name: '' },
        { prop: '', title: '三次85%利润预分配', brief: '', name: '' },
        { prop: 'paymentTime', title: '交付', brief: '', name: '' },
        { prop: '', title: '清算分配及', brief: '返还20%本金', name: '' },
      ],
      options: {},
      cashLegend: [
        {
          icon: 'lvfont-yuan',
          color: '#D84B42',
          title: '资金需求峰值',
          value: '',
        },
        {
          icon: 'lvfont-stadrad',
          color: '#FAECE0',
          title: '现金流回正周期',
          value: '',
        },
      ],
    };
  },
  computed: mapGetters(['projectId']),
  mounted() {
    this.loadCashLine()
      .then(() => (this.loading = false))
      .catch(err => {
        this.loading = false;
      });
  },
  methods: {
    // 调用数据
    async loadCashLine() {
      const { projectId } = this;
      const data = await projectApi.cashFlow({ projectId });
      const values = this.formatValue(data);
      this.options = CashFlowCurve(values);
      setTimeout(() => {
        this.canInitChart = true;
      }, 0);
    },

    // 处理数据
    formatValue(data) {
      const { cashFlowData, currentTime, acquireLandTime, cashFlowBackTime, cashFlowBackCycle, fundDemandPeak } = data;
      const { xaxis = [], groups = [] } = cashFlowData; // 季度曲线坐标
      const target = this.formatChartLine(cashFlowData);
      const lastAxis = xaxis.at(-1); // 时间轴最后一个值
      const firstAxis = xaxis[0]; // 时间轴第一个值
      const leastSeason = this.fetchLeastValue(acquireLandTime, firstAxis); // 拿地时间前一个季度
      const timeNodeFilter = this.items.filter(item => Boolean(item.prop)); // 过滤没有值的时间节点
      const timeNodeVisible = timeNodeFilter.map(item => {
        let name = data[item.prop] ? dateFormatter('YYYY/MM/DD', data[item.prop]) : '';
        return {
          ...item,
          name,
          value: name ? getDateTime(name) : 0,
        };
      }); // 时间节点数据
      const emptyValues = leastSeason.interval.map(item => '-');
      const minTimeNode = getDateTime(leastSeason.season);
      const maxTimeNode = getDateTime(lastAxis);

      timeNodeVisible.unshift({ value: minTimeNode, title: '', brief: '', name: '' }); // 开始时间
      timeNodeVisible.push({ value: maxTimeNode, title: '', brief: '', name: '' }); // 结束时间

      this.cashLegend = [
        {
          icon: 'lvfont-yuan',
          color: '#D84B42',
          title: '资金需求峰值',
          value: format.solveTableStrDanwei(fundDemandPeak, '万元', 0),
        },
        {
          icon: 'lvfont-stadrad',
          color: '#FAECE0',
          title: '现金流回正周期',
          value: format.solveTableStrDanwei(cashFlowBackCycle, '个月', 1),
        },
      ];
      let now = currentTime ? getDateTime(currentTime) : 0;
      let start = acquireLandTime ? getDateTime(acquireLandTime) : 0;
      return {
        max: target.round,
        min: -target.round,
        point: { x: target.xaxis, y: target.least },
        chart: { xaxis: [...leastSeason.interval, ...xaxis], data: [...emptyValues, ...groups[0]] }, // 曲线数据
        timeline: { data: timeNodeVisible, start: minTimeNode, ending: maxTimeNode }, // 时间线数据
        current: now, //
        cycle: !cashFlowBackTime ? minTimeNode : getDateTime(cashFlowBackTime), // 回正周期
        count: cashFlowBackCycle || '-',
        start,
        now,
      };
    },

    // 整理曲线数据
    formatChartLine({ xaxis = [], groups = [] }) {
      const list = groups[0] || [];
      if (list.length < 1) return {};
      const value = list.map(item => Number(item)); // 转为数组
      const least = Math.min(...value); // 最小值
      const index = value.findIndex(item => item === least);
      const target = value.map(item => Math.abs(item));
      const maxValue = Math.max(...target);
      const yAxisRound = Math.ceil((maxValue * 3) / 2);

      return {
        least,
        round: yAxisRound,
        xaxis: xaxis[index],
      };
    },

    // 拿地时间和第一个季度比较，取时间轴最小值
    fetchLeastValue(landTime, season) {
      if (!landTime || !season) return { season: '', interval: [] };
      if (getDateTime(landTime) > getDateTime(season)) return { season, interval: [] };
      let current = season;
      const interval = [];
      const lastSeason = this.fetchLastSeason(landTime);
      const minusSeason = Math.round((getDateTime(season) - getDateTime(lastSeason)) / (3600000 * 24 * 90));
      for (let i = 0; i < minusSeason; i++) {
        current = this.fetchLastSeason(current);
        interval.unshift(current);
      }
      return { season: lastSeason, interval };
    },

    // 获取拿地的前一个季度
    fetchLastSeason(value) {
      let date = '';
      const first = new Date(value);
      const nowYear = first.getFullYear();
      const nowMonth = first.getMonth() + 1;

      if (nowMonth <= 3) {
        date = `${nowYear - 1}-${12}`;
      } else if (nowMonth > 3 && 6 >= nowMonth) {
        date = `${nowYear}-${3}`;
      } else if (nowMonth > 6 && 9 >= nowMonth) {
        date = `${nowYear}-${6}`;
      } else {
        date = `${nowYear}-${9}`;
      }

      const current = new Date(date);
      current.setDate(32);
      const lastMonthDay = 32 - current.getDate();
      return `${date}-${lastMonthDay}`;
    },
  },
};

import { formatTooltip } from './utils/formatter';

export default function ({ title, xaxis, values }) {
  return {
    grid: { top: 108, bottom: 45, left: 110, right: 70 },
    tooltip: {
      show: true,
      padding: 0,
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255, 255, 255, 1)' }, z: -1 },
      borderColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0)',
      formatter: params => formatTooltip(params, {}),
    },
    title: {
      top: 14,
      left: 20,
      text: title,
      textStyle: { color: '#000000', fontSize: 20, lineHeight: 28, fontWeight: 500 },
    },
    legend: {
      top: 56,
      left: 20,
      itemGap: 15,
      itemWidth: 12,
      itemHeight: 6,
      textStyle: { color: 'rgba(51,51,51,0.6)', fontSize: 12, padding: 4 },
      data: values.map(item => ({ name: item.name, icon: item.icon, itemStyle: { color: item.color } })),
    },
    toolbox: { show: false, feature: { saveAsImage: {} } },
    xAxis: {
      type: 'category',
      data: xaxis,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#DFE0E4' } },
      splitLine: { show: false, lineStyle: { type: 'dashed', color: '#f00' } },
      axisLabel: {
        interval: 0,
        textStyle: { color: '#272A3C', fontSize: 16, padding: [2, 0], align: 'center' },
      },
    },
    yAxis: values.map((item, index) => {
      return {
        name: '',
        show: true,
        type: 'value',
        axisLabel: {
          show: true,
          color: '#999CA9',
          formatter: item.format,
          fontSize: 14,
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
        },
        position: index === 0 ? 'left' : 'right',
        axisLine: { show: false, lineStyle: { color: '#2a5963' } },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(0,0,0,0.05)' } },
        splitNumber: 3,
      };
    }),
    series: values.map((item, index) => ({
      name: item.name,
      type: item.type,
      label: { show: false, position: 'top' },
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: { color: item.color, borderRadius: 6, borderWidth: item.type === 'line' ? 2 : 0, borderColor: '#fff' },
      yAxisIndex: index,
      barWidth: 8,
      data: item.data,
    })),
  };
}

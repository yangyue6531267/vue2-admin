import { formatTooltip } from './utils/formatter';
import format from '@/utils/format';
import takeChart from '@/views/region/overview/quota/utils/takeChart';

let chartSize = format.solveChartSize;
export default function (data, params) {
  const { tags = [], xaxis = [], groups = [] } = data;

  switch (params.title) {
    case '十日资金余额变动图':
      tags[0] = '资金余额';
      break;
    case '十日结算中心存款变动图':
      tags[0] = '结算中心存款';
      break;
    case '十日销售监管变动图':
      tags[0] = '销售监管';
      break;

    default:
      break;
  }

  return {
    grid: { top: chartSize(40), bottom: chartSize(40), left: chartSize(40), right: 0 },
    legend: {
      top: 0,
      left: 0,
      show: true,
      data: tags,
      icon: format.getChartPath(params.data[0].type),
      textStyle: { fontSize: chartSize(12),lineHeight: chartSize(16), color: 'rgba(51,51,51,0.6)' },
      itemStyle: { borderWidth: 0 },
      itemWidth: format.getChartPathSize(params.data[0].type),
      // itemHeight: chartSize(10),
      inactiveBorderWidth: 0,
    },
    xAxis: {
      type: 'category',
      data: xaxis,
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { interval: 0, textStyle: { color: '#666666' } },
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: {
        formatter: (value, index) => {
          return format.solveTableNum(value, '', 0);
        },
        textStyle: { color: '#999CA9' },
      },
      splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
      max: format.getArrMaxAndMin(groups).scaleMax,
    },
    series: groups.map((item, index) => {
      let label, mixins, itemStyle;
      const option = params.data[index];
      const isLine = option.type === 'line';

      if (isLine) {
        label = {
          padding: [chartSize(5), chartSize(3)],
          borderRadius: chartSize(3),
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          shadowOffsetY: 4,
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 4,
        };
        mixins = { symbol: 'circle', symbolSize: 6 };
        itemStyle = { borderWidth: 1, borderColor: '#ffffff' };
      } else {
        label = {};
        mixins = { barGap: 2, barWidth: chartSize(6) };
        itemStyle = { borderRadius: chartSize(6) };
      }

      return {
        name: tags[index],
        type: option.type,
        ...mixins,
        itemStyle: { color: option.color, ...itemStyle },
        label: {
          show: false,
          position: option.position || 'top',
          fontSize: chartSize(14),
          color: option.color,
          ...label,
          formatter: item => {
            return format.tableFormateMoney(item.value);
          },
        },
        data: item.map(num => format.solveTableNum(num, '', 2)),
      };
    }),
    tooltip: {
      show: true,
      trigger: 'axis',
      triggerOn: 'click',
      padding: 0,
      position: [0, 0],
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(0, 0, 0, 0.1)' }, z: -1 },
      borderColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0)',
      className: 'echarts-tooltip',
      formatter: params => {
        return formatTooltip(params, { unit: ['亿元', '亿元', '亿元', '%', '%'], format: [format.solveTableStrDanwei, format.solveTableStrDanwei] });
      },
    },
    dataZoom: [
      {
        type: 'slider',
        show: xaxis.length > 5,
        left: '8%',
        right: '8%',
        bottom: chartSize(5),
        height: chartSize(5),
        zoomLock: true,
        brushSelect: false,
        handleSize: '100%',
        handleIcon: 'path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z',
        handleStyle: { borderWidth: 0, color: '#cbd3e3' },
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgba(255, 255, 255, 0)',
        fillerColor: '#cbd3e3',
        textStyle: { color: 'rgba(255, 255, 255, 0)', fontSize: 0 },
        dataBackground: { lineStyle: { color: 'rgba(255, 255, 255, 0)' } },
        startValue: groups[0].length - 6,
        minValueSpan: 4,
        maxValueSpan: 4,
      },
      {
        type: 'inside',
        show: true,
        height: 15,
        start: 1,
        end: 35,
      },
    ],
  };
} //

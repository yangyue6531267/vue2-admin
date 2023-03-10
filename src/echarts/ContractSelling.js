import { formatTooltip } from './utils/formatter';
import format from '@/utils/format';
let chartSize = format.solveChartSize;

export default function ({ tags = [], xaxis = [], groups = [] }, colors = ['#316BD8', '#F1AF77'], tooltipFormatter = null) {
  const texts = xaxis.map(item => item.length);
  const first = groups[0];
  const length = groups.length - 1;
  const lineHeight = Math.ceil(Math.max(...texts) / 5);

  return {
    title: {
      text: '',
      textStyle: { fontSize: chartSize(12), fontWeight: 400, color: '#86909C' },
      top: 0,
      right: 0,
      align: 'right',
    },
    grid: { top: chartSize(40), bottom: chartSize(20), left: chartSize(95), right: chartSize(60) },
    // legend: {
    //   top: 0,
    //   show: tags.length > 1,
    //   data: tags,
    //   left: 0,
    //   icon: 'circle',
    //   textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)' },
    //   itemWidth: format.getChartPathSize('bar'),
    //   formatter: function (name) {
    //     return name+": -- %";
    //   }
    // },
    yAxis: {
      type: 'category',
      data: xaxis,
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: {
        width: chartSize(85),
        margin: chartSize(85),
        align: 'left',
        interval: 0,
        textStyle: { color: '#272A3C', fontSize: chartSize(12), lineHeight: chartSize(16), padding: [chartSize(2), 0] },
        overflow: 'break',
        formatter: function (value) {
          var ret = '', //拼接加\n返回的类目项
            maxLength = 6, //每项显示文字个数
            valLength = value.length, //X轴类目项的文字个数
            rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN === 1) {
            return value;
          } else if (rowN === 2) {
            return value.substring(0, maxLength) + '\n' + value.substring(maxLength, valLength);
          } else {
            return value.substring(0, maxLength) + '\n' + value.substring(maxLength, 2 * maxLength) + '...';
          }
        },
      },
    },
    xAxis: {
      type: 'value',
      show: true,
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: {
        textStyle: { color: '#999CA9' },
        formatter: function (value) {
          return value + '%';
        },
      },
      splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
      splitNumber: 5,
      max: 100,
    },
    series: groups.map((item, index) => ({
      name: tags[index],
      data: item,
      type: 'bar',
      barWidth: chartSize(6),
      barGap: '100%',
      // stack: 'total',
      itemStyle: { color: colors[index], barBorderRadius: [chartSize(10), chartSize(10), chartSize(10), chartSize(10)] },
      // label: {
      //   show: index === length,
      //   position: 'top',
      //   textStyle: { fontSize: 16, color: '#333' },
      //   formatter: function (param) {
      //     if (length > 0) {
      //       let sum = Number(groups[0][param.dataIndex]) + Number(groups[1][param.dataIndex]);
      //       return sum.toFixed(2);
      //     }
      //   },
      // },
    })),
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
      showContent:true,
      alwaysShowContent:true,
      className: 'echarts-tooltip',
      formatter: params => {
        return formatTooltip(params, {
          unit: tooltipFormatter ? new Array(tags.length == 0 ? 1 : tags.length).fill(tooltipFormatter) : ['亿元', '亿元', '亿元', '%', '%'],
          format: [format.solveTableStrDanwei, format.solveTableStrDanwei],
        });
      },
    },
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     orient: 'vertical',
    //     show: true,
    //     left: chartSize(1),
    //     top: chartSize(40),
    //     bottom: chartSize(10),
    //     width: chartSize(5),
    //     zoomLock: true,
    //     brushSelect: false,
    //     handleSize: '100%',
    //     handleIcon: 'path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z',
    //     handleStyle: { borderWidth: 0, color: '#cbd3e3' },
    //     backgroundColor: 'rgba(255, 255, 255, 0)',
    //     borderColor: 'rgba(255, 255, 255, 0)',
    //     fillerColor: '#cbd3e3',
    //     textStyle: { color: 'rgba(255, 255, 255, 0)', fontSize: 0 },
    //     dataBackground: { lineStyle: { color: 'rgba(255, 255, 255, 0)' } },
    //     start: 0,
    //     minValueSpan: 4,
    //     maxValueSpan: 4,
    //   },
    //   {
    //     type: 'inside',
    //     show: true,
    //     orient: 'vertical',
    //     width: 5,
    //     start: 1,
    //     end: 35,
    //   },
    // ],
  };
}

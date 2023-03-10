import { formatTooltip } from './utils/formatter';
import format from '@/utils/format';
let chartSize = format.solveChartSize;

export default function ({ tags = [], xaxis = [], groups = [] }, colors = ['#316BD8', '#F1AF77']) {
  const texts = xaxis.map(item => item.length);
  const first = groups[0];
  const length = groups.length - 1;
  const lineHeight = Math.ceil(Math.max(...texts) / 5);
  const radius = [[6, 0, 0, 6], [0], [0], [0, 6, 6, 0]];

  return {
    // backgroundColor: 'rgba(0, 0, 0, 0.02)',
    title: {
      text: '(单位：亿元)',
      textStyle: { fontSize: chartSize(10), fontWeight: 400, color: 'rgba(51, 51, 51, 0.4)' },
      top: chartSize(20),
      left: 0,
      align: 'left',
    },
    grid: { top: chartSize(40), bottom: 0, left: chartSize(90), right: chartSize(80) },
    // legend: {
    //   top: 0,
    //   show: tags.length > 1,
    //   data: tags,
    //   left: 0,
    //   icon: 'circle',
    //   textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)' },
    //   itemWidth: format.getChartPathSize('bar'),
    // },
    yAxis: {
      // xAxis
      type: 'category',
      data: xaxis,
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: 0 } },
      axisLabel: {
        width: chartSize(80),
        margin: chartSize(80),
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
      axisLine: { lineStyle: { type: 'solid', color: 'rgba(51, 51, 51, 0.2)', width: '1' } },
      axisLabel: { show: false, textStyle: { color: '#999CA9' } },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(51, 51, 51, 0.1)' } },
      splitNumber: 3,
      // max: 100,
    },
    series: groups.map((item, index) => ({
      name: tags[index],
      data: item,
      type: 'bar',
      barWidth: chartSize(6),
      // barGap: '100%',
      stack: 'total',
      itemStyle: {
        color: colors[index],
        barBorderRadius: radius[index],
      },
      label: {
        show: index === length,
        position: 'right',
        textStyle: { fontSize: chartSize(12), color: '#333' },
        formatter: function (param) {
          if (length > 0) {
            let sum = Number(groups[0][param.dataIndex]) + Number(groups[1][param.dataIndex]) + Number(groups[2][param.dataIndex]) + Number(groups[3][param.dataIndex]);
            return sum.toFixed(2);
          }
        },
      },
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
      className: 'inventory-echarts-tooltip echarts-tooltip',
      formatter: params => {
        return formatTooltip(params, {
          unit: ['亿元', '亿元', '亿元', '亿元', '亿元'],
          format: [
            format.solveTableStrDanwei,
            format.solveTableStrDanwei,
            format.solveTableStrDanwei,
            format.solveTableStrDanwei,
            format.solveTableStrDanwei,
          ],
        });
      },
    },
    dataZoom: [
      {
        type: 'slider',
        orient: 'vertical',
        show: true,
        left: chartSize(1),
        top: chartSize(40),
        bottom: chartSize(0),
        width: chartSize(5),
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
        start: 0,
        minValueSpan: 5,
        maxValueSpan: 5,
      },
      {
        type: 'inside',
        show: true,
        orient: 'vertical',
        width: 5,
        start: 1,
        end: 35,
      },
    ],
  };
}

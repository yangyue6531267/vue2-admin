/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-14 17:06:40
 * @FilePath: \杭州绿城\greentown-wap\src\echarts\TwoFeeChart.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { formatTooltip } from './utils/formatter';
import format from '@/utils/format';
let chartSize = format.solveChartSize;
export default function (data, colors = ['#316BD8', '#F1AF77'], units = ['%', '%']) {
  const { tags = [], title = '', xaxis = [], groups = [] } = data;
  return {
    grid: { top: chartSize(40), bottom: chartSize(50), left: chartSize(50), right: 0 },
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
        return formatTooltip(params, {
          units,
          format: units.map(unit => {
            if (unit === '%') {
              return format.tableFormateRate2;
            } else if (unit === '万元') {
              return format.tableFormateMoney5;
            }
          }),
        });
      },
    },
    legend: {
      top: 0,
      left: 0,
      show: true,
      data: tags,
      icon: 'circle',
      itemGap: 20,
      textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)', padding: [0, chartSize(3)] },
      itemWidth: format.getChartPathSize('bar'),
    },
    xAxis: {
      type: 'category',
      data: xaxis,
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: {
        interval: 0,
        textStyle: { color: '#666666' },
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
    yAxis: {
      type: 'value',
      show: true,
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { textStyle: { color: '#999CA9' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
    },
    series: groups.map((item, index) => ({
      type: 'bar',
      name: tags[index],
      data: item,
      barGap: 1.5,
      barWidth: chartSize(6),
      color: colors[index],
      itemStyle: { color: colors[index], barBorderRadius: [chartSize(30), chartSize(30), chartSize(30), chartSize(30)] },
      // label: { normal: { show: true, position: 'top', textStyle: { fontSize: 12, color: '#264689' } } },
    })),
    dataZoom: [
      {
        type: 'slider',
        show: xaxis.length > 4,
        left: '8%',
        right: '8%',
        bottom: chartSize(4),
        height: chartSize(4),
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
        minValueSpan: 3,
        maxValueSpan: 3,
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
}

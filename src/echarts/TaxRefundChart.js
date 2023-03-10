/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-14 19:46:16
 * @FilePath: \杭州绿城\greentown-wap\src\echarts\TaxRefundChart.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { formatTooltip } from './utils/formatter';
import format from '@/utils/format';
let chartSize = format.solveChartSize;
export default function ({ tags = [], title = '', xaxis = [], groups = [] }) {
  return {
    grid: { top: chartSize(40), bottom: chartSize(40), left: chartSize(40), right: 0 },
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
        return formatTooltip(params, { unit: ['万元', '万元', '万元', '%', '%'], format: [format.solveTableStrDanwei, format.solveTableStrDanwei] });
      },
    },
    legend: {
      top: 0,
      left: 0,
      show: true, 
      data: tags,
      icon: 'circle',
      itemGap:20,
      textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)', padding: [0, chartSize(3)] },
      itemWidth: format.getChartPathSize('bar'),
    },
    xAxis: {
      type: 'category',
      data: xaxis,
      axisLine: { onZero: false, lineStyle: { type: 'solid', color: '#EDEDED', width: 1 } },
      axisLabel: { interval: 0, textStyle: { color: '#272A3C', fontSize: chartSize(12), padding: [chartSize(3), 0] },},
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: 1 } },
      axisLabel: { textStyle: { color: '#999CA9' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
    },
    series: [
      {
        name: tags[0],
        data: groups[0],
        type: 'bar',
        barWidth: chartSize(6),
        itemStyle: { normal: { olor: '#316BD8', barBorderRadius: [chartSize(30), chartSize(30), chartSize(30), chartSize(30)] } },
        barGap: 1.5,
        label: { normal: { show: false, position: 'top', textStyle: { fontSize: chartSize(12), color: '#333' } } },
      },
      {
        name: tags[1],
        data: groups[1],
        type: 'bar',
        barWidth: chartSize(6),
        itemStyle: { normal: { color: '#F1AF77', barBorderRadius: [chartSize(30), chartSize(30), chartSize(30), chartSize(30)] } },
        label: { normal: { show: false, position: 'top', textStyle: { fontSize: chartSize(12), color: '#333' } } },
      },
    ],
  };
}

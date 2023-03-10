/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-12 15:18:41
 * @FilePath: \杭州绿城\greentown-wap\src\echarts\ProfitBarInProject.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { formatTooltip } from './utils/formatter';
import format from '@/utils/format';
let chartSize = format.solveChartSize;
export default function ({ tags = [], title = '', xaxis = [], values = [] }, colors = ['#316BD8', '#F1AF77']) {
  const items = {};
  for (let i = 0; i < values.length; i++) {
    const elem = values[i];
    if (!elem.stack) continue;
    if (!items[elem.stack]) items[elem.stack] = [];
    items[elem.stack].push(elem.data);
  }
  return {
    grid: { top: chartSize(40), bottom: chartSize(20), left: chartSize(50), right: 0 },
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
      left: 0,
      icon: 'circle',
      textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)' },
      itemWidth: format.getChartPathSize('bar'),
    },
    // title: {
    //   text: '单位:万元',
    //   textStyle: { fontSize: 12, fontWeight: 400, color: '#86909C' },
    //   x: -5,
    //   y: 30,
    // },
    xAxis: {
      type: 'category',
      data: xaxis,
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { interval: 0, textStyle: { color: '#272A3C' } },
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { textStyle: { color: '#999CA9' }, formatter: '{value}' },
      splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
      splitNumber: 3,
    },
    series: values.map(item => {
      return {
        type: 'bar',
        name: item.name,
        data: item.data,
        // label: {
        //   show: true,
        //   rotate: 90,
        //   distance: 20,
        //   position: 'top',
        //   verticalAlign: 'middle',
        //   textStyle: { fontSize: 12, color: '#264689' },
        //   formatter: ({ value }) => Math.round(value),
        // },
        itemStyle: { color: item.color, barBorderRadius: chartSize(6) },
        barWidth: chartSize(6),
        barGap: 1.5,
      };
    }),
  };
}

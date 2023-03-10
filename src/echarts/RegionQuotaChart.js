import { formatLinear } from './utils/formatter';

export default function () {
  return {
    grid: { top: 10, left: '3%', right: '4%', bottom: '3%', containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { lineStyle: { color: '#57617B' } },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisTick: { show: false },
        axisLine: { show: false, lineStyle: { color: '#57617B' } },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel: { interval: 5 },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位（%）',
        axisTick: { show: false },
        axisLine: { show: false, lineStyle: { color: '#57617B' } },
        axisLabel: { show: false, margin: 10, textStyle: { fontSize: 14 } },
        splitLine: { show: false, lineStyle: { color: '#57617B' } },
      },
    ],
    series: [
      {
        name: '移动',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: { normal: { width: 1 } },
        areaStyle: {
          normal: {
            color: formatLinear(['rgba(137, 189, 27, 0.3)', 'rgba(137, 189, 27, 0)'], 0, 0, 0, 1),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: 'rgb(137,189,27)',
            borderColor: 'rgba(137,189,2,0.27)',
            borderWidth: 12,
          },
        },
        data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
      },
      {
        name: '电信',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: { normal: { width: 1 } },
        areaStyle: {
          normal: {
            color: formatLinear(['rgba(0, 136, 212, 0.3)', 'rgba(0, 136, 212, 0)'], 0, 0, 0, 1),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
          },
        },
        itemStyle: {
          normal: {
            color: 'rgb(0,136,212)',
            borderColor: 'rgba(0,136,212,0.2)',
            borderWidth: 12,
          },
        },
        data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
      },
    ],
  };
}

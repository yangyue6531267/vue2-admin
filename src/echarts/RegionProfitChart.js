import { formatTooltip } from './utils/formatter';
import format from '@utils/format';

export default function name(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const total = data.reduce((total, item) => ((total = Math.round((Number(total) + Number(item)) * 100) / 100), total), 0);
  const average = Math.ceil((total / data.length) * 100) / 100;

  return {
    title: { text: '' },
    grid: { top: 40, bottom: 20, left: 40, right: 0, containLabel: true },
    xAxis: {
      type: 'category',
      show: true,
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      axisLine: { show: false, onZero: false, lineStyle: { type: [5, 3], width: 1, color: '#D84B42', dashOffset: 5 } },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    visualMap: {
      show: false,
      pieces: [
        { gt: min - 5, lte: average, color: '#30C5A9' },
        { gt: average, lte: max + 5, color: '#D84B42' },
      ],
      outOfRange: { color: '#30C5A9' },
    },
    series: {
      name: ' ',
      data: data,
      type: 'line',
      symbolSize: 6, //小圆点的大小
      markLine: {
        symbol: 'none',
        silent: true,
        data: [{ name: '平均线', type: 'average' }],
        label: { show: false },
        lineStyle: { width: 1, color: '#D84B42' },
      },
      areaStyle: {
        color: format.formatLinear(['rgba(48, 197, 169, 0.4)', 'rgba(255, 255, 255, 0.3)'], 0, 0, 0, 1),
        origin: 'start',
      },
    },
  };
}

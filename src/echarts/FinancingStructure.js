export default function ({ data = [], title = '' }, unit = '亿元') {
  return {
    grid: { top: 30, bottom: 0,height:50, left: 0, right: 10 },
    title: { text: title },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255, 255, 255, 1)' }, z: -1 },
    },
    legend: data.map((item, index) => {
      const { name, data } = item;
      const value = Number(data).toFixed(1);

      return {
        show: true,
        data: [name],
        left: index === 0 ? 0 : '50%',
        icon: 'circle',
        bottom: 0,
        itemHeight: 12,
        itemWidth: 12,
        formatter: data => `{title| ${data}}{value| ${value}} `, //{unit|${unit}}
        textStyle: {
          height: 30,
          fontSize: 14, color: 'rgba(51,51,51,0.6)',
          rich: {
            title: { height: 30, fontSize: 14, color: '#000000' },
            value: { fontSize: 22, color: '#000000', fontWeight: 'bold', padding: [1, 0] },
            unit: { fontSize: 14, color: '#000000', padding: [4, 0], verticalAlign: 'bottom' },
          },
        },
      };
    }),
    xAxis: {
      type: 'value',
      axisTick: { show: true, inside: true, length: 8, lineStyle: { color: '#D9D9D9', width: 1 } },
      axisLine: { show: true, lineStyle: { color: '#D9D9D9', width: 1 } },
      axisLabel: { show: false, interval: 0, textStyle: { color: '#666666' } },
      splitLine: { show: false },
      splitNumber: 1,
      minInterval: 1,
    },
    yAxis: {
      type: 'category',
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { show: false, textStyle: { color: '#999CA9' } },
      splitLine: { show: false, lineStyle: { type: 'dashed', color: '#E5E6EB' } },
    },
    series: data.map(item => ({
      name: item.name,
      data: [item.data],
      type: 'bar',
      barWidth: 8,
      barGap: 0.5,
      itemStyle: { normal: { color: item.color, barBorderRadius: [30, 30, 30, 30] } },
    })),
  };
}

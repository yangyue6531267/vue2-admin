
import format from '@/utils/format';
let chartSize = format.solveChartSize;
export default function ({ data = [], tags = [], xaxis = [], title = [], yaxis = {} }) {
  return {
    grid: { top: chartSize(30), bottom: chartSize(30), left: chartSize(10), right: 0 },
    legend: {
      top: 0,
      left: chartSize(20),
      show: tags.length > 0,
      data: tags,
      textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)' },
      // itemHeight: 10,
      // itemWidth: 10,
    },
    xAxis: {
      type: 'category',
      data: xaxis || [],
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { interval: 0, textStyle: { color: '#666666', fontSize: chartSize(12) } },
    },
    yAxis: {
      type: 'value',
      show: true,
      axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { textStyle: { color: '#adadad', fontSize: chartSize(10), padding: [0, 3] }, formatter: yaxis.formatter },
      splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
    },
    series: data.map(item => ({
      type: 'line',
      name: item.name,
      data: item.data,
      smooth: false, //true 有弧度 ，false 没弧度（直线）
      barGap: '350%',
      symbol: 'circle', //将小圆点改成实心 不写symbol默认空心
      symbolSize: chartSize(6), //小圆点的大小
      itemStyle: { normal: { color: item.color } },
      label: { show: true, color: item.color, fontSize: chartSize(12), position: 'top', padding: [chartSize(3), chartSize(5)], borderRadius: chartSize(3), backgroundColor: '#ffffff' },
    })),
    dataZoom: [
      {
        type: 'slider',
        show: true,
        left: '10%',
        right: '5%',
        bottom: '2%',
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
        // start: 5,
        startValue: data[0].data.length - 6,
        // end: 50,
      },{
        "type": "inside",
        "show": true,
        "height": 15,
        "start": 1,
        "end": 35
      },
    ],
  };
}

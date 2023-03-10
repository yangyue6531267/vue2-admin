// import { htmlTemplates } from './utils/formatter';
import format from '@/utils/format';

let chartSize = format.solveChartSize;

const options = [
  { type: 'bar', icon: 'circle', color: '#264689', width: 10, height: 10 },
  { type: 'bar', icon: 'circle', color: '#316BD8', width: 10, height: 10 },
  { type: 'bar', icon: 'circle', color: '#F1AF77', width: 10, height: 10 },
  { type: 'line', icon: 'rect', color: '#1E4182', width: 3, height: 12 },
  { type: 'line', icon: 'rect', color: '#316BD8', width: 3, height: 12 },
];

let tooltipInfo = [];

function rankBy(originArr, rankArray) {
  if (!originArr || originArr.length === 0) return []
  const resutlArray = []
  originArr.map(item => {
    const idx = rankArray.findIndex(one => one === item.seriesName)
    if (idx > -1) {
      resutlArray[idx] = item
    }
  })
  console.log('resutlArray', resutlArray);
  return resutlArray
}
function htmlTemplates(data,style=null) {
  const icon = data.type === 'line' ? `<i class='iconfont lvfont-reac' style="background: ${data.color}"></i>` : `<i class='iconfont lvfont-yuan1' style="color:${data.color};"></i>`
  return `<li class='tooltip-item' style="${style};"> 
  ${icon}
  <span class='tooltip-name'>${data.name}: </span>
  <span class='tooltip-data' style="color:${data.color};">${data.value}</span>
</li>`;
}
function formatTooltip(items, data,style='') {
  console.log('items', items);
  if (!Array.isArray(items) || items.length === 0) return '';
  const leftIndex = items.findIndex(item => item.seriesName === data.leftKey)
  const templates = []
  items.map((item, index) => {
    if (item.seriesName === data.leftKey) return
    const unit = Array.isArray(data.unit) ? data.unit[index] : data.unit;
    const format = Array.isArray(data.format) ? data.format[index] : data.format;
    const { color, value, seriesName, componentSubType } = item;
    const htmltemp = htmlTemplates({ name: seriesName, type: componentSubType, value: format(value, unit,2), color }, style)
    templates.push(htmltemp)
  });
  const rightItems = `<ul class='tooltip-items'>${templates.join('')}</ul>`;
  const leftItem = leftIndex > -1 ? `<div class="left">
    <div class="top"><i class='iconfont ${items[leftIndex].componentSubType === 'line'? 'lvfont-reac': 'lvfont-yuan1'}' style="color:${items[leftIndex].color};background: ${items[leftIndex].color}"></i>
    <span class='tooltip-name'>${items[leftIndex].seriesName}</span></div>
    <span class='tooltip-data' style="color:${items[leftIndex].color};">${items[leftIndex].value}</span>
  </div>` : ''
  return `<div class="custom-tooltip-view">
    ${leftItem}
    <div class="right">${rightItems}</div>
  </div>`;
}

export default function ({ tags = [], xaxis = [], groups = [] }) {
  return {
    grid: { top: chartSize(60), bottom: chartSize(30), left: chartSize(28), right: chartSize(48) },
    // title: {
    //   text: '',
    //   textStyle: { fontSize: 18, fontWeight: 400, color: '#000' },
    //   x: 20,
    //   y: 15,
    // },
    // legend: [
    //   {
    //     show: true,
    //     top: chartSize(20),
    //     left: 0,
    //     data: tags.slice(3),
    //     icon: format.getChartPath('line'),
    //     itemWidth: format.getChartPathSize('line'),
    //     itemGap:20,
    //     textStyle: { fontSize: chartSize(12), color: 'rgba(51,51,51,0.6)' },
    //     itemStyle: { borderWidth: 0 },
    //   },
    //   {
    //     top: 0,
    //     left: 0,
    //     show: true,
    //     data: tags.slice(0, 3),
    //     icon: format.getChartPath('bar'),
    //     itemWidth: format.getChartPathSize('bar'),
    //     itemGap:20,
    //     textStyle: { fontSize: chartSize(12), color: '#999' },
    //   },
    // ],
    xAxis: {
      type: 'category',
      data: xaxis,
      axisLine: { lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
      axisLabel: { interval: 0, textStyle: { color: '#666666' }, formatter: data => data.match(/\d+月/)[0] },
    },
    yAxis: [
      {
        type: 'value',
        show: true,
        axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
        axisLabel: { textStyle: { color: '#999CA9' } },
        splitLine: { lineStyle: { type: 'dashed', color: '#E5E6EB' } },
        max: format.getArrMaxAndMin(groups).scaleMax,
      },
      {
        type: 'value',
        show: true,
        axisLine: { show: false, lineStyle: { type: 'solid', color: '#EDEDED', width: '1' } },
        axisLabel: { textStyle: { color: '#999CA9' }, formatter: '{value}%' },
        splitLine: { show: false, lineStyle: { type: 'dashed', color: '#E5E6EB' } },
        max: format.getArrMaxAndMin(groups).scaleMax,
      },
    ],
    series: groups.map((item, index) => {
      const option = options[index];
      const params = option.type === 'bar' ? { barWidth: chartSize(6), barGap: 0.8 } : { symbol: 'circle', symbolSize: 6, yAxisIndex: 1 };
      const itemStyle = option.type === 'bar' ? { barBorderRadius: [30, 30, 30, 30] } : { borderWidth: 1, borderColor: '#ffffff' };

      return {
        name: tags[index],
        data: item,
        type: option.type,
        ...params,
        itemStyle: { normal: { color: option.color, ...itemStyle } },
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
      showContent:true,
      alwaysShowContent:true,
      backgroundColor: 'rgba(0,0,0,0)',
      className: 'echarts-tooltip',
      formatter: params => {
        const ranks = ['预算数', '实际\\计划完成', '内控指标', '内控指标完成率', '预算完成率']
        const array = rankBy(params, ranks)
        return formatTooltip(array, {
          leftKey: '预算完成率',
          // unit: ['亿元', '亿元', '亿元', '%', '%'],
          unit: ['', '', '', '%', '%'],
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
        show: true,
        left: '8%',
        right: '8%',
        bottom: chartSize(5),
        height: chartSize(5),
        zoomLock: true,
        brushSelect: false,
        handleSize: '100%',
        showDetail: false,
        showDataShadow:false,
        handleIcon: 'path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z',
        handleStyle: { borderWidth: 0, color: '#cbd3e3' },
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgba(255, 255, 255, 0)',
        fillerColor: '#cbd3e3',
        textStyle: { color: 'rgba(255, 255, 255, 0)', fontSize: 0 },
        dataBackground: { lineStyle: { color: 'rgba(255, 255, 255, 0)' } },
        start: 0,
        minValueSpan: 4,
        maxValueSpan: 4,
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

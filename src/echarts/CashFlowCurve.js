import format from '@/utils/format';
import dateFormatter from '@/utils/timeFormatter';
let chartSize = format.solveChartSize;

function formatTooltip([item]) {
  if (!item) return '';
  if (item.value) {
    item.value = format.solveTableStr(item.value, '', 0);
  }
  let isShow =item.data?.symbolC==undefined
  const title = isShow?'':`<p class='tooltip-text'>${item.data?.symbolC}</p>`
  const htmlTitle = `<p class='tooltip-text'> <span>当前时间：</span><span>${dateFormatter('YYYY-MM-DD', item.name)}</span></p>`;
  const htmlLabel = isShow?`<p class='tooltip-text'> <span>${item.seriesName}</span><span>${item.value}万元</span></p>`:'';
  return `<div class="tooltip-cash">${title}${htmlTitle}${htmlLabel}<span class='tooltip-dot'></span></div>`;
}

export function formatLinear(data, x = 0, y = 0, x2 = 1, y2 = 1) {
  const count = data.length - 1;
  const colorStops = data.map((item, index) => ({ offset: Math.round((index / count) * 100) / 100, color: item }));
  return { type: 'linear', x, y, x2, y2, colorStops, globalCoord: false };
}

export default function (data) {
  const { now, max, min, point, count, chart, cycle, timeline, start, current } = data;

 
  let a = timeline.data.filter((item)=>{
    return item.name !=''&& item.title!=''&&item.prop!="currentTime"
  })
  
  let b = a.map(item=>{
    return item.value;
  })
  console.log(b)

  chart.xaxis = chart.xaxis.map(item=>{
    return Date.parse(item);
  })

  chart.xaxis = [...b,...chart.xaxis]

  chart.xaxis.sort(function(a,b){return a-b})

  let objC = {};
  
  a.map((cur)=>{
    objC[chart.xaxis.indexOf(cur.value)] = cur.title
  })

  Object.keys(objC).forEach(item => {
      chart.data.splice(item, 0, "0");
    });



  const level1 = Math.ceil(max / 3);
  const level2 = Math.ceil((max * 2) / 3);
  return {
    grid: { top: chartSize(5), left: chartSize(50), right: chartSize(20), bottom: chartSize(10) },
    title: [{ text: '资金', top: 0, left: chartSize(10), textStyle: { color: '#333', fontSize: chartSize(10), fontWeight: 400 } }],
    xAxis: [
      {
        axisTick: { show: false, lineStyle: { color: '#f00', width: 2 } },
        axisLabel: { show: false },
        splitLine: { show: false },
        min: timeline.start,
        max: timeline.ending,
        axisPointer: { show: false },
      },
      {
        type: 'category',
        show: true,
        axisLine: { show: true, lineStyle: { color: '#333333', width: 1 } },
        axisTick: { show: false },
        axisLabel: { show: false, interval: 0 },
        splitLine: { show: false },
        data: chart.xaxis,
        boundaryGap: false,
        axisPointer: { show: true },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: { show: true },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        min: min || -12,
        max: max || 12,
      },
      {
        type: 'value',
        min: min || -12,
        max: max || 12,
        position: 'left',
        axisLine: { lineStyle: { color: 'rgba(0,0,0,0.6)', width: 1 } },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '时间线',
        type: 'scatter',
        data: [],
        xAxisIndex: 0,
        yAxisIndex: 0,
        markLine: {
          silent: false,
          symbol: 'none',
          data: [
            { yAxis: level1, symbol: 'none', label: { show: false }, lineStyle: { type: 'solid', color: 'rgba(0,0,0,0.1)' } },
            { yAxis: -level2, symbol: 'none', label: { show: false }, lineStyle: { type: 'solid', color: 'rgba(0,0,0,0.1)' } },
            // { xAxis: now, symbol: 'none', label: { show: false }, lineStyle: { type: 'solid', color: 'rgba(0,0,0,0.8)' } },
            [
              { coord: [start, level2], lineStyle: { type: 'dashed', color: 'rgba(0,0,0, 0.4)' } },
              { coord: [start, -level2], lineStyle: { type: 'dashed', color: 'rgba(0,0,0, 0.4)' } },
            ],
            [
              { coord: [cycle, max], lineStyle: { type: 'dashed', color: 'rgba(0,0,0, 0.4)' } },
              { coord: [cycle, min], lineStyle: { type: 'dashed', color: 'rgba(0,0,0, 0.4)' } },
            ],
            [
              { coord: [start, level2], lineStyle: { type: 'dashed', color: 'rgba(0,0,0, 0.4)' } },
              { coord: [cycle, level2], lineStyle: { type: 'dashed', color: 'rgba(0,0,0, 0.4)' } },
            ],
          ],
        },
        markArea: {
          data: [[{ coord: [start, level2] }, { coord: [cycle, -level2] }]],
          itemStyle: { normal: { color: format.formatLattice() } },
        },
        markPoint: {
          data: timeline.data.map((item, index) => {
            const visible = Boolean(item.title);
            const opacity = Number(visible);
            const dotColor = item.active ? 'rgba(57, 113, 226, 1)' : '#316BD8';
            const background = item.active ? 'rgba(255,255,255,0.8)' : 'transparent';
            const labelItem = {
              position: index % 3 === 0 ? 'bottom' : 'top',
              formatter: () => {
                const texts = [];
                if (item.title) texts.push(`{text|${item.title}}`);
                if (item.brief) texts.push(`{text|${item.brief}}`);
                if (item.name) texts.push(`{name|${item.name}}`);
                return texts.join('\n');
              },
              rich: {
                text: { fontSize: chartSize(12), align: 'center', padding: [chartSize(3), 0], color: '#666666' },
                name: { fontSize: chartSize(12), align: 'center', color: '#666666', padding: [chartSize(4), 0] },
              },
              padding: chartSize(5),
              backgroundColor: background,
            };

            return {
              name: item.name,
              coord: [item.value, 0, item.title],
              value: item.value,
              symbol: 'circle',
              symbolSize: 8,
              itemStyle: {
                normal: { color: '#ffffff', borderColor: dotColor, borderWidth: 2, opacity },
                emphasis: { color: '#ffffff', borderColor: dotColor, borderWidth: 2, opacity },
              },
              label: visible && false ? labelItem : { show: false },
            };
          }),
        },
      },
      {
        name: '现金流：',
        type: 'line',
        smooth: true,
        xAxisIndex: 1,
        yAxisIndex: 1,
        symbolSize: 20,
        lineStyle: { color: '#3275FB', width: 2, shadowColor: 'rgba(0, 0, 0, 0.3)', shadowBlur: 15, shadowOffsetY: 20 },
        itemStyle: { color: '#fff', borderColor: 'rgba(216, 75, 66, 1)', borderWidth: chartSize(2), shadowColor: 'rgba(0, 0, 0, .3)', shadowBlur: 1 },
        data: chart.data.map((item,index) => {
          return {
            value: item,
            symbol: item == point.y ? 'circle' : 'none',
            symbolSize: chartSize(8),
            showSymbol: true,
            symbolC: objC[index],
            // itemStyle: {
            //   color: '#fff',
            //   borderColor: 'rgba(216, 75, 66, 1)',
            //   borderWidth: chartSize(2),
            //   // symbolOffset: []
            // },
          }
        }),
      },
    ],
    tooltip: {
      show: true,
      axis: 'x',
      snap: true,
      trigger: 'axis',
      padding: 0,
      axisPointer: { type: 'line', lineStyle: { color: 'rgba(0,0,0,0.8)', type: 'solid' } },
      borderColor: 'rgba(0,0,0,0)',
      shadowColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0)',
      formatter: params => formatTooltip(params, { unit: ['万'] }),
      position: function (point, params, dom, rect, size) {
        const left = point[0];
        const width = size.contentSize[0];
        const value = left - width / 2;
        return [left, '50%']; // 固定在顶部
      },
    },
  };
}

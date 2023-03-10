/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-14 17:09:14
 * @FilePath: \杭州绿城\greentown-wap\src\echarts\utils\formatter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function htmlTemplates(data,style=null) {
  return `<li class='tooltip-item' style="${style};"> 
  <i class='iconfont ${data.type === 'line'? 'lvfont-Union': 'lvfont-yuan1'}' style="color:${data.color};"></i>
  <span class='tooltip-name'>${data.name}: </span>
  <span class='tooltip-data' style="color:${data.color};">${data.value}</span>
</li>`;
}

/**
 * 图标tooltip文字
 * @param data 传入数据
 * @param params chart参数
 * @returns {string}
 */
export function formatTooltip(items, data,style='') {
  console.log('items', items);
  if (!Array.isArray(items) || items.length === 0) return '';
  const first = items[0];
  const templates = items.map((item, index) => {
    const unit = Array.isArray(data.unit) ? data.unit[index] : data.unit;
    const format = Array.isArray(data.format) ? data.format[index] : data.format;
    const { color, value, seriesName, componentSubType } = item;
    return htmlTemplates({ name: seriesName, type: componentSubType, value: format(value, unit,2), color }, style);
  });
  const htmlItems = `<ul class='tooltip-items'>${templates.join('')}</ul>`;
  return `<div class="tooltip-view">${htmlItems}</div>`;
}

export function formatLinear(data, x = 0, y = 0, x2 = 1, y2 = 1) {
  const count = data.length - 1;
  const colorStops = data.map((item, index) => ({ offset: Math.round((index / count) * 100) / 100, color: item }));
  return { type: 'linear', x, y, x2, y2, colorStops, globalCoord: false };
}

/**
 * legend样式
 * @param name 传入名字
 * @returns {string}
 */
export function formatLegend(name) {
  // const templates = items.map((item, index) => {
  //   const unit = Array.isArray(data.unit) ? data.unit[index] : data.unit;
  //   const format = Array.isArray(data.format) ? data.format[index] : data.format;
  //   const { color, value, seriesName, componentSubType } = item;
  //   return htmlTemplates({ name: seriesName, type: componentSubType, value: format(value, unit,2), color }, index);
  // });
  // const htmlItems = `<ul class='tooltip-items'>${templates.join('')}</ul>`;
  // return `<div class="tooltip-view">${htmlItems}</div>`;
}

export function formatLineTooltip (items, unit = '') {
  if (!Array.isArray(items) || items.length === 0) return ''
  const templates = items.map((item, index) => {
    const { color, value, seriesName, marker, name } = item
    return `<div class='item'>${marker}<span class='name'>${seriesName || name}</span><span class='value'>${value || 0}${unit}</span></div>`
  });
  return `<div class="tooltip-view flex-ac">${templates.join('')}</div>`;
}
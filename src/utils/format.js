/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-10-30 14:47:40
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-02-07 15:20:28
 * @FilePath: \杭州绿城\greentown-web\src\utils\format.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function htmlTemplates(data) {
  return `<div> 
  <span style="margin-right:14px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${color};"></span>
  <span style="width: 120px;display:inline-block;">${data.name}：</span>
  <span style="font-size: 16px;color:${data.color};">${data.value}${data.unit}</span>
</div>`;
}

export default {
  // 处理图表尺寸
  solveChartSize(size) {
    var windowWidth = document.body.clientWidth;
    return (size * windowWidth) / 375;
  },
  getChartPath(name) {
    if (name === 'line') {
      return 'path://M15 0.5C19.1421 0.5 22.5 3.85786 22.5 8C22.5 12.1421 19.1421 15.5 15 15.5C10.8579 15.5 7.5 12.1421 7.5 8C7.5 3.85786 10.8579 0.5 15 0.5Z M7 8C7 8.6906 7.08751 9.36076 7.25204 10H2C0.89543 10 0 9.10457 0 8C0 6.89543 0.89543 6 2 6H7.25204C7.08751 6.63924 7 7.3094 7 8Z M23 8C23 8.6906 22.9125 9.36076 22.748 10H28C29.1046 10 30 9.10457 30 8C30 6.89543 29.1046 6 28 6H22.748C22.9125 6.63924 23 7.3094 23 8Z';
    } else if (name === 'bar') {
      return 'circle';
    }
  },
  getChartPathSize(name) {
    if (name === 'line') {
      return 20;
    } else if (name === 'bar') {
      return 11;
    }
  },
  // 数组对象获取最大最小
  getObjMaxAndMin(arr, keys) {
    let nums = [];
    arr.map(item => {
      keys.map(key => {
        nums.push(Number(item[key] || 0));
      });
    });
    let num1 = Math.max(...nums);
    let num2 = Math.min(...nums);
    return {
      max: num1,
      min: num2,
      scaleMax: Math.ceil(num1 * 0.105) * 10,
      scaleMin: Math.floor(num2 * 0.095) * 10,
      one: Math.max(Math.abs(num1), Math.abs(num2)),
    };
  },
  // 数组值获取最大最小
  getArrMaxAndMin(arr) {
    let data = [];
    arr.map(item => {
      if (typeof item === 'object') {
        data.push(...item);
      } else {
        data.push(item);
      }
    });
    let num1 = Math.max(...data);
    let num2 = Math.min(...data);
    return {
      max: num1,
      min: num2,
      scaleMax: Math.ceil(num1 * 0.105) * 10,
      scaleMin: Math.floor(num2 * 0.095) * 10,
    };
  },
  formatLinear: function (data, x = 0, y = 0, x2 = 1, y2 = 1) {
    const count = data.length - 1,
      colorStops = data.map((item, index) => ({ offset: Math.round((index / count) * 100) / 100, color: item }));
    return { type: 'linear', x, y, x2, y2, colorStops, globalCoord: false };
  },

  formatRadarValue: function (data, rate = 1) {
    return data.map(item => item.value * rate);
  },

  formatNumber: function (data = {}) {
    const items = Object.entries(data);
    return items.reduce((total, [key, val]) => (total = Object.assign(total, { [key]: isNaN(Number(val)) ? val : Number(val) })), {});
  },

  formatLinears: function (x = 0, y = 0, x2 = 1, y2 = 1, colorStops) {
    return { type: 'linear', x, y, x2, y2, colorStops, globalCoord: false };
  },

  formatLattice: function (count = 8, space = 2, color = 'rgba(229, 159, 98, 0.1)', rotation = { x: 0, y: 0, x2: 1, y2: 0.3 }) {
    const step = 1 / count,
      gaps = Math.round((step / 10) * 1000) / 1000,
      items = [];
    let start = 0,
      ending = 0;
    for (let index = 0; index < 8; index++) {
      start = Math.round(index * step * 1000) / 1000;
      ending = Math.round((index + 1) * step * 1000) / 1000;
      items.push(
        { offset: start, color },
        { offset: Math.round((ending - gaps) * 1000) / 1000, color },
        { offset: Math.round((ending - gaps) * 1000) / 1000, color: 'rgba(0,0,0,0)' },
        { offset: ending, color: 'rgba(0,0,0,0)' }
      );
    }

    items.push({ offset: ending, color }, { offset: 1, color });

    return { type: 'linear', ...rotation, colorStops: items, globalCoord: false };
  },

  /**
   * 图标tooltip文字
   * @param data 传入数据
   * @param params chart参数
   * @returns {string}
   */
  formatTooltip(params, data) {
    console.log(params);
    const temp = treePathInfo[1] || {};
    const { name, value, children, itemStyle } = params;

    if (children) {
      const items = children.map(item => htmlTemplates({ name: item.name, value: item.value, color: itemStyle.color, unit: data.unit }));
      return `${name}<br/>${items.join('')}`;
    } else {
      const html = htmlTemplates({ name, value, color: itemStyle.color, unit: data.unit });
      return `${temp.name}<br/>${html}`;
    }
  },

  solveTableStr,
  solveTableNum,
  getDanwei,
  solveTableStrDanwei,
  tableFormateMoney(val) {
    return solveTableStr(val, '万元');
  },
  tableFormateMoney1(val) {
    return solveTableStr(val, '万元', 0);
  },
  tableFormateMoney2(val) {
    return solveTableStr(val, '亿元');
  },
  tableFormateMoney3(val) {
    return solveTableStrDanwei(val, '亿元');
  },
  tableFormateMoney4(val) {
    return solveTableStr(val, '万元', 1);
  },
  tableFormateMoney5(val) {
    return solveTableStrDanwei(val, '万元', 0);
  },
  tableFormateRate(val) {
    return solveTableStr(val, '%');
  },
  tableFormateRate2(val) {
    return solveTableStrDanwei(val, '%');
  },
  tableFormateRate3(val) {
    return solveTableStrDanwei(val, '%', 0);
  },
  tableFormateArea(val) {
    return solveTableStr(val, 'm²');
  },
  tableFormateArea2(val) {
    return solveTableStrDanwei(val, 'm²');
  },
  tableFormateAreaPrice(val) {
    return solveTableStrDanwei(val, '元/m²');
  },
  tableFormateGeStr(val) {
    return solveTableStrDanwei(val, '个');
  },
  tableFormateGeStr2(val) {
    return solveTableStrDanwei(val, '个', 0);
  },
  tableFormateWanPing(val) {
    return solveTableStrDanwei(val, '万㎡', 0);
  },
  tableFormateHukou(val) {
    return solveTableStrDanwei(val, '户', 0);
  },
  getColorClass(val, reverse = false) {
    if (!val && val != 0) {
      return reverse ? 'downWarnning' : 'upGreenStatus'
    }
    const num = +val
    if (num >= 0) {
      return reverse ? 'downWarnning' : 'upGreenStatus'
    } else {
      return reverse ? 'upGreenStatus' : 'downWarnning'
    }
  }
};

// 处理成字符串不带单位
function solveTableStr(num, type, size) {
  // console.log('solveTableStr', num, type, size);
  if (!num || isNaN(Number(num))) {
    return '--';
  }
  if (num === '0' || num === 0 || num === '0.0' || num === '0.00') {
    return '0';
  }
  if (!size && size !== 0) {
    size = 2;
  }
  switch (type) {
    case '%':
      break;
    case '亿元':
      break;
    case '万元':
      break;
    case '元/m²':
      break;
    default:
      break;
  }
  let str = Number(num).toFixed(size || 0);
  let res = '';
  if (size > 0) {
    res = str.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  } else {
    const valueArray = str.toString().split('.');
    res = valueArray[0].replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
    res + '.' + valueArray[1];
  }
  // console.log('res:', res);
  return res;
}
// 处理成数字不带单位
function solveTableNum(num, type, size) {
  if (!num || isNaN(Number(num))) {
    return 0;
  }
  if (num === '0' || num === 0 || num === '0.0' || num === '0.00') {
    return 0;
  }
  if (!size && size !== 0) {
    size = 2;
  }
  switch (type) {
    case '%':
      break;
    case '亿元':
      break;
    case '万元':
      break;
    case '元/m²':
      break;
    default:
      break;
  }
  let str = Number(num).toFixed(size || 0);
  return str;
}
// 处理单位
function getDanwei(num, danwei) {
  return !num || isNaN(Number(num)) ? '' : danwei;
}

// 处理成字符串带单位
function solveTableStrDanwei(num, type, size) {
  return solveTableStr(num, type, size) + getDanwei(num, type, size);
}

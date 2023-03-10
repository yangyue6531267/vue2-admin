/**
 *
 * @param {*} data 需要格式化的数据
 * @param {*} init
 * @returns
 */
export function jsonParser(data, init = {}) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      return init;
    }
  } else {
    return data;
  }
}

export function jsonClone(data) {
  return JSON.parse(JSON.stringify(data));
}

//1. 归档项目
export function locationParser(value) {
  if (!value) return '';
  const list = value.split('?');
  const host = list[0];
  const hash = window.location.hash;
  const origin = window.location.origin;
  const route = encodeURIComponent(origin + '/' + hash);
  return `${host}?service=${route}`;
}

/**
 * 节流方法
 * @param {*} func 节流回调函数
 * @param {*} delay 间隔时间
 * @returns
 */
export function throttle(func, delay) {
  let previous = Date.now();

  return function (...args) {
    const context = this;
    const timestamp = Date.now();
    if (timestamp - previous > delay) {
      func.apply(context, args);
      previous = timestamp;
    }
  };
}

/**
 * 获取数据类型
 * @param {*} data
 * @returns
 */
export function fetchType(data) {
  const result = Object.prototype.toString.call(data);
  return result.slice(8, -1).toLocaleLowerCase(); // 获取类型字符串
}

export const isStr = data => typeof data === 'string'; // 是否为字符串
export const isNum = data => typeof data === 'number' && !isNaN(data); // 是否为数字
export const isArr = data => (Array.isArray ? Array.isArray(data) : fetchType(data) === 'array'); // 是否为数组
export const isObj = data => data && typeof data === 'object'; // 是否为对象(不包含null)
export const isDef = data => ['', null, undefined].indexOf(data) === -1; // 是否为定义值
export const isDOM = data => isObj(data) && data instanceof HTMLElement; // 是否为DOM对象
export const isBool = data => typeof data === 'boolean'; // 是否为布尔值
export const isFunc = data => isObj(data) && fetchType(data) === 'function'; // 是否为函数
export const isNull = data => data === null || data === undefined;
export const isUndef = data => ['', null, undefined].indexOf(data) > -1; // 是否为未定义值
export const isLikeNum = data => isNum(data) || (isDef(data) && isStr(data) && isNum(Number(data))); // 是否为类数字
export const isPlainObj = data => isObj(data) && fetchType(data) === 'object'; // 是否为原生数字
 /*判断客户端*/
 export const judgeClient = ()=> {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
      client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      client = 'Android';
    } else {
      client = 'PC';
    }
    return client;
}

/**
 * @description 判断浏览器当前状态是否允许启用全屏特性
 */
export function isFullscreenEnabled() {
  return !!(document.fullscreenEnabled || document.webkitFullScreenEnabled || document.mozFullScreenEnabled || document.msFullScreenEnabled);
}

/**
 * 进入全屏
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen
 * @param {EnhancedHTMLElement} [element=document.body] - 全屏目标元素，默认是 body
 * @param {FullscreenOptions} options - 全屏选项
 */
export async function enterFullscreen(element = document.body, options={}) {
  try {
      if (element.requestFullscreen) {
          await element.requestFullscreen(options)
      } else if (element.webkitRequestFullScreen) {
          await element.webkitRequestFullScreen()
      } else if (element.mozRequestFullScreen) {
          await element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen()
      } else {
          throw new Error('该浏览器不支持全屏API')
      }
  } catch (err) {
      console.error(err)
  }
}

export default {
  isStr,
  isNum,
  isArr,
  isObj,
  isDef,
  isDOM,
  isBool,
  isFunc,
  isNull,
  isUndef,
  throttle,
  jsonParser,
  judgeClient,
  isFullscreenEnabled
};

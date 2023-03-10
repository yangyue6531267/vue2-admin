// 获取类型字符串
function toStr(value) {
  const result = Object.prototype.toString.call(value);
  return result.slice(8, -1).toLocaleLowerCase(); // 获取类型字符串
}

export default class Tools {
  // 添加事件监听
  dispatchEvent(type, data) {
    const { isDef, isUndef } = this;
    if (isUndef(this._listeners)) return;
    const myEvent = {},
      listeners = this._listeners,
      listenerArray = listeners[type];

    if (isDef(listenerArray)) {
      const arrayCopy = listenerArray.slice(0);
      myEvent.target = this;
      myEvent.detail = data || {};
      arrayCopy.forEach(item => item.call(this, myEvent));
      myEvent.target = null;
    }
  }

  // 添加监听函数
  addEventListener(type, listener) {
    const { isUndef } = this;
    if (isUndef(this._listeners)) this._listeners = {};
    const listeners = this._listeners;
    if (isUndef(listeners[type])) listeners[type] = [];
    if (listeners[type].indexOf(listener) === -1) listeners[type].push(listener);
  }

  // 是否存在事件
  hasEventListener(type, listener) {
    const { isDef, isUndef } = this;
    if (isUndef(this._listeners)) return false;
    const listeners = this._listeners;
    return isDef(listeners[type]) && listeners[type].indexOf(listener) > -1;
  }

  // 移除监听事件
  removeEventListener(type, listener) {
    const { isDef, isUndef } = this;
    if (isUndef(this._listeners)) return;
    const listeners = this._listeners,
      listenerArray = listeners[type];
    if (isDef(listenerArray)) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) listenerArray.splice(index, 1);
    }
  }

  clearEventListener() {
    this._listeners = {};
  }

  isStr(value) {
    return typeof value === 'string'; // 检测是否为字符串
  }

  isNum(value) {
    return typeof value === 'number'; // 检测是否为字符串
  }

  isArr(value) {
    return Array.isArray ? Array.isArray(value) : toStr(value) === 'array'; // 检测是否为数组
  }

  isObj(value) {
    return typeof value === 'object' && toStr(value) === 'object'; // 检测是否为原生对象
  }

  isDef(value) {
    return ['', null, undefined].indexOf(value) === -1; // 检查值是否为定义的值
  }

  isDOM(value) {
    return toStr(value).indexOf('Element') > -1;
  }

  isBool(value) {
    return typeof value === 'boolean'; // 检测是否为字符串
  }

  isFunc(value) {
    return toStr(value) === 'function';
  }

  isUndef(value) {
    return ['', null, undefined].indexOf(value) > -1; // 检查值是否为定义的值
  }

  isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  }

  throttle(func, delay) {
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
   *
   * @param {*} json
   * @param {*} value
   * @returns
   */
  parser(json, value = null) {
    try {
      return JSON.parse(json);
    } catch (error) {
      console.log(error);
      return value;
    }
  }
}

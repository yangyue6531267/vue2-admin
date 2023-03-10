let websocket = null,
  websocketIsRetry = false,
  serverTimeoutObj = null;

// 指定数组删除
function defaultArrayRemove(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}

// eval
function evil(fn) {
  let Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
}

// 获取链接参数
function getParam(url) {
  let locate,
    baseUrl,
    query,
    obj = {},
    param;
  if (url) {
    let urlList = url.split('?');
    baseUrl = urlList[0];
    query = urlList[1];
  } else {
    locate = window.location;
    baseUrl = locate.origin + locate.pathname;
    query = locate.search.substr(1);
  }
  if (query) {
    param = query.split('&');
    for (let i = 0; i < param.length; i++) {
      param[i] = param[i].split('=');
      if (param[i][1]) obj[param[i][0]] = param[i][1];
    }
  }
  return {
    url: baseUrl,
    param: obj,
  };
}

// 获取浏览器类型
function getBrowserType(type) {
  let browserType = {
    isFirefox: false,
    isOpera: false,
    isChrome: false,
    isEdge: false,
    isSafari: false,
    isIE: false,
  };
  var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串

  if (userAgent.indexOf('Firefox') > -1) {
    browserType.isFirefox = true;
  } else if (userAgent.indexOf('Edge') > -1) {
    browserType.isEdge = true;
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browserType.isOpera = true;
  } else if (userAgent.indexOf('Chrome') > -1) {
    browserType.isChrome = true;
  } else if (userAgent.indexOf('Safari') > -1) {
    browserType.isSafari = true;
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
    browserType.isIE = true;
  }
  return type ? browserType[type] : browserType;
}

// 判断是否为number数字
function isNumberFn(obj) {
  return obj === +obj;
}

// 判断是否为string字符串
function isStringFn(obj) {
  return obj === obj + '';
}

// 判断是否为boolean布尔值
function isBooleanFn(obj) {
  return obj === !!obj;
}

// 判断是否为array数组
function isArrayFn(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}

// 判断是否为object对象
function isObjectFn(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') return true;
}

// 判断是否为空
// exclude 空值判断是否排除0，默认不排除
function isNullFn(value, exclude) {
  if (isNumberFn(value)) {
    if (exclude && value === 0) return true;
    return value;
  } else {
    return value;
  }
}

// 关闭长连接
function closeWebSocket() {
  if (websocket) websocket.close();
}

/*
 * 存放全局公用方法
 */
export default {
  // 获取url中指定参数
  getUrlParam(name) {
    let locate = getParam();
    if (locate.param[name]) return locate.param[name];
    return null;
  },
  // 改变url中指定参数
  changeUrlArg(url, name, value) {
    let pattern = name + '=([^&]*)',
      replaceText = name + '=' + value;
    return url.match(pattern)
      ? url.replace(evil('/(' + name + '=)([^&]*)/gi'), replaceText)
      : url.match('?')
      ? url + '&' + replaceText
      : url + '?' + replaceText;
  },
  // 删除url中指定参数
  delUrlParam(url, name) {
    let locate = getParam(url),
      newUrl,
      param;
    delete locate.param[name];
    param = JSON.stringify(locate.param).replace(/["{}]/g, '').replace(/[:]/g, '=').replace(/[,]/g, '&');
    newUrl = param ? locate.url + '?' + param : locate.url;
    return newUrl;
  },
  defaultArrayRemove,
  getParam,
  getBrowserType,
  isArrayFn,
  isNumberFn,
  isStringFn,
  isBooleanFn,
  isObjectFn,
  isNullFn,
  closeWebSocket,
};

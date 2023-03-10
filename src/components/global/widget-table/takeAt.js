export const takeType = data => Object.prototype.toString.call(data).slice(8, -1); // Get the current data type

export const isArr = data => takeType(data) === 'Array'; // Is value an array

export const isObj = data => takeType(data) === 'Object'; // Is the value an object

export const isStr = data => typeof data === 'string'; // Is the value an String

export const isNum = data => typeof data === 'number'; // Is the value an Number

export const isNull = data => [null, undefined].includes(data); // Is the value undefined

export const isUndef = data => ['', null, undefined].includes(data); // Is the value undefined

export const isLinkNum = data => typeof data === 'number' || /[+|-]*\d+(\.*\d*)$/.test(data);

export function toCamel(data = '') {
  const chars = data.includes('.') ? data.split('.').pop() : data;
  return chars.replace(/[^a-zA-Z]+[a-z]/gi, item => item.replace(/[^a-zA-Z]+/, '').toUpperCase());
}

/**
 * Object takes value by path
 * @param {any} source
 * @param {String} path
 * @param {any} value
 * @returns
 */
export default function (source, path, value = undefined) {
  let target = source;
  let handlePath = path;

  // 如果是数字则转换为字符串
  if (isNum(path)) handlePath = isNaN(path) ? '' : path.toString();

  // 如果路径不是字符串则返回默认值
  if (!isStr(handlePath)) return value;

  // 判断是不是对象或数组，如果都不是就返回目标对象
  if (!isObj(source) && !isArr(source)) return source;

  // 将路径格式转数组
  const routes = handlePath.replace(/(\[|\])/g, a => (a === '[' ? '.' : '')).split('.');

  // 返回取得的结果
  for (let i = 0, len = routes.length; i < len; i++) {
    const field = routes[i];
    if (isUndef(target[field])) return (target = value);
    target = target[field];
  }

  return target;
}

/**
 * 遍历数据添加key
 * @param target // 添加对象
 * @param key 添加的key名称
 * @param children // 子级路由名称
 * @returns {*}
 */

export function traverseTable(target, key = 'id', children = 'children') {
  if (Array.isArray(target)) {
    return target.map(item => {
      const result = item[children];

      item[key] = traverseTable.index++;
      if (result && result.length > 0) {
        item[children] = traverseTable(result, key, children);
      }
      return item;
    });
  } else {
    target[key] = traverseTable.index++;
    return target;
  }
}

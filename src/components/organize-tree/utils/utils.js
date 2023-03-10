/**
 * 扁平化树形结构
 * @param {*} target 遍历的目标对象
 * @param {*} children 遍历目标对象的子级属性名
 */
export function flattenedTree(target, children = 'children') {
  const results = [];
  const traverse = (target, callback) => {
    if (Array.isArray(target)) {
      target.forEach(item => traverse(item, callback));
    } else {
      callback(target);
      const items = target[children];
      if (items && items.length > 0) {
        items.forEach(item => traverse(item, callback));
      }
    }
  };

  traverse(target, item => results.push(item));
  return results;
}

/**
 * 匹配当前路径
 * @param {*} target 遍历的目标对象
 * @param {*} value 匹配的目标值
 * @returns
 */
export function findTargetedPath(target, value, prop = 'code') {
  const traverse = (target, value, prop) => {
    let items = [];
    if (Array.isArray(target)) {
      for (let index = 0, len = target.length; index < len; index++) {
        items = traverse(target[index], value, prop);
        if (items) break;
      }
      return items;
    }
    if (target[prop] === value) return [target];
    if (target.children && target.children.length > 0) {
      items = traverse(target.children, value, prop);
      items && items.unshift(target);
      return items;
    }

    return false;
  };

  return traverse(target, value, prop) || [];
}

/**
 * 查找当前位置以及之前位置的组织
 * @param {*} target 遍历的目标对象
 * @param {*} items 配置的路径
 * @returns
 */
export function traverseMatch(target, items) {
  let value = target.length === 1 ? target[0].children : target;
  let index = target.length === 1 ? 1 : 0;
  const count = items.length - 1;
  const result = [value];

  while (index < count) {
    const elem = items[index] || {};
    const temp = value.find(item => item.code === elem.code);
    if (temp && temp.children) {
      result.push(temp.children);
      value = temp.children;
    } else {
      value = [];
      break;
    }
    index++;
  }
  return result;
}

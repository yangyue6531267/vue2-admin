/**
 * 根据路由matched获取或有
 * @param {*} target
 * @param {*} items
 * @param {*} type
 * @returns
 */
export function traverseMatch(target, items, level = 2) {
  let index = 0;
  let value = target;
  const count = items.length > level ? level : items.length;
  while (index < level) {
    const elem = items[index] || {};
    const temp = value.find(item => item.name === elem.name);
    if (temp && temp.children) {
      value = temp.children.filter(item => !item.hidden);
    } else {
      value = [];
      break;
    }
    index++;
  }
  return value;
}

import { isPlainObj } from '@/utils/utils';

/**
 * 深度遍历目标获取唯一标识符
 * @param target 遍历对象
 * @param prop 标识符名称
 */
export function fetchUniqueSets(target, prop = 'id') {
  const sets = new Set();

  function traverseTarget(target, sets, prop = 'id') {
    if (Array.isArray(target)) {
      target.forEach(item => traverseTarget(item, sets, prop));
    } else if (isPlainObj(target)) {
      if (target.chidren && target.chidren.length > 0) traverseTarget(target.chidren, sets, prop);
      sets.add(target[prop]);
    } else {
      return null;
    }
  }

  traverseTarget(target, sets, prop);
  return sets;
}

/**
 * 筛选当前角色的路由
 * 如果当前路由的名称在集合中可以找到，则保留，找不到则不保留
 * @param sets 路由名称的集合
 * @param target 路由列表
 * @param callback 用于添加页面功能，比如增删改查按钮的权限 需要返回一个对象 { create: true, import: true }
 */
export function filterByUniqueSets(target, sets, prop = 'name') {
  if (Array.isArray(target)) {
    return target.filter(item => filterByUniqueSets(item, sets, prop));
  } else if (isPlainObj(target)) {
    const items = target.children;
    const value = target.meta && target.meta[prop];
    //if (target.hidden) return false;  去除前端隐藏路由
    if (/\/:/g.test(target.path)) return true; // 详情页直接通过
    if (!items || items.length === 0) return sets.has(value);
    const result = items.filter(item => filterByUniqueSets(item, sets, prop));
    if (result.length === 0) return false;
    target.children = result;
    target.redirect = result[0].path;
    return true;
  } else {
    return false;
  }
}

export function traverseOrganization(target) {
  if (!Array.isArray(target) && target.length === 0) return null;

  // 过滤单层只有一个数组
  if (target.length === 1) {
    const first = target[0];
    if (first.permission == 1) {
      return { item: first, list: target };
    } else {
      const children = first.children;
      const isProject = children.every(item => item.type == 1);
      if (isProject) {
        return { item: children[0], list: target };
      } else {
        return traverseOrganization(first.children);
      }
    }
  } else {
    const filters = target.filter(item => item.permission == 1);
    if (filters.length > 0) {
      return { item: filters[0], list: target };
    } else {
      const first = traverseFirstEnter(target);
      return { item: first, list: target };
    }
  }
}

function traverseFirstEnter(target) {
  if (Array.isArray(target)) {
    const item = target.find(item => item.permission === 1);
    if (item) return item;
    return traverseFirstEnter(target[0]);
  } else if (isPlainObj(target)) {
    if (target.permission === 1) return target;
    return traverseFirstEnter(target.children);
  }
}

import Cookies from 'js-cookie';
import Configs from '@@/web.config';
import { isDef, isUndef } from 'tri-view/src/utils/assert';

const tokenKey = `${Configs.prefix}_token`;
// const tokenPath = process.env.NODE_ENV === 'development' ? '/' : `/${Configs.outputDir}`;
const tokenPath = '/';

export default {
  // 获取token
  getToken: () => Cookies.get(tokenKey),

  // 设置token
  setToken: token => Cookies.set(tokenKey, token, { expires: 7, path: tokenPath }),

  // 移除token
  removeToken: () => Cookies.remove(tokenKey, { path: tokenPath }),

  // 获取本地内容
  getStorage: key => {
    if (isUndef(key)) return console.warning('storage的key不能为空');
    const attr = `${Configs.prefix}_${key}`;
    const storage = window.localStorage.getItem(attr);
    try {
      return JSON.parse(storage);
    } catch (error) {
      return null;
    }
  },

  // 设置本地内容
  setStorage: (key, data) => {
    if (isUndef(key)) return console.warning('storage的key不能为空');
    const attr = `${Configs.prefix}_${key}`;
    return window.localStorage.setItem(attr, JSON.stringify(data));
  },

  // 移除本地内容
  removeStorage: key => {
    if (isUndef(key)) return console.warning('storage的key不能为空');
    const attr = `${Configs.prefix}_${key}`;
    window.localStorage.removeItem(attr);
  },
};

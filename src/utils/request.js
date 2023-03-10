import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { Message, MessageBox } from 'element-ui';
import { isDef } from 'tri-view/src/utils/assert';
import storage from './storage';
import { locationParser } from './utils';
import dateFormatter from '@utils/timeFormatter';
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

const baseURL = process.env.VUE_APP_BASE_API || ''; // 基础路径
const invalidToken = [-999, 501, 502, 505, 504]; // 登陆失效code

// 接口调试
const PointError = ({ url, data, params }) => window.console.error({ url, params, data: data && JSON.parse(data) });

// 创建实例
const instance = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 50000, // 请求超时时间
  withCredentials: true,
});

// 错误扑捉
const catchError = error => {
  console.log('error:' + error); // for debug
  Message({ message: error.message, type: 'error', duration: 2 * 1000 });
  return Promise.reject(error);
};

// 请求拦截
instance.interceptors.request.use(config => {
  config.url = config.url
    // + '?&show_right_button=false&op_platform_service=hide_navigator&lark_nav_bgcolor=ff47957f&uid=15034444&token=NDgxYzMzOWRjMDdjM2ZjOWVhYWRhOWEwMzA4MzZlYjc=&timestamp=1676356832248&appId=cli_a3392d866bf8900d'
    // config.headers['Authorization'] = store.getters.token;
    config.headers.uid = '15034444';
    config.headers.token = 'NDgxYzMzOWRjMDdjM2ZjOWVhYWRhOWEwMzA4MzZlYjc=';
    config.headers.timestamp = '1676356832248';
    config.headers.appType = 'app';
    config.headers['Access-Control-Allow-Origin'] = '*';
    if (store.state.datetime && config.params) {
      config.params.date = dateFormatter('YYYY-MM-DD', new Date(store.state.datetime).getTime() + 24*60*60*1000); // 全局参数时间
    }
  return config;
}, catchError);

// 响应拦截
instance.interceptors.response.use(response => {
  const { data, headers } = response;
  const redirect = headers.redirect || '';

  // console.log(response);
  // debugger;
  if (redirect) {
    const route = locationParser(redirect);
    storage.setStorage('redirect', redirect);
    // storage.removeStorage('locate');
    window.location.href = redirect;
  } else {
    // 后端没有返回code，和程序沟通
    if (!data.code) return data;

    // 返回数据
    if (Number(data.code) === 0) return data && data.data;

    // 权限异常
    if (data.code === 'NO_ACCESS') {
      PointError(response.config);
      Message.error('没有请求接口权限！');
      return Promise.reject({ code: 403, msg: '没有请求接口权限！' });
    }

    return data;
  }
}, catchError);

export default instance;

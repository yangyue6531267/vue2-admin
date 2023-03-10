import request from './request';

const ContentTypes = {
  json: 'application/json;charset=UTF-8',
  form: 'application/x-www-form-urlencoded;charset=UTF-8',
  formData: 'multipart/form-data',
};

export default {
  /**
   * GET请求获取数据
   * @param {*} api 接口
   * @param {*} data 参数
   * @param {*} type 请求类型
   */
  get: (api, params = {}, type = 'json') => request({ url: api, params, method: 'GET', headers: { 'Content-Type': ContentTypes[type] } }),

  /**
   * POST请求提交数据
   * @param {*} api 接口
   * @param {*} data 数据
   * @param {*} type 请求类型
   */
  post: (api, body = {}, type = 'json') => request({ url: api, data: body, method: 'POST', headers: { 'Content-Type': ContentTypes[type] } }),

  /**
   * PUT请求更新数据
   * @param {*} api 接口
   * @param {*} data 数据
   * @param {*} type 请求类型
   */
  put: (api, body = {}, type = 'json') => request({ url: api, data: body, method: 'PUT', headers: { 'Content-Type': ContentTypes[type] } }),

  /**
   * PUT请求更新数据
   * @param {*} api 接口
   * @param {*} data 数据
   * @param {*} type 请求类型
   */
  patch: (api, body = {}, type = 'json') => request({ url: api, data: body, method: 'PATCH', headers: { 'Content-Type': ContentTypes[type] } }),

  /**
   * DELETE请求删除数据
   * @param {*} api 接口
   * @param {*} type 请求类型
   */
  delete: (api, type = 'json') => request({ url: api, method: 'DELETE', headers: { 'Content-Type': ContentTypes[type] } }),

  /**
   * POST请求导出数据
   * @param {*} api 接口
   * @param {*} data 参数
   * @param {*} type 请求类型
   */
  uploadblob: (api, data = {}) => request({ url: api, data: data, method: 'POST', responseType: 'blob' }),
};

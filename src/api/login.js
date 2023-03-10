import ajax from '@utils/ajax';

/**
 * 执行登陆操作时需要的接口
 * 登陆/权限/当前用户信息/验证码
 */
class Login {
  // 登陆操作
  async login(data) {
    return ajax.post(`/login`, data);
  }

  // 图形验证码
  async captcha(params) {
    return ajax.get(`/getCaptcha`, params);
  }

  // 当前用户信息
  async userInfo(params) {
    return ajax.get(`/userInfo`, params);
  }

  // 角色权限菜单
  async subOrgList(params) {
    return ajax.get(`/subOrgList`, params);
  }

  async loginSubOrgList(params) {
    return ajax.get(`/LoginSubOrgList`, params);
  }

  // 修改用户密码
  async modifyPassword(data) {
    return ajax.post(`/modifyPassword`, data);
  }

  // 组织架构
  async searchOrgAndProject(params) {
    return ajax.get(`/searchOrgAndProject`, params);
  }
}

export default new Login();

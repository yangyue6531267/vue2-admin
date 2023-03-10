/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-10-30 14:47:40
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-11-07 20:23:30
 * @FilePath: \杭州绿城\greentown-web\src\api\system.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ajax from '@utils/ajax';

export default {
  getByParamName: async params => await ajax.get('/system/config/getByParamName', params), // 配置信息
  getValueByParamName: async params => await ajax.get(`/system/config/get/${params.name}`, params), // 根据key获取系统value
};

/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-10-30 14:47:41
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-11-07 18:29:44
 * @FilePath: \杭州绿城\greentown-web\web.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导出内容
const env = process.env;
const mode = env.VUE_APP_BASE_ENV;
const isDev = ['development', 'testing'].indexOf(mode) > -1;
const publicPath = env.VUE_APP_PUBLIC_PATH;
const webConfigs = {
  development: { title: '运营门户' },
};
const scriptAssets = [
  `${publicPath}/static/lib/vue.min.js`,
  `${publicPath}/static/lib/vue-router.min.js`,
  `${publicPath}/static/lib/vuex.min.js`,
  `${publicPath}/static/lib/axios.min.js`,
  `${publicPath}/static/lib/element-ui.js`,
  `${publicPath}/static/lib/echarts.min.js`,
  `${publicPath}/static/lib/three.min.js`,
];

module.exports = {
  prefix: 'lvc', // 存储Token使用的字符串
  tagsView: true, // 显示tagsView
  uploadFile: '/api/admin/uploadFile', // 文件上传路径
  uploadImage: '/api/admin/uploadImg', // 图片上传路径
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    axios: 'axios',
    three: 'THREE',
    echarts: 'echarts',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
  },
  script: isDev ? [] : scriptAssets,
  styles: [`${publicPath}/static/font/iconfont.css`, `${publicPath}/static/theme/element.min.css`],
  ...webConfigs[mode],
  match: [
    { reg: /import\s+.+from\s+'.+'(;*)(\n|\r)*/gi, value: '' },
    { reg: /export default/gi, value: 'module.exports =' },
    { reg: /component:([^'@]*)'@([^')]*)'\)/gi, value: "filepath: '$2'" },
    { reg: /component:\s+(\w+)/gi, value: "component: '$1'" },
  ],
};

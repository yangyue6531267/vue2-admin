'use strict';

const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const defaultSettings = require('./web.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 代码打包分析插件
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 压缩代码插件
const { script, styles, externals } = defaultSettings;

// 站点的默认配置
const env = process.env;
const port = env.port || env.npm_config_port || 9528; // dev port
const isDev = ['development', 'testing'].indexOf(env.VUE_APP_BASE_ENV) > -1;
const proxyHttp = env.VUE_APP_BASE_URL;
const outputDir = env.VUE_APP_OUTPUT_DIR;
const publicPath = env.VUE_APP_PUBLIC_PATH;
const websiteTitle = defaultSettings.title || '运营门户'; // page title
console.log(isDev);

module.exports = {
  publicPath: publicPath,
  outputDir: outputDir,
  assetsDir: 'static',
  lintOnSave: isDev,
  productionSourceMap: false,
  devServer: {
    hot: true,
    // host: '199.20.94.34',
    port: port,
    open: true,
    inline: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/region': {
        target: proxyHttp, // 后台接口
        ws: false, // 如果要代理websockets
        changeOrigin: true, // 将选项changeOrigin设置true为基于名称的虚拟托管站点。
      },
      '/': {
        target: proxyHttp, // 后台接口
        ws: false, // 如果要代理websockets
        changeOrigin: true, // 将选项changeOrigin设置true为基于名称的虚拟托管站点。
      },
      '/mock': {
        target: 'http://localhost:3000', // 后台接口
        ws: false, // 如果要代理websockets
        changeOrigin: true, // 将选项changeOrigin设置true为基于名称的虚拟托管站点。
      },
    },
  },

  configureWebpack: config => {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config['name'] = websiteTitle;
    config['externals'] = isDev ? {} : externals;
    config['performance'] = { maxEntrypointSize: 10000000, maxAssetSize: 30000000 };
    const plugins = [];
    if (!isDev) {
      // 代码压缩 以及
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8,
        }),
        new BundleAnalyzerPlugin()
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = websiteTitle;
      args[0].cdn = { css: styles, js: script };
      return args;
    });

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@views', resolve('src/views'))
      .set('@utils', resolve('src/utils'))
      .set('@assets', resolve('src/assets'))
      .set('@router', resolve('src/router'))
      .set('@components', resolve('src/components'))
      .set('@@', resolve('./'));
  },
  css: {
    loaderOptions: {
      // 用于全局模块导入scss变量
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      sass: {
        prependData: '@import "~@/assets/scss/index.scss";', //
      },
    },
  },
};

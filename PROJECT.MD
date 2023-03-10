#### 目录结构

├─**doc** 组件文档目录
├─**public** 公共目录
│ │ **favicon.ico** 站点 ico
│ │ **index.html** 站点入口
│ └─**static**
│ │ **building.json** 调试模型用的 json。接口接入后就没用了
│ ├─**font** 阿里图标字体库
│ ├─**lib** 组件库 js
│ └─**theme** element 样式和字体
├─**src**
│ │─**App.vue Vue** 框架入口模版
│ │─**main.js Vue** 框架入口文件
│ │─**permission.js** 权限处理文件
│ ├─**api** 站点接口目录
│ ├─**assets** 本地资源目录
│ │ ├─**images** 本地静态图片
│ │ ├─**scss**
│ │ │ │ **index.scss** 用于全局引用，在 vue.config.js 中配置
│ │ │ │ **style.scss** 全局样式，在 main.js 中引入
│ │ │ ├─**utils** 公共模块样式目录
│ │ │ │─**variable**
│ │ │ │ **mixins.scss** 全局样式混入
│ │ │ │ **variable.scss** 全局样式变量
│ │ ├─**temp** 废弃暂时保留的内容。后期可以删除
│ ├─**components** 公共组件目录
│ │ ├─**global** 全局公共组件
│ │ │ │ **index.js** 组件导出
│ │ │ ├─**widget-badge** 角标组件
│ │ │ ├─**widget-card** 卡片组件（弃用）
│ │ │ ├─**widget-chart** 图表组件
│ │ │ ├─**widget-collapse** 折叠面板组件
│ │ │ ├─**widget-frame** 板块框架组件
│ │ │ ├─**widget-growth** 同比增长组件（弃用，使用**widget-than**替代）
│ │ │ ├─**widget-layer** 整屏弹出层组件
│ │ │ ├─**widget-pane** 带有背景花瓣的模块（弃用）
│ │ │ ├─**widget-picker** 选择弹出层
│ │ │ ├─**widget-ranking** 排行组件
│ │ │ ├─**widget-table** 表格组件
│ │ │ ├─**widget-tabs** 切换标签组件
│ │ │ ├─**widget-than** 同比增长组件
│ │ │ └─**widget-title** 标题组件（弃用）
│ │ ├─**matrix** 3D 模型组件库
│ │ │ **index.js** 主要模型方法
│ │ │ **tools.js** 工具方法（事件派发）
│ │ │ **utils.js** 工具方法（基本判断）
│ │ ├─**organize-tree** 组织树弹窗
│ │ ├─**reminder-block** 403/404 页面组件
│ │ ├─**sketch-view** 销售分布图组件
│ │ └─**widget** 废弃组件
│ ├─**echarts** echarts 配置目录
│ ├─**layout** 项目布局框架
│ │ │ **redirect.vue** 三级跳转
│ │ │ **viewer.vue** 项目布局框架
│ │ │ **AppNavbar.vue** 顶部导航组件
│ │ │ **AppTabbar.vue** 底部 tab 组件
│ │ │ **AppTopnav.vue** 顶部 tab 组件
│ │ │ **DatePicker.vue** 日期选择组件
│ │ │ **MenuTable.vue** 菜单选择组件
│ ├─**mixins** 全局混入
│ ├─**router** 项目路由配置（tab 菜单和菜单表都是根据路由来筛选的）
│ ├─**store** 全局存储库
│ ├─**utils**
│ │ ├─**ajax.js** 请求封装
│ │ ├─**request.js** 请求封装
│ │ ├─**common.js**
│ │ ├─**components.js** 外部组件引入及公共方法
│ │ ├─**filter.js**
│ │ ├─**format.js**
│ │ ├─**location.js** 本次存储的封装
│ │ ├─**permission.js** 权限使用的递归方法
│ │ ├─**storage.js**
│ │ ├─**timeFormatter.js** 时间格式化方法
│ │ ├─**traverse.js** 根据路由 matched 获取或有
│ │ ├─**utils.js** 工具函数
│ │ ├─**watermark.js** 水印方法
│ └─**views**
│ ├─ **403.vue** 没有权限页面
│ ├─ **404.vue** not found 页面
│ ├─**project** 项目概况
│ │ └─**overview** 项目概况
│ │ │ ├─**index** 项目概览
│ │ │ ├─**engage** 经营情况
│ │ │ ├─**maps** 销售分布图
│ │ └ └─**progress** 项目进度/现金流
│ │ ├─**meeting** 会议管理
│ │ │ ├─**decision** 关键节点
│ │ │ ├─**nodes** 决议明细
│ │ └ └─**resolution** 经营策划决策点跟踪
│ │ ├─**operation** 运营管理
│ │ │ ├─**payment** 合同回款
│ │ │ ├─**structure** 货值结构
│ │ │ ├─**clinch** 成交客户
│ │ │ ├─**long-stock** 长库存
│ │ │ ├─**progress** 楼栋进度货值表
│ │ │ ├─**quality** 产品品质
│ │ │ ├─**satisfaction** 客户满意度
│ │ │ ├─**expense** 成本招采
│ │ └ └─**supply-sale** 供销存
│ │ ├─**finance** 财务管理
│ │ │ ├─**profit** 净利润/现金流
│ │ │ ├─**gross-profit** 销售毛利润率
│ │ │ ├─**financing** 融资
│ │ │ ├─**tax-refund** 退税
│ │ │ ├─**situation** 资金情况
│ │ │ ├─**excitation** 超额激励
│ │ └ └─**twofee** 两费
│ │ ├─**organize** 组织管理
│ │ │ ├─**information** 公司信息
│ │ │ └─**structure** 组织架构
│ └─**region**
│ │ ├─**calendar** 运营年历
│ │ ├─**detail** 详情目录
│ │ │ ├─**abnormal.vue** 异常项目个数详情
│ │ │ ├─**forewarn.vue** 运营风险详情
│ │ └ └─**quote.vue** 指标预警详情
│ │ ├─**invest**
│ │ │ ├─**cashed** 投资兑现度
│ │ │ ├─**detail** 投资项目明细
│ │ │ ├─**land-market** 土地市场
│ │ └ └─**overview** 投资概览
│ │ ├─**operation** 运营管理
│ │ │ ├─**efficiency** 效率专项
│ │ │ ├─**marketing** 营销专项
│ │ └ └─**monetary** 货值专项
│ │ ├─**finance** 财务管理
│ │ │ ├─**overview** 财务概览
│ │ │ ├─**gross-profit** 销售毛利润率
│ │ │ ├─**profit** 利润
│ │ │ ├─**roic** ROIC
│ │ │ ├─**funds** 资金
│ │ └ └─**twofee** 两费
│ │ ├─**overview** 区域概况
│ │ │ ├─**manage** 管理事项
│ │ │ ├─**operate** 经营概况
│ │ │ ├─**panoramic** 全景经营兑现
│ │ └ └─**quota** 年度指标
│ │ ├─**ranking** 排行榜
│ │ │ ├─**area** 区域排名
│ │ │ │─**invest** 投资排名
│ │ │ ├─**finance** 财务排名
│ └ └ └─**operation** 运营排名
└─**tests** 单元测试
│ **.browserslistrc**
│ **.env.development** 开发环境
│ **.env.production** 生成环境
│ **.env.staging** 暂时弃用
│ **.env.testing** 测试显示环境数据
│ **.eslintignore** 代码规范
│ **.eslintrc.js** 代码规范
│ **.gitignore** 代码提交规范
│ **.prettierignore** 代码格式化规范
│ **.prettierrc** 代码格式化规范
│ **babel.config.js**
│ **cypress.json**
│ **gulpfile.js**
│ **jsconfig.json**
│ **package.json**
│ **README.md**
│ **vue.config.js** 打包和开发配置
│ **web.config.js** 站点信息配置和静态 CDN 资源配置
│ **yarn.lock**

#### 角标组件

```javascript
<widget-badge type="primary|danger|warning" :value="23" />
```

![](./assets/widget-badge.png)

#### 图表组件

```javascript
<chart class="chart" :items="options" />
```

![](./assets/chart.png)

##### 板块框架组件

```javascript
<widget-frame more="more|full" title="项目整体进度">
  内容
</widget-frame>
// url: { type: String, default: '' }, // 更多的跳转路径
// more: { type: String, default: '' }, // 右侧内容,
// title: { type: String, default: '' }, // 标题名称
// extra: { type: String, default: '' }, // 附加内容，如单位，提示
// value: { type: [Number, String], default: 0 }, // tabs的默认值
// options: { type: Array, default: () => [] }, // 如果options的length大于0,显示下拉
// bodyClass: { type: String, default: '' }, // 内容区域的class
// bodyStyle: { type: [String, Object], default: '' }, // 内容区域的style
// eventName: { type: String, default: 'more' }, // more图标的触发时间名称
// border: { type: Boolean, default: true }, // 内容底部分割先
```

![](./assets/widget-frame1.png)
![](./assets/widget-frame2.png)
![](./assets/widget-frame3.png)
![](./assets/widget-frame4.png)

#### 表格组件

```javascript
 <widget-table :data="tableData" :columns="tableColumn" :head-style="headStyle" :cell-style="cellStyle" />
  props: {
    data: { type: Array, default: () => [] }, // 异步加载数据
    props: { type: Object, default: () => ({ children: 'children', hasChildren: 'hasChildren' }) }, // 表格树结构属性设置
    border: { type: Boolean, default: true }, // 表格边框线
    stripe: { type: Boolean, default: false }, // 表格斑马线
    expand: { type: Boolean, default: false }, //默认是否全部展开
    rowKey: { type: String, default: 'id' }, // 表格的唯一key属性名
    columns: { type: Array, default: () => [] }, // 表格列属性
    columns:{subLabel:表头分两行显示},
    headAlign:{type: Object} 头部样式
    rowStyle: { type: [Object, Function], default: () => ({}) }, // 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    headStyle: { type: [Object, Function], default: () => ({}) }, // 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    cellStyle: { type: [Object, Function], default: () => ({}) }, // 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    sortProps: { type: Object, default: () => ({}) }, // 排序
    sortExclude: { type: String, default: '' }, // first 和 last未实现
  },
```

```javascript
 // column属性
  props: {
    type: { type: String, default: 'slot|null' }, // 单元格类型slot,或者为空
    prop: { type: String, default: '' }, // 单元格属性名
    label: { type: String, default: '' }, // 表格列标题名称
    value: { type: String, default: '' }, // 单个哥默认值
    slot: { type: String, default: '' }, // 单元格类型slot是插槽名称
    align: { type: String , default: 'left' }, // 单元格对齐方式
    width: { type:[ String,number], default: '' }, // 单元格宽度
    minWidth: { type: [ String,number], default: '' }, // 单元格最小宽度
    fixed: { type:Boolean, default:  false }, // 是否固定
    sortable: { type: Boolean, default: false }, //
    overflow: { type: Boolean, default: true }, // 排序
  },
```

![](./assets/table.png)

#### 同比小组件

```javascript
   <widget-than arrow="up" />
   <widget-than arrow="up" type="primary" unit="套" />
   <widget-than arrow="down" type="danger" unit="套" />
   <widget-than arrow="down" type="warning" text="环比" value="12" />
    props: {
    type: { type: String, default: 'success' }, // 显示类型
    text: { type: String, default: '同比' }, // 文字
    unit: { type: String, default: '%' }, // 单位
    arrow: { type: String, default: 'up' }, // 向上up|想想down
    value: { type: [String, Number], default: '-' }, // 数值
  },
```

![](./assets/than.png)

#### 排名小组件

```javascript
  <widget-ranking value="3/52" />

  props: {
    icon: { type: String, default: 'lvfont-crown' }, // 图标
    text: { type: String, default: '' }, // 文字
    value: { type: [String, Number], default: '-' }, // 数值
  },
```

![](./assets/ranking.png)

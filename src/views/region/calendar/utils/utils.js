/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-12-05 10:26:42
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-01-14 19:30:55
 * @FilePath: \杭州绿城\greentown-wap\src\views\region\calendar\utils\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const getDays = (obj, num) => (obj.setDate(32), num - obj.getDate());
export const setHeader = (color, background) => [
  { prop: 'planDate', label: '计划完成时间', minWidth: 110 },
  { prop: 'function', label: '职能', minWidth: 80, type: 'tag', color: '#68697e', background: '#f2f2f2' },
  { prop: 'clazz1', label: '一级类别', minWidth: 110, type: 'tag', color: color, background: background },
  { prop: 'clazz2', label: '二级类别', minWidth: 100 },
  { prop: 'project', label: '所属项目', minWidth: 100 },
  { prop: 'content', label: '工作内容', minWidth: 100 },
  { prop: 'dueUser', label: '责任条线/责任人', minWidth: 110 },
  { prop: 'actualDate', label: '实际完成时间', minWidth: 110 },
  { prop: 'remark', label: '备注' },
  { prop: 'reportUser', label: '填报人', minWidth: 100 },
  { prop: 'completionText', label: '实际完成情况', minWidth: 140, type: 'slot', slot: 'completionTextslot' },
];

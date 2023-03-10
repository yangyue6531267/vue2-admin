/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-11-16 21:11:25
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-22 18:18:53
 * @FilePath: \杭州绿城\greentown-wap\src\components\matrix\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 浏览器打开全屏
export function requestFullScreen(element) {
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  return requestMethod && requestMethod.call(element);
}

// 浏览器退出全屏
export function exitFullScreen(element) {
  var exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen;
  return exitMethod && exitMethod.call(element);
}

// 图表全屏
export function ChartFullScreen(id) {
  if (id) {
    let element = document.getElementById(id);
    element.style.transform = 'rotate(90deg)';
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    return requestMethod && requestMethod.call(element);
  }
}

// 图表退出全屏
export function exitChartFullScreen(id) {
  if (id) {
    let element = document.getElementById(id);
    element.style.transform = '';
    var exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen;
    return exitMethod && exitMethod.call(element);
  }
}

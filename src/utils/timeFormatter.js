
/*
 * 时间格式化工具
 * @params {string} format
 * @params {string} datetime
 */

dateFormatter.formatter = num => (isNaN(num) ? '' : num < 10 ? `0${num}` : num.toString());

export default function dateFormatter(format = 'YYYY-MM-DD hh:mm:ss', date = '') {
  const target = new Date(date); // 时间构造
  const content = target.toString(); // 时间字符串
  const weeksZh = ['日', '一', '二', '三', '四', '五', '六'];
  const weeksEn = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fir', 'Sat'];
  const datetime = content.includes('Invalid') ? new Date(new Date().getTime() - 24*60*60*1000) : target; // 无效日期时取当前时间

  const week = datetime.getDay();
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const dates = datetime.getDate();
  const hours = datetime.getHours();
  const minute = datetime.getMinutes();
  const second = datetime.getSeconds();
  const instance = {
    Y: year,
    M: month,
    D: dates,
    W: weeksZh[week],
    h: hours,
    m: minute,
    s: second,
    w: weeksEn[week],
  };
  return format.replace(/(Y|M|D|h|m|s|W|w)+/gi, (val, key) => {
    const data = instance[key];
    const count = val.length;
    if (data === null || data === undefined) return '';
    if (key === 'Y') return String(data).slice(-count);
    return count > 1 ? dateFormatter.formatter(Number(data)) : String(data);
  });
}

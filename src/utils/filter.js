import moment from 'moment';

export default {
  timeFormat(date, arg) {
    const time = date || new Date();
    const param = arg || 'YYYY-MM-DD hh:mm:ss';
    return moment(time).format(param);
  },

  numFormat(date, arg) {
    return parseInt(date).toLocaleString();
  },

  listFilter(list, match, key, value) {
    let result = '';
    list.forEach((item, index) => {
      if (item[key] === match) {
        result = item[value];
      }
    });
    return result;
  },
};

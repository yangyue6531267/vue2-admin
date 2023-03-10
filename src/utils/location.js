// 获取链接参数
function URLParser(url = '') {
  const temp = {};
  let [query, search, baseURL] = [[], '', ''];

  if (url) {
    const data = url.split('?');
    search = data[1];
    baseURL = data[0];
  } else {
    const location = window.location;
    baseURL = location.origin + location.pathname;
    search = location.search.substr(1);
  }

  if (!Boolean(search)) return { url: baseURL, query: {} };

  query = search.split(/\s*&\s*/);
  for (let index = 0; index < query.length; index++) {
    const item = query[index].split(/\s*=\s*/);
    temp[item[0]] = item[1] || '';
  }
  return { url: baseURL, query: temp };
}

export default {
  takeUrlParam(name) {
    const locate = URLParser();
    return locate.query[name] || null;
  },
};

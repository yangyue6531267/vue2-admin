export const system = [
  {
    route: '/system/config/getByParamName[?]paramName=.*?',
    type: 'get',
    res: {"code":"0","data":{"id":6,"paramName":"货值概览范围","paramValue":"{\"hlbzbsfw\":\"2.0~3.0\",\"gxbfw\":\"12~18\",\"cxbfw\":\"3.0~6.0\"}","paraYear":2022,"paraMonth":null,"descript":"货量保障倍数范围, 供销比范围, 存销比范围","paramYearMonth":null}}
  },
  {
    route: '/system/config/getByParamName*',
    type: 'get',
    res:{"code":"0","data":{"id":3,"paramName":"滚动预算最新版","paramValue":"GD202301","paraYear":2023,"paraMonth":1,"descript":"用来配置滚动预算版本号，针对ys_ai2_ydgd这个表的rwbh字段","paramYearMonth":"202301"}}
  }
]
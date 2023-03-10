/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-10-30 14:47:40
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2022-12-07 11:46:18
 * @FilePath: \杭州绿城\greentown-web\src\api\project.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ajax from '@utils/ajax';

export default {
  // 项目概况
  buildingInfos: async params => await ajax.post('/project/overview/phybldDetailIndex', params), // 模型弹窗数据
  projectBasicInfo: async params => await ajax.get('/project/overview/projectBasicInfo', params), // 项目基本信息
  projectBuildingInfo: async params => await ajax.get('/project/overview/projectBuildingInfo', params), // 模型弹窗数据
  blueprintLayoutInfo: async params => await ajax.get('/project/overview/blueprintLayoutInfo', params), // 项目基本信息
  roomRecordsProjectInfo: async params => await ajax.get('/project/overview/roomRecordsProjectInfo', params), // 项目基本信息
  annualIndicatorsComplete: async params => await ajax.get('/project/overview/annualIndicatorsComplete', params), // 项目基本信息
  projectBusinessSituation: async params => await ajax.get('/project/overview/projectBusinessSituation', params), // 项目经营情况
  comparisonCoreIndicators: async params => await ajax.get('/project/overview/comparisonOfCoreIndicators', params), // 项目经营情况
  projectProgress: async params => await ajax.get('/project/overview/projectProgress', params), // 项目整体进度

  // 组织管理
  projectCompanyInformation: async params => await ajax.get('/project/organizationalManagement/projectCompanyInformation', params), // 项目公司信息
  organizationalStructure: async params => await ajax.get('/project/organizationalManagement/organizationalStructure', params), // 项目公司信息

  // 财务管理
  cashFlow: async params => await ajax.get('/project/financialManagement/cashFlow', params), // 现金流
  drawback: async params => await ajax.get('/project/financialManagement/drawback', params), // 退税
  netProfit: async params => await ajax.get('/project/financialManagement/netProfit', params), // 净利润
  twoFeeRate: async params => await ajax.get('/project/financialManagement/twoFeeRate', params), // 两费费率
  financialStructure: async params => await ajax.get('/project/financialManagement/financialStructure', params), // 融资结构
  financialStatus: async params => await ajax.get('/project/financialManagement/financialStatus', params), // 资金情况
  overfulfilIncentives: async params => await ajax.get('/project/financialManagement/overfulfilIncentives', params), // 超额激励
  grossProfitMarginOfSales: async params => await ajax.get('/project/financialManagement/grossProfitMarginOfSales', params), // 超额激励
  // bigTaxRebate: async params => await ajax.get('/project/financialManagement/bigTaxRebate', params), // 大额退税

  // 项目-运营管理
  salesReceipt: params => ajax.get('/project/operationManagement/salesReceipt', params), // 销售回款指标
  costOperation: params => ajax.get('/project/operationManagement/costOperation', params), // 成本招采
  sssAnalysis: params => ajax.get('/project/operationManagement/sssAnalysis', params), // 供销存分析
  houseDistribution: params => ajax.get('/project/operationManagement/houseDistribution', params), // 供销存--户型分析
  flowRateAnalysis: params => ajax.get('/project/operationManagement/flowRateAnalysis', params), // 流速分析
  valueStructure: params => ajax.get('/project/operationManagement/valueStructure', params), // 货值结构
  buildingProgress: async params => await ajax.get('/project/operationManagement/buildingProgress', params), // 楼栋工程进度&可售货值
  longInventoryAnalysis: async params => await ajax.get('/project/operationManagement/longInventoryAnalysis', params), // 长库存分析
};

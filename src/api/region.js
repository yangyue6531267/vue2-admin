/*
 * @Author: 刘雪亮 745375757@qq.com
 * @Date: 2022-10-30 14:47:40
 * @LastEditors: 刘雪亮 745375757@qq.com
 * @LastEditTime: 2023-02-07 11:45:21
 * @FilePath: \杭州绿城\greentown-web\src\api\region.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ajax from '@utils/ajax';

export default {
  salesIndicators: async params => await ajax.get('/region/overview/salesIndicators', params), // 年度指标-销售指标
  nodeAchievement: async params => await ajax.get('/region/overview/nodeAchievement', params), // 年度指标-节点达成
  yearIndexOverview: async params => await ajax.get('/region/overview/yearIndexOverview', params), // 年度指标-年度指标汇总
  financeIndicators: async params => await ajax.get('/region/overview/financeIndicators', params), // 年度指标-财务指标
  investmentIndicators: async params => await ajax.get('/region/overview/investmentIndicators', params), // 年度指标-投资指标
  overview: async params => await ajax.get('/region/overview/overview', params), // 经营概况-基本信息
  citySummary: async params => await ajax.get('/region/overview/citySummary', params), // 经营概况-地图城市汇总
  projectInfoMap: async params => await ajax.get('/region/overview/projectInfoMap', params), // 经营概况-地图项目信息
  projectInfoConfusedQuery: async params => await ajax.get('/region/overview/projectInfoConfusedQuery', params), // 经营概况-地图模糊查询
  overallView: async params => await ajax.get('/region/overview/overallView', params), // 全景经营兑现

  // 区域-运营年历
  issues: async params => await ajax.get('/region/operationCalendar/issues', params), // 日历详细数据列表
  calendar: async params => await ajax.get('/region/operationCalendar/calendar', params), // 日历详细数据列表
  functions: async params => await ajax.get('/region/operationCalendar/functions', params), // 日历详细数据列表

  // 区域-投资管理
  projectAnalysis: params => ajax.get('/region/investManage/projectAnalysis', params), // 年度投资项目分析
  investmentDetail: params => ajax.get('/region/investManage/newInvestmentProjectDetail', params), // 投资项目明细
  urbanLandMarket: params => ajax.get('/region/investManage/urbanLandMarket', params), // 城市土地市场
  redemptionAnalysis: params => ajax.get('/region/investManage/redemptionAnalysis', params), // 投资兑现度分析

  // 区域-运营管理
  contractSales: params => ajax.get('/region/operationManage/contractSales', params), // 合同销售
  detoxificationRate: params => ajax.get('/region/operationManage/detoxificationRate', params), // 去化率
  salesPayback: params => ajax.get('/region/operationManage/salesPayback', params), // 销售回款
  paybackRate: params => ajax.get('/region/operationManage/paybackRate', params), // 回款率
  receivables: params => ajax.get('/region/operationManage/receivables', params), // 应收款回款
  valueTotalInfo: params => ajax.get('/region/operationManage/valueTotalInfo', params), // 货值整体
  stockAnalysis: params => ajax.get('/region/operationManage/stockAnalysis', params), // 库存分析
  sellValueStructure: params => ajax.get('/region/operationManage/sellValueStructure', params), // 可售货值结构
  valueCash: params => ajax.get('/region/operationManage/valueCash', params), // 货值兑现
  supplySellMatch: params => ajax.get('/region/operationManage/supplySellMatch', params), // 供销匹配
  nodeReached: params => ajax.get('/region/operationManage/nodeReached', params), // 供销匹配
  nodeOverview: params => ajax.get('/region/operationManage/nodeOverview', params), // 供销匹配
  operationalAnalysis: params => ajax.get('/region/operationManage/operationalAnalysis', params), // 运营效率分析

  //区域-财务管理
  financeManage: params => ajax.get('/region/financialManage/financialManagement', params), //财务概况
  financeRoic: params => ajax.get('/region/financialManage/roic', params), //roic
  financeNetProfit: params => ajax.get(' /region/financialManage/netProfit', params), //净利润
  netProfitAttributableToParent: params => ajax.get(' /region/financialManage/netProfitAttributableToParent', params), //归母利润
  twoFeeRate: params => ajax.get('/region/financialManage/twoFeeRate', params), //两费
  managementFee: params => ajax.get('/region/financialManage/managementFee', params), //管理费
  marketingFee: params => ajax.get('/region/financialManage/marketingFee', params), //营销费
  grossProfitMarginOfSales: params => ajax.get('/region/financialManage/grossProfitMarginOfSales', params), //销售毛利润
  moneySituation: params => ajax.get('/region/financialManage/moneySituation', params), //资金概览
  fundSituation: params => ajax.get(' /region/financialManage/fundSituation', params), //资金情况


  // 节点弹窗
  startWork: params => ajax.get(' /region/operationManage/startWork', params), //资金情况
  planApproval: params => ajax.get(' /region/operationManage/planApproval', params), //资金情况
  constructionCert: params => ajax.get(' /region/operationManage/constructionCert', params), //资金情况
  preSaleCert: params => ajax.get(' /region/operationManage/preSaleCert', params), //资金情况
  firstStart: params => ajax.get(' /region/operationManage/firstStart', params), //资金情况
  knotTop: params => ajax.get(' /region/operationManage/knotTop', params), //资金情况
  invested: params => ajax.get(' /region/operationManage/invested', params), //资金情况
  cashFlow: params => ajax.get(' /region/operationManage/cashFlow', params), //资金情况
  yearComplete: params => ajax.get(' /region/operationManage/yearComplete', params), //资金情况
  deliver: params => ajax.get(' /region/operationManage/deliver', params), //资金情况

  // 排行榜
  overallRanking: params => ajax.get('/region/ranking/overallRanking', params), //区域排名
  valueOfInvestment: params => ajax.get('/region/ranking/valueOfInvestment', params), //投资排名-投资货值
  equityInvestment: params => ajax.get('/region/ranking/equityInvestment', params), //投资排名-权益投资额
  netRrofitAttributableToGreentown: params => ajax.get('/region/ranking/netRrofitAttributableToGreentown', params), //投资排名-归属绿城方净利润
  netProfitRate: params => ajax.get('/region/ranking/netProfitRate', params), //投资排名-净利润率
  investmentCash: params => ajax.get('/region/ranking/investmentCash', params), //投资排名-投资兑现度
  returnedNetProfitCashingDegree: params => ajax.get('/region/ranking/returnedNetProfitCashingDegree', params), //全景经营兑现达成-归母净利润兑现度
  netProfitMargin: params => ajax.get('/region/ranking/netProfitMargin', params), //全景经营兑现达成-净利润率
  netProfitMarginDeviationValue: params => ajax.get('/region/ranking/netProfitMarginDeviationValue', params), //全景经营兑现达成-净利润率偏差值
  contractCompletionRate: params => ajax.get('/region/ranking/contractCompletionRate', params), //销售回款-合同完成率(累计指标)
  paymentCollectionCompletionRate: params => ajax.get('/region/ranking/paymentCollectionCompletionRate', params), //销售回款-回款完成率(累计指标)
  comprehensiveRemovalRate: params => ajax.get('/region/ranking/comprehensiveRemovalRate', params), //销售回款-综合去化率
  beginningLongInventoryRemovalRate: params => ajax.get('/region/ranking/beginningLongInventoryRemovalRate', params), //销售回款-期初长库存去化率
  incrementalLongInventoryRemovalRate: params => ajax.get('/region/ranking/incrementalLongInventoryRemovalRate', params), //销售回款-增量长库存去化率
  combinedRepaymentRate: params => ajax.get('/region/ranking/combinedRepaymentRate', params), //销售回款-综合回款率
  receivable: params => ajax.get('/region/ranking/receivable', params), //销售回款-应收款
  lateReceivable: params => ajax.get('/region/ranking/lateReceivable', params), //销售回款-逾期应收款
  unsignedAmount: params => ajax.get('/region/ranking/unsignedAmount', params), //销售回款-未网签金额【黑榜】
  incompleteAmount: params => ajax.get('/region/ranking/incompleteAmount', params), //销售回款-未齐件金额【黑榜】
  saleableValue: params => ajax.get('/region/ranking/saleableValue', params), //货值结构-可售货值
  valueOfUnstartedGoods: params => ajax.get('/region/ranking/valueOfUnstartedGoods', params), //货值结构-未开工货值
  valueOfGoodsInTransit: params => ajax.get('/region/ranking/valueOfGoodsInTransit', params), //货值结构-在途货值
  inventoryValue: params => ajax.get('/region/ranking/inventoryValue', params), //货值结构-库存货值
  longStockValue: params => ajax.get('/region/ranking/longStockValue', params), //货值结构-长库存货值
  valueOfParkingSpace: params => ajax.get('/region/ranking/valueOfParkingSpace', params), //货值结构-车位货值
  commercialValue: params => ajax.get('/region/ranking/commercialValue', params), //货值结构-商业货值
  storageRoomValue: params => ajax.get('/region/ranking/storageRoomValue', params), //货值结构-储藏室货值
  rankingValueCash: params => ajax.get('/region/ranking/valueCash', params), //货值结构-货值兑现度
  averagePriceCashing: params => ajax.get('/region/ranking/averagePriceCashing', params), //货值结构-均价兑现度
  velocityCashingDegree: params => ajax.get('/region/ranking/velocityCashingDegree', params), //货值结构-流速兑现度
  onTimePlanApproval: params => ajax.get('/region/ranking/onTimePlanApproval', params), //运营效率-按时达成率-方案批复
  onTimeConstructionCertificate: params => ajax.get('/region/ranking/onTimeConstructionCertificate', params), //运营效率-按时达成率-施工证
  onTimePresalePermit: params => ajax.get('/region/ranking/onTimePresalePermit', params), //运营效率-按时达成率-预售证
  onTimeFirstOpen: params => ajax.get('/region/ranking/onTimeFirstOpen', params), //运营效率-按时达成率-首开
  onTimeKnotTop: params => ajax.get('/region/ranking/onTimeKnotTop', params), //运营效率-按时达成率-结顶
  onTimeShareholderCorrection: params => ajax.get('/region/ranking/onTimeShareholderCorrection', params), //运营效率-按时达成率-股东回正
  onTimeOperatingCashFlowBackPositive: params => ajax.get('/region/ranking/onTimeOperatingCashFlowBackPositive', params), //运营效率-按时达成率-经营性现金流回正
  onTimeCompletionAndPreparation: params => ajax.get('/region/ranking/onTimeCompletionAndPreparation', params), //运营效率-按时达成率-竣备
  onTimeDelivery: params => ajax.get('/region/ranking/onTimeDelivery', params), //运营效率-按时达成率-交付
  yearPlanApproval: params => ajax.get('/region/ranking/yearPlanApproval', params), //运营效率-年度完成率-方案批复
  yearConstructionCertificate: params => ajax.get('/region/ranking/yearConstructionCertificate', params), //运营效率-年度完成率-施工证
  yearPresalePermit: params => ajax.get('/region/ranking/yearPresalePermit', params), //运营效率-年度完成率-预售证
  yearFirstOpen: params => ajax.get('/region/ranking/yearFirstOpen', params), //运营效率-年度完成率-首开
  yearKnotTop: params => ajax.get('/region/ranking/yearKnotTop', params), //运营效率-年度完成率-结顶
  yearShareholderCorrection: params => ajax.get('/region/ranking/yearShareholderCorrection', params), //运营效率-年度完成率-股东回正
  yearOperatingCashFlowBackPositive: params => ajax.get('/region/ranking/yearOperatingCashFlowBackPositive', params), //运营效率-年度完成率-经营性现金流回正
  yearCompletionAndPreparation: params => ajax.get('/region/ranking/yearCompletionAndPreparation', params), //运营效率-年度完成率-竣备
  yearDelivery: params => ajax.get('/region/ranking/yearDelivery', params), //运营效率-年度完成率-交付
  totalConstructionCostCashing: params => ajax.get('/region/ranking/totalConstructionCostCashing', params), //产品管理-总建造成本兑现度
  marketingExpenses: params => ajax.get('/region/ranking/marketingExpenses', params), //财务管理-营销费额完成率
  manageExpenses: params => ajax.get('/region/ranking/manageExpenses', params), //财务管理-管理费额完成率
  salesSupervisionFunds: params => ajax.get('/region/ranking/salesSupervisionFunds', params), //财务管理-销售监管资金
  operatingCashFlow: params => ajax.get('/region/ranking/operatingCashFlow', params), //财务管理-1-n月经营性现金流净额
  appropriationShareholdersFunds: params => ajax.get('/region/ranking/appropriationShareholdersFunds', params), //财务管理-股东资金占用
};

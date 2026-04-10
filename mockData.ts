import { Position, Account, TradeRecord, ReviewRecord, TomorrowPlan, MarketEnvironment } from './types';

// 模拟持仓数据
export const mockPositions: Position[] = [
  {
    code: '002445',
    name: '中南文化',
    quantity: 2100,
    cost: 4.125,
    currentPrice: 4.28,
    profit: 325.50,
    profitPercent: 3.76,
    status: '持有',
    rs: 72,
    maBias: 2.1,
    sector: '传媒',
  },
  {
    code: '000677',
    name: '恒天海龙',
    quantity: 1000,
    cost: 5.005,
    currentPrice: 4.85,
    profit: -155.00,
    profitPercent: -3.10,
    status: '止损',
    rs: 45,
    maBias: -5.2,
    sector: '军工',
  },
  {
    code: '002414',
    name: '高德红外',
    quantity: 500,
    cost: 15.729,
    currentPrice: 16.20,
    profit: 235.50,
    profitPercent: 2.99,
    status: '持有',
    rs: 68,
    maBias: 1.8,
    sector: '电子',
  },
  {
    code: '000759',
    name: '兴化股份',
    quantity: 1100,
    cost: 4.947,
    currentPrice: 4.72,
    profit: -249.70,
    profitPercent: -4.60,
    status: '止损',
    rs: 38,
    maBias: -6.5,
    sector: '化工',
  },
  {
    code: '603527',
    name: '瑞斯康达',
    quantity: 700,
    cost: 15.078,
    currentPrice: 14.65,
    profit: -299.60,
    profitPercent: -2.83,
    status: '持有',
    rs: 52,
    maBias: -1.2,
    sector: '通信',
  },
];

// 模拟账户数据
export const mockAccount: Account = {
  totalAssets: 28541.90,
  cumulativeProfit: -1243.30,
  todayProfit: -43.30,
  positionAmount: 24341.90,
  availableCash: 4200.00,
  positionCount: 5,
};

// 模拟操作记录
export const mockTradeRecords: TradeRecord[] = [
  {
    time: '2026-04-10 09:31',
    code: '002445',
    name: '中南文化',
    action: '买入',
    price: 4.15,
    quantity: 2100,
    reason: '突破MA20，量价齐升',
  },
  {
    time: '2026-04-10 10:15',
    code: '000677',
    name: '恒天海龙',
    action: '卖出',
    price: 4.92,
    quantity: 1000,
    reason: '跌破支撑位，触发止损',
  },
  {
    time: '2026-04-10 14:20',
    code: '000759',
    name: '兴化股份',
    action: '卖出',
    price: 4.75,
    quantity: 1100,
    reason: '走势不及预期，止损离场',
  },
];

// 模拟反省记录
export const mockReviewRecords: ReviewRecord[] = [
  {
    id: '1',
    date: '2026-04-10',
    errorType: '追高',
    description: '早盘追高买入中南文化，买入点位偏高',
    improvement: '等待回调企稳后再入场，不要追涨',
  },
  {
    id: '2',
    date: '2026-04-10',
    errorType: '不止损',
    description: '兴化股份跌破成本后抱有幻想，未及时止损',
    improvement: '设定固定止损线(比如-5%)，严格执行',
  },
];

// 模拟明日计划
export const mockTomorrowPlans: TomorrowPlan[] = [
  {
    id: '1',
    date: '2026-04-11',
    task: '开盘前检查外围市场',
    status: 'pending',
  },
  {
    id: '2',
    date: '2026-04-11',
    task: '扫描涨停板和强势股',
    status: 'pending',
  },
  {
    id: '3',
    date: '2026-04-11',
    task: '检查持仓股公告和消息',
    stockCode: '002445',
    action: '观望',
    condition: '无重大利空则持有',
    status: 'pending',
  },
  {
    id: '4',
    date: '2026-04-11',
    task: '关注化工板块走势',
    stockCode: '000759',
    action: '观望',
    condition: '企稳后可考虑接回',
    status: 'pending',
  },
];

// 模拟大盘环境
export const mockMarketEnvironment: MarketEnvironment = {
  date: '2026-04-10',
  indices: [
    { name: '上证指数', code: '000001.SH', price: 3245.67, change: -12.34, changePercent: -0.38 },
    { name: '深证成指', code: '399001.SZ', price: 10856.89, change: -45.67, changePercent: -0.42 },
    { name: '创业板指', code: '399006.SZ', price: 2156.78, change: -23.45, changePercent: -1.08 },
  ],
  hotSectors: ['AI应用', '机器人', '低空经济'],
  winnerSectors: ['旅游酒店', '酿酒', '银行'],
  loserSectors: ['光伏', '锂电', '军工'],
  sentiment: {
    limitUp: 42,
    limitDown: 8,
    turnover: 8234,
    marketFeel: '中性',
  },
};

// 月度目标
export const monthlyTarget = {
  target: 5000,  // 月度目标盈利
  current: -1243.30,  // 当前完成
};

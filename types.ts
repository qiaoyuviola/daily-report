// 持仓数据类型
export interface Position {
  code: string;           // 股票代码
  name: string;           // 股票名称
  quantity: number;       // 持仓数量
  cost: number;           // 成本价
  currentPrice: number;   // 当前价
  profit: number;         // 盈亏金额
  profitPercent: number;  // 盈亏比例
  status: '持有' | '止损' | '加仓';  // 持仓状态
  rs: number;             // 相对强度
  maBias: number;         // MA偏离度
  sector: string;         // 所属板块
}

// 账户数据类型
export interface Account {
  totalAssets: number;      // 总资产
  cumulativeProfit: number; // 累计盈利
  todayProfit: number;      // 今日盈亏
  positionAmount: number;   // 持仓金额
  availableCash: number;    // 可用资金
  positionCount: number;    // 持仓数量
}

// 操作记录类型
export interface TradeRecord {
  time: string;
  code: string;
  name: string;
  action: '买入' | '卖出';
  price: number;
  quantity: number;
  reason?: string;
}

// 反省记录类型
export interface ReviewRecord {
  id: string;
  date: string;
  errorType: '追高' | '杀跌' | '不止损' | '乱加仓' | '踏空' | '其他';
  description: string;
  improvement: string;
}

// 明日计划类型
export interface TomorrowPlan {
  id: string;
  date: string;
  task: string;
  stockCode?: string;
  action?: '买入' | '卖出' | '观望';
  condition?: string;
  status: 'pending' | 'done' | 'cancelled';
}

// 大盘环境类型
export interface MarketEnvironment {
  date: string;
  indices: {
    name: string;
    code: string;
    price: number;
    change: number;
    changePercent: number;
  }[];
  hotSectors: string[];      // 热门板块
  winnerSectors: string[];   // 受益方向
  loserSectors: string[];    // 受损方向
  sentiment: {
    limitUp: number;         // 涨停数
    limitDown: number;       // 跌停数
    turnover: number;        // 成交量(亿)
    marketFeel: '亢奋' | '乐观' | '中性' | '谨慎' | '恐慌';
  };
}

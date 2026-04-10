// 妙想API工具函数
const MX_APIKEY = process.env.MX_APIKEY || '';

const BASE_URL = 'https://api.mxapi.cn';

interface FetchOptions {
  method?: 'GET' | 'POST';
  body?: object;
}

async function mxFetch(endpoint: string, options: FetchOptions = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'X-API-KEY': MX_APIKEY,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`MX API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// 获取股票实时行情
export async function getStockQuote(code: string) {
  // code格式: 000001 或 000001.SZ
  const normalizedCode = code.includes('.') ? code : `${code}.SZ`;
  return mxFetch('/v1/quote', {
    method: 'POST',
    body: { symbol: normalizedCode },
  });
}

// 批量获取股票行情
export async function getBatchQuotes(codes: string[]) {
  return mxFetch('/v1/quote/batch', {
    method: 'POST',
    body: { symbols: codes },
  });
}

// 获取大盘指数
export async function getIndexQuote(code: string) {
  return mxFetch('/v1/quote', {
    method: 'POST',
    body: { symbol: code },
  });
}

// 获取板块行情
export async function getSectorQuote(sectorCode: string) {
  return mxFetch('/v1/sector/quote', {
    method: 'POST',
    body: { sector: sectorCode },
  });
}

// 获取资金流向
export async function getMoneyFlow(code: string) {
  return mxFetch('/v1/moneyflow', {
    method: 'POST',
    body: { symbol: code },
  });
}

// 获取个股资金流向
export async function getStockMoneyFlow(code: string) {
  const normalizedCode = code.includes('.') ? code : `${code}.SZ`;
  return mxFetch('/v1/stock/moneyflow', {
    method: 'POST',
    body: { symbol: normalizedCode },
  });
}

// 获取涨停板信息
export async function getLimitUp() {
  return mxFetch('/v1/limitup', { method: 'POST' });
}

// 获取跌停板信息
export async function getLimitDown() {
  return mxFetch('/v1/limitdown', { method: 'POST' });
}

// 获取今日板块涨跌
export async function getSectorRank() {
  return mxFetch('/v1/sector/rank', { method: 'POST' });
}

// 测试API连接
export async function testConnection() {
  return mxFetch('/v1/ping', { method: 'POST' });
}

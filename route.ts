import { NextResponse } from 'next/server';

const MX_APIKEY = process.env.MX_APIKEY || 'mkt_SuWZ-l260yuI436P0KMSUt0FLezBQzvhjkhBbH9vo-8';
const BASE_URL = 'https://mkapi2.dfcfs.com/finskillshub/api/claw/query';

// 持仓数据配置
const POSITIONS = [
  { code: '000617', name: '中油资本', quantity: 1200, cost: 10.16, sector: '多元金融' },
  { code: '000066', name: '中国长城', quantity: 800, cost: 15.117, sector: '计算机' },
  { code: '000601', name: '韶能股份', quantity: 1400, cost: 6.439, sector: '电力' },
  { code: '002202', name: '金风科技', quantity: 300, cost: 24.448, sector: '风电' },
  { code: '002342', name: '巨力索具', quantity: 700, cost: 15.798, sector: '机械' },
];

async function getStockPrice(code: string): Promise<number | null> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': MX_APIKEY,
      },
      body: JSON.stringify({ toolQuery: `${code}最新价` }),
    });
    
    const data = await response.json();
    const tables = data?.data?.data?.searchDataResultDTO?.dataTableDTOList || [];
    
    for (const table of tables) {
      const tableData = table?.table || {};
      for (const [key, values] of Object.entries(tableData)) {
        if (key !== 'headName' && Array.isArray(values) && values[0]) {
          const price = parseFloat(values[0].toString().replace('元', ''));
          if (!isNaN(price)) return price;
        }
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${code}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    // 获取所有股票价格
    const prices = await Promise.all(
      POSITIONS.map(async (pos) => {
        const currentPrice = await getStockPrice(pos.code);
        return {
          ...pos,
          currentPrice: currentPrice || pos.cost,
          profit: currentPrice ? (currentPrice - pos.cost) * pos.quantity : 0,
          profitPercent: currentPrice ? ((currentPrice - pos.cost) / pos.cost * 100) : 0,
        };
      })
    );
    
    // 计算汇总数据
    const totalCost = prices.reduce((sum, p) => sum + p.cost * p.quantity, 0);
    const totalValue = prices.reduce((sum, p) => sum + (p.currentPrice * p.quantity), 0);
    const totalProfit = totalValue - totalCost;
    
    return NextResponse.json({
      positions: prices,
      summary: {
        totalCost,
        totalValue,
        totalProfit,
        profitPercent: (totalProfit / totalCost) * 100,
        positionCount: prices.length,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

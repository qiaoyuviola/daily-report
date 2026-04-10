'use client';

import { useState, useEffect } from 'react';

interface Position {
  code: string;
  name: string;
  quantity: number;
  cost: number;
  currentPrice: number;
  profit: number;
  profitPercent: number;
  sector: string;
}

interface Summary {
  totalCost: number;
  totalValue: number;
  totalProfit: number;
  profitPercent: number;
  positionCount: number;
}

export default function Dashboard() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setError(null);
      const res = await fetch('/api/positions');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPositions(data.positions);
      setSummary(data.summary);
      setLastUpdate(new Date(data.updatedAt));
    } catch (err) {
      setError('获取数据失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // 每30秒刷新一次
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const target = 5000;
  const current = summary?.totalProfit || 0;
  const progress = Math.min((current / target) * 100, 100);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
          <h1 className="text-2xl font-bold">📊 每日收盘报告</h1>
          <div className="text-gray-400 text-sm">
            最后更新: {lastUpdate?.toLocaleTimeString('zh-CN') || '-'}
          </div>
        </div>

        {/* 目标进度 */}
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">📊 本月目标进度</h2>
            <span className={`text-xl font-bold ${current >= 0 ? 'profit' : 'loss'}`}>
              {current.toFixed(2)} / {target} ({progress.toFixed(1)}%)
            </span>
          </div>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                current >= 0 
                  ? 'bg-gradient-to-r from-green-600 to-green-400' 
                  : 'bg-gradient-to-r from-red-600 to-red-400'
              }`}
              style={{ width: `${Math.abs(progress)}%` }}
            />
          </div>
        </div>

        {/* 指标卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="card">
            <div className="text-gray-400 text-sm mb-1">总资产</div>
            <div className="text-2xl font-bold">¥{(summary?.totalValue || 0).toLocaleString()}</div>
            <div className={`text-sm ${(summary?.totalProfit || 0) >= 0 ? 'profit' : 'loss'}`}>
              {(summary?.totalProfit || 0) >= 0 ? '↑' : '↓'} {Math.abs(summary?.totalProfit || 0).toFixed(2)}
            </div>
          </div>
          <div className="card">
            <div className="text-gray-400 text-sm mb-1">累计盈利</div>
            <div className={`text-2xl font-bold ${(summary?.totalProfit || 0) >= 0 ? 'profit' : 'loss'}`}>
              ¥{(summary?.totalProfit || 0).toFixed(2)}
            </div>
          </div>
          <div className="card">
            <div className="text-gray-400 text-sm mb-1">持仓金额</div>
            <div className="text-2xl font-bold">¥{(summary?.totalValue || 0).toLocaleString()}</div>
          </div>
          <div className="card">
            <div className="text-gray-400 text-sm mb-1">持仓数量</div>
            <div className="text-2xl font-bold">{summary?.positionCount || 0}</div>
          </div>
          <div className="card">
            <div className="text-gray-400 text-sm mb-1">成本总额</div>
            <div className="text-2xl font-bold">¥{(summary?.totalCost || 0).toLocaleString()}</div>
          </div>
          <div className="card">
            <div className="text-gray-400 text-sm mb-1">盈亏比例</div>
            <div className={`text-2xl font-bold ${(summary?.profitPercent || 0) >= 0 ? 'profit' : 'loss'}`}>
              {(summary?.profitPercent || 0).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* 持仓状态 */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold mb-4">📈 持仓状态</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-2 px-2 text-left">股票</th>
                  <th className="py-2 px-2 text-right">数量</th>
                  <th className="py-2 px-2 text-right">成本</th>
                  <th className="py-2 px-2 text-right">现价</th>
                  <th className="py-2 px-2 text-right">盈亏</th>
                  <th className="py-2 px-2 text-right">盈亏%</th>
                  <th className="py-2 px-2 text-center">状态</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos) => {
                  const isProfit = pos.profit >= 0;
                  return (
                    <tr key={pos.code} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-2">
                        <div className="font-medium">{pos.name}</div>
                        <div className="text-xs text-gray-400">{pos.code}</div>
                      </td>
                      <td className="py-3 px-2 text-right">{pos.quantity}</td>
                      <td className="py-3 px-2 text-right">{pos.cost.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right">{pos.currentPrice.toFixed(2)}</td>
                      <td className={`py-3 px-2 text-right ${isProfit ? 'profit' : 'loss'}`}>
                        {isProfit ? '+' : ''}{pos.profit.toFixed(2)}
                      </td>
                      <td className={`py-3 px-2 text-right ${isProfit ? 'profit' : 'loss'}`}>
                        {isProfit ? '+' : ''}{pos.profitPercent.toFixed(2)}%
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          pos.profitPercent >= 0 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {pos.profitPercent >= 0 ? '盈利' : '亏损'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 刷新按钮 */}
        <div className="text-center">
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            🔄 手动刷新数据
          </button>
        </div>
      </div>
    </div>
  );
}

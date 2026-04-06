import { useState } from 'react';
import { motion } from 'motion/react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const weeklyData = [
  { date: 'Mon', balance: 12500 },
  { date: 'Tue', balance: 15200 },
  { date: 'Wed', balance: 13800 },
  { date: 'Thu', balance: 16400 },
  { date: 'Fri', balance: 18900 },
  { date: 'Sat', balance: 17600 },
  { date: 'Sun', balance: 19200 },
];

const monthlyData = [
  { date: 'Jan', balance: 45000 },
  { date: 'Feb', balance: 52000 },
  { date: 'Mar', balance: 49000 },
  { date: 'Apr', balance: 61000 },
  { date: 'May', balance: 58000 },
  { date: 'Jun', balance: 67000 },
  { date: 'Jul', balance: 72000 },
  { date: 'Aug', balance: 69000 },
  { date: 'Sep', balance: 78000 },
  { date: 'Oct', balance: 84000 },
  { date: 'Nov', balance: 88000 },
  { date: 'Dec', balance: 95000 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{payload[0].payload.date}</p>
        <p className="text-gray-900 dark:text-white font-semibold text-lg">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function AnalyticsChart() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const data = period === 'weekly' ? weeklyData : monthlyData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-black/10 dark:border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Balance Overview</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Track your financial growth</p>
        </div>
        
        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl p-1">
          <button
            onClick={() => setPeriod('weekly')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                period === 'weekly'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }
            `}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                period === 'monthly'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }
            `}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="w-full h-80 min-h-[320px] min-w-[300px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" className="opacity-20 dark:opacity-50" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#colorBalance)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

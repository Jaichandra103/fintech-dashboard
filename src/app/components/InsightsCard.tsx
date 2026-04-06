import { useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export function InsightsCard() {
  const { transactions } = useDashboard();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const income = transactions.filter((t) => t.type === 'income');

    // Calculate total balance
    const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

    // Find highest spending category
    const categoryMap = new Map<string, number>();
    expenses.forEach((expense) => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + Math.abs(expense.amount));
    });
    const highestCategory = Array.from(categoryMap.entries()).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // Calculate monthly totals
    const thisMonth = new Date().getMonth();
    const thisMonthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === thisMonth
    );
    const thisMonthIncome = thisMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const thisMonthExpenses = Math.abs(
      thisMonthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return {
      totalBalance,
      highestCategory,
      thisMonthIncome,
      thisMonthExpenses,
      savingsRate: ((thisMonthIncome - thisMonthExpenses) / thisMonthIncome) * 100,
    };
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-black/10 dark:border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Quick Stats</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Key financial insights</p>

      <div className="space-y-4">
        {/* Total Balance */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Total Balance</span>
            <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${insights.totalBalance.toLocaleString()}
          </div>
        </div>

        {/* Savings Rate */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Savings Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {insights.savingsRate.toFixed(1)}%
          </div>
        </div>

        {/* Highest Spending */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Top Expense Category</span>
            <TrendingDown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {insights.highestCategory?.[0] || 'N/A'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ${insights.highestCategory?.[1]?.toLocaleString() || 0}
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/5 to-rose-500/5 dark:from-pink-500/10 dark:to-rose-500/10 border border-pink-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-sm">This Month</span>
            <AlertCircle className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Income</div>
              <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                +${insights.thisMonthIncome.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Expenses</div>
              <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                -${insights.thisMonthExpenses.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

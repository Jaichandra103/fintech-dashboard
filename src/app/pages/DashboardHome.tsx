import { useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { RoleBanner } from '../components/RoleBanner';
import { MetricCard } from '../components/MetricCard';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { ExpensePieChart } from '../components/ExpensePieChart';
import { InsightsCard } from '../components/InsightsCard';
import { TransactionsTable } from '../components/TransactionsTable';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';

export function DashboardHome() {
  const { transactions } = useDashboard();

  const metrics = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const profit = totalIncome - totalExpenses;
    const savings = profit * 0.3; // Assuming 30% savings rate

    return {
      revenue: { value: totalIncome, change: 12.5 },
      expenses: { value: totalExpenses, change: -8.3 },
      profit: { value: profit, change: 23.7 },
      savings: { value: savings, change: 15.2 },
    };
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Role Banner */}
      <div className="mb-8">
        <RoleBanner />
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Revenue"
          value={`$${metrics.revenue.value.toLocaleString()}`}
          change={metrics.revenue.change}
          icon={DollarSign}
          index={0}
        />
        <MetricCard
          title="Expenses"
          value={`$${metrics.expenses.value.toLocaleString()}`}
          change={metrics.expenses.change}
          icon={TrendingDown}
          index={1}
        />
        <MetricCard
          title="Profit"
          value={`$${metrics.profit.value.toLocaleString()}`}
          change={metrics.profit.change}
          icon={TrendingUp}
          index={2}
        />
        <MetricCard
          title="Savings"
          value={`$${metrics.savings.value.toLocaleString()}`}
          change={metrics.savings.change}
          icon={PiggyBank}
          index={3}
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <AnalyticsChart />
        </div>
        <div>
          <InsightsCard />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <TransactionsTable />
        </div>
        <div>
          <ExpensePieChart />
        </div>
      </div>
    </motion.div>
  );
}
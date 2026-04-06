import { motion } from 'motion/react';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { ExpensePieChart } from '../components/ExpensePieChart';

export function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6 mb-8">
        <AnalyticsChart />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="col-span-1">
          <ExpensePieChart />
        </div>
        <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cash Flow Insights</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Your revenue has steadily outpaced your expenses this quarter. We recommend reallocating a portion of the 30% surplus towards high-yield investment options or adding it to your primary reserve for maximum compound growth.
          </p>
          <div className="mt-6 flex flex-col space-y-4">
            <div className="p-4 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20">
              <div className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">Optimal Next Step</div>
              <div className="text-gray-900 dark:text-white mt-1">Diversify portfolio to real-estate indices.</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20">
              <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">Trend Alert</div>
              <div className="text-gray-900 dark:text-white mt-1">Operating expenses dropped by 8.3%.</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

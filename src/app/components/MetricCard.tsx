import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  index: number;
}

export function MetricCard({ title, value, change, icon: Icon, index }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative group"
    >
      <div className="relative rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-black/10 dark:border-white/10 p-6 overflow-hidden">
        {/* Gradient glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{title}</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-sm font-medium ${
                    isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {isPositive ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
        </div>
      </div>
    </motion.div>
  );
}

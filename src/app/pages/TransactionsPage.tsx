import { motion } from 'motion/react';
import { TransactionsTable } from '../components/TransactionsTable';

export function TransactionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-xl">
        <TransactionsTable />
      </div>
    </motion.div>
  );
}

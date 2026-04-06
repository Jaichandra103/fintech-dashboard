import { motion } from 'motion/react';
import { ShieldCheck, Eye, Info } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export function RoleBanner() {
  const { role } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 border border-indigo-500/20 p-4"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20">
          {role === 'admin' ? (
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-gray-900 dark:text-white font-semibold">
              {role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
            </h4>
            <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
              Active
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {role === 'admin' ? (
              <>
                You have full access to add, edit, and delete transactions. All features are
                enabled.
              </>
            ) : (
              <>
                You have read-only access. Switch to Admin mode to manage transactions.
              </>
            )}
          </p>
        </div>

        <Info className="w-4 h-4 text-gray-500 mt-1" />
      </div>
    </motion.div>
  );
}

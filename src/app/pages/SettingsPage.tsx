import { motion } from 'motion/react';
import { useDashboard } from '../context/DashboardContext';

export function SettingsPage() {
  const { role, setRole } = useDashboard();
  const isEditing = role === 'admin';

  const toggleRole = () => {
    setRole(isEditing ? 'viewer' : 'admin');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-8 mb-8 shadow-xl mt-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Access Control</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900 dark:text-white text-lg">Current Role</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Admin has full editing capabilities. Viewers can only consume data.</div>
          </div>
          <button
            onClick={toggleRole}
            className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium ${
              isEditing 
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                : 'bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isEditing ? 'Admin Active' : 'Viewer Active'}
          </button>
        </div>
      </div>

      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
        <div className="space-y-4">
          {['Email Alerts for Large Transactions', 'Weekly Summary Reports', 'Market Volatility Warnings'].map((pref, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5 last:border-0">
              <span className="text-gray-700 dark:text-gray-300">{pref}</span>
              <div className="w-12 h-6 bg-indigo-500 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-6 shadow-sm"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

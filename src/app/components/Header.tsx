import { Bell, Download, Plus, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { useDashboard } from '../context/DashboardContext';
import { useTheme } from '../context/ThemeContext';
import { useExportData } from '../hooks/useExportData';

interface HeaderProps {
  onAddTransaction: () => void;
}

export function Header({ onAddTransaction }: HeaderProps) {
  const { role, setRole } = useDashboard();
  const { theme, toggleTheme } = useTheme();
  const { exportToCSV } = useExportData();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/analytics': return 'Deep Analytics';
      case '/transactions': return 'Transactions History';
      case '/reports': return 'Automated Reports';
      case '/settings': return 'Platform Settings';
      case '/help': return 'Help Center';
      default: return 'Financial Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (location.pathname) {
      case '/analytics': return 'Comprehensive overview of your financial performance';
      case '/transactions': return 'View, sort, and manage all your historical cash flows';
      case '/reports': return 'Generate end-of-month financial statements and tax documents';
      case '/settings': return 'Configure your account, integrations, and preferences';
      case '/help': return 'Search our knowledge base or get in touch with our support team';
      default: return 'Welcome back! Here\'s your financial overview';
    }
  };

  return (
    <div className="h-20 flex items-center justify-between px-8 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {getPageTitle()}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {getPageSubtitle()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl p-1">
          <button
            onClick={() => setRole('admin')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                role === 'admin'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }
            `}
          >
            Admin
          </button>
          <button
            onClick={() => setRole('viewer')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                role === 'viewer'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }
            `}
          >
            Viewer
          </button>
        </div>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* Export Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToCSV}
          className="p-3 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all"
          title="Export Data"
        >
          <Download className="w-5 h-5" />
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </motion.button>

        {/* Add Transaction Button */}
        {role === 'admin' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddTransaction}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </motion.button>
        )}
      </div>
    </div>
  );
}

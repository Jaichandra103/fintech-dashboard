import { 
  LayoutDashboard, 
  TrendingUp, 
  CreditCard, 
  PieChart, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink } from 'react-router';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: PieChart, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 p-6 z-50">
      <div className="h-full rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-black/10 dark:border-white/10 p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <div>
              <div className="text-gray-900 dark:text-white font-semibold text-lg">Zorvyn</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Premium Suite</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `block relative rounded-xl ${isActive ? 'active-nav-link' : ''}`}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 relative group cursor-pointer
                    ${
                      isActive
                        ? 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-black/5 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/5'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-500/30"
                      style={{
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                      }}
                    />
                  )}
                  <item.icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-auto pt-6 border-t border-black/10 dark:border-white/10 cursor-pointer"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1">
              <div className="text-gray-900 dark:text-white text-sm font-medium">John Doe</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">john@zorvyn.com</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

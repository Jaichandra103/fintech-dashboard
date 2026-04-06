import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';

export function ReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-end mb-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-all">
          <Download className="w-4 h-4" />
          Export Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Q3 Earnings Report", date: "Sep 30, 2026", status: "Ready" },
          { title: "Monthly P&L", date: "Aug 31, 2026", status: "Ready" },
          { title: "Tax Estimates", date: "Jul 15, 2026", status: "Archived" },
        ].map((report, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${report.status === 'Ready' ? 'bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'}`}>
                {report.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{report.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{report.date}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

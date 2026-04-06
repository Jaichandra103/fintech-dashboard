import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ArrowUpDown, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDashboard } from '../context/DashboardContext';
import { EditTransactionModal } from './EditTransactionModal';
import { Transaction } from '../context/DashboardContext';

export function TransactionsTable() {
  const {
    transactions,
    role,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    deleteTransaction,
    updateTransaction,
  } = useDashboard();

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return ['all', ...Array.from(cats)];
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    if (filterCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'amount') {
        comparison = Math.abs(a.amount) - Math.abs(b.amount);
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, filterCategory, searchQuery, sortBy, sortOrder]);

  const handleSort = (field: 'date' | 'amount' | 'name') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (id: string) => {
    if (role === 'admin' && confirm('Are you sure you want to delete this transaction?')) {
      const transaction = transactions.find(t => t.id === id);
      deleteTransaction(id);

      if (transaction) {
        toast.success('Transaction deleted', {
          description: `${transaction.name} has been removed`,
        });
      }
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = (id: string, updates: Partial<Transaction>) => {
    updateTransaction(id, updates);
    toast.success('Transaction updated', {
      description: 'Changes have been saved successfully',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-3xl border border-black/10 dark:border-white/10 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Recent Transactions</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {filteredAndSortedTransactions.length} transactions found
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-10 pr-8 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left text-gray-500 dark:text-gray-400 text-sm font-medium pb-3 px-4">
                <button onClick={() => handleSort('name')} className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Name <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left text-gray-500 dark:text-gray-400 text-sm font-medium pb-3 px-4">
                <button onClick={() => handleSort('date')} className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Date <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-left text-gray-500 dark:text-gray-400 text-sm font-medium pb-3 px-4">
                Category
              </th>
              <th className="text-right text-gray-500 dark:text-gray-400 text-sm font-medium pb-3 px-4">
                <button onClick={() => handleSort('amount')} className="flex items-center gap-2 ml-auto hover:text-gray-900 dark:hover:text-white transition-colors">
                  Amount <ArrowUpDown className="w-4 h-4" />
                </button>
              </th>
              <th className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium pb-3 px-4">
                Status
              </th>
              {role === 'admin' && (
                <th className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium pb-3 px-4">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
              >
                <td className="py-4 px-4">
                  <div className="text-gray-900 dark:text-white font-medium">{transaction.name}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`font-semibold ${transaction.amount >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed'
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                      : transaction.status === 'pending'
                      ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      : 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                {role === 'admin' && (
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(transaction)} className="p-2 rounded-lg hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(transaction.id)} className="p-2 rounded-lg hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </div>

      {editingTransaction && (
        <EditTransactionModal
          isOpen={true}
          onClose={() => setEditingTransaction(null)}
          transaction={editingTransaction}
          onSave={handleSaveEdit}
        />
      )}
    </motion.div>
  );
}

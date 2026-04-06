import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'viewer';

export interface Transaction {
  id: string;
  name: string;
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'failed';
}

interface DashboardContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'date' | 'amount' | 'name';
  setSortBy: (sort: 'date' | 'amount' | 'name') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Salary Payment',
    date: '2026-04-01',
    category: 'Salary',
    amount: 8500,
    type: 'income',
    status: 'completed',
  },
  {
    id: '2',
    name: 'AWS Services',
    date: '2026-04-02',
    category: 'Infrastructure',
    amount: -450,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Client Project Alpha',
    date: '2026-04-03',
    category: 'Consulting',
    amount: 3200,
    type: 'income',
    status: 'completed',
  },
  {
    id: '4',
    name: 'Office Rent',
    date: '2026-04-01',
    category: 'Rent',
    amount: -2200,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '5',
    name: 'Software Licenses',
    date: '2026-04-04',
    category: 'Software',
    amount: -890,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '6',
    name: 'Freelance Design Work',
    date: '2026-04-05',
    category: 'Freelance',
    amount: 1500,
    type: 'income',
    status: 'pending',
  },
  {
    id: '7',
    name: 'Marketing Campaign',
    date: '2026-03-28',
    category: 'Marketing',
    amount: -680,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '8',
    name: 'Investment Returns',
    date: '2026-03-30',
    category: 'Investment',
    amount: 2400,
    type: 'income',
    status: 'completed',
  },
  {
    id: '9',
    name: 'Team Lunch',
    date: '2026-04-03',
    category: 'Food',
    amount: -145,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '10',
    name: 'Equipment Purchase',
    date: '2026-03-25',
    category: 'Equipment',
    amount: -3200,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '11',
    name: 'SaaS Subscription',
    date: '2026-04-01',
    category: 'Software',
    amount: -299,
    type: 'expense',
    status: 'completed',
  },
  {
    id: '12',
    name: 'Consulting Services',
    date: '2026-03-29',
    category: 'Consulting',
    amount: 4800,
    type: 'income',
    status: 'completed',
  },
];

const STORAGE_KEY = 'zorvyn_transactions';
const ROLE_STORAGE_KEY = 'zorvyn_user_role';

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    return (saved as UserRole) || 'admin';
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Persist role to localStorage
  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, [role]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DashboardContext.Provider
      value={{
        role,
        setRole,
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        filterCategory,
        setFilterCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
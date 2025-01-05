import { create } from 'zustand';
import type { GoldTransaction, GoldBalance } from '../types/gold';

interface GoldStore {
  balance: GoldBalance;
  transactions: GoldTransaction[];
  addTransaction: (transaction: GoldTransaction) => void;
  getTransactionsByType: (type: GoldTransaction['transactionType']) => GoldTransaction[];
}

export const useGoldStore = create<GoldStore>((set, get) => ({
  balance: {
    totalEarned: 0,
    currentBalance: 0
  },
  transactions: [],
  
  addTransaction: (transaction) => set(state => {
    const newBalance = {
      totalEarned: transaction.amount > 0 
        ? state.balance.totalEarned + transaction.amount 
        : state.balance.totalEarned,
      currentBalance: state.balance.currentBalance + transaction.amount
    };
    
    return {
      transactions: [transaction, ...state.transactions],
      balance: newBalance
    };
  }),
  
  getTransactionsByType: (type) => {
    return get().transactions.filter(t => t.transactionType === type);
  }
}));
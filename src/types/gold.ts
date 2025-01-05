export interface GoldTransaction {
  transactionId: string;
  userId: string;
  description: string;
  amount: number;
  timestamp: string;
  relatedObjectId?: string;
  transactionType: 'income' | 'expense' | 'transfer';
  nexusId?: string;
}

export interface GoldBalance {
  totalEarned: number;
  currentBalance: number;
}
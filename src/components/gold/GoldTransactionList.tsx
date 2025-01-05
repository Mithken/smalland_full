import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { GoldTransaction } from '../../types/gold';

interface GoldTransactionListProps {
  transactions: GoldTransaction[];
}

export function GoldTransactionList({ transactions }: GoldTransactionListProps) {
  const navigate = useNavigate();
  
  const handleClick = (transaction: GoldTransaction) => {
    if (!transaction.relatedObjectId) return;
    
    // Navigate based on transaction type
    if (transaction.nexusId) {
      navigate(`/nexus/${transaction.nexusId}`);
    } else {
      navigate(`/transactions/${transaction.relatedObjectId}`);
    }
  };
  
  return (
    <div className="max-h-96 overflow-y-auto p-6">
      {transactions.length === 0 ? (
        <div className="text-center text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map(transaction => (
            <button
              key={transaction.transactionId}
              onClick={() => handleClick(transaction)}
              className="w-full text-left p-4 rounded-lg hover:bg-gray-50 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium">{transaction.description}</div>
                <div className={`font-bold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(transaction.timestamp).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
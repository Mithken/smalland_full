import React, { useState } from 'react';
import { useGoldStore } from '../../store/goldStore';
import { GoldTransactionList } from './GoldTransactionList';
import type { GoldTransaction } from '../../types/gold';

interface GoldModalProps {
  onClose: () => void;
}

export function GoldModal({ onClose }: GoldModalProps) {
  const [activeType, setActiveType] = useState<GoldTransaction['transactionType']>('income');
  const { balance, getTransactionsByType } = useGoldStore();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Gold Balance</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm text-yellow-800">Total Gold Earned</div>
              <div className="text-2xl font-bold text-yellow-900">
                {balance.totalEarned}
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-indigo-800">Current Balance</div>
              <div className="text-2xl font-bold text-indigo-900">
                {balance.currentBalance}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {(['income', 'expense', 'transfer'] as const).map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeType === type
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <GoldTransactionList
          transactions={getTransactionsByType(activeType)}
        />
      </div>
    </div>
  );
}
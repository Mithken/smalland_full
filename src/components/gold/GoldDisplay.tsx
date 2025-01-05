import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { useGoldStore } from '../../store/goldStore';
import { GoldModal } from './GoldModal';
import { CurrencyDisplay } from '../currency/CurrencyDisplay';

export function GoldDisplay() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { balance } = useGoldStore();
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50"
      >
        <Coins className="w-5 h-5 text-yellow-600" />
        <div className="text-sm">
          <div className="font-medium">
            Total: <CurrencyDisplay amount={balance.totalEarned} />
          </div>
          <div className="text-gray-500">
            Current: <CurrencyDisplay amount={balance.currentBalance} />
          </div>
        </div>
      </button>
      
      {isModalOpen && (
        <GoldModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
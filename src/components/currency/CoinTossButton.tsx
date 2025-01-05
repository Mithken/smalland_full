import React from 'react';
import { Coins } from 'lucide-react';
import { useGoldStore } from '../../store/goldStore';
import { CURRENCY_RATIOS } from '../../utils/currency';

interface CoinTossButtonProps {
  objectId: string;
  objectType: 'story' | 'comment';
}

export function CoinTossButton({ objectId, objectType }: CoinTossButtonProps) {
  const addTransaction = useGoldStore(state => state.addTransaction);

  const handleToss = () => {
    // Add transaction for 1 copper
    addTransaction({
      transactionId: crypto.randomUUID(),
      userId: 'current-user', // Replace with actual user ID
      description: `Tossed a coin to ${objectType} #${objectId}`,
      amount: -1, // Deduct 1 copper
      timestamp: new Date().toISOString(),
      relatedObjectId: objectId,
      transactionType: 'expense'
    });
  };

  return (
    <button
      onClick={handleToss}
      className="flex items-center text-gray-500 hover:text-yellow-600"
    >
      <Coins className="w-4 h-4 mr-1" />
      <span>Toss coin</span>
    </button>
  );
}
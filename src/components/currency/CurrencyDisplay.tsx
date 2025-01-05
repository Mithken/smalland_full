import React from 'react';
import { formatCurrency, formatGoldDecimal } from '../../utils/currency';

interface CurrencyDisplayProps {
  amount: number;
  showDecimal?: boolean;
  showZeroes?: boolean;
}

export function CurrencyDisplay({ 
  amount, 
  showDecimal = false,
  showZeroes = false 
}: CurrencyDisplayProps) {
  return (
    <span className="font-medium">
      {showDecimal ? formatGoldDecimal(amount) : formatCurrency(amount, showZeroes)}
    </span>
  );
}
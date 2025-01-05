import React from 'react';
import { Coins, Castle } from 'lucide-react';
import { CurrencyDisplay } from '../currency/CurrencyDisplay';
import type { Nexus } from '../../types/nexus';

interface TreasuryPanelProps {
  nexus: Nexus;
}

export function TreasuryPanel({ nexus }: TreasuryPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Treasury</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <Coins className="w-6 h-6 text-yellow-600 mr-2" />
            <span className="font-medium">Available Funds</span>
          </div>
          <CurrencyDisplay amount={nexus.treasuryBalance} showDecimal />
        </div>

        <div>
          <h4 className="font-medium mb-3">Available Treasures</h4>
          <div className="grid grid-cols-2 gap-3">
            {/* This would be populated with actual treasures */}
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <Castle className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
              <span className="text-sm">Town Hall</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <Castle className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
              <span className="text-sm">Market</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Owned Treasures</h4>
          <div className="space-y-2">
            {/* This would be populated with owned treasures */}
            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <Castle className="w-5 h-5 text-indigo-600 mr-2" />
                <span>Guild Hall</span>
              </div>
              <span className="text-sm text-gray-500">Acquired 2d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { X, Lock, Check } from 'lucide-react';

interface TreasureItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  status: 'purchased' | 'available' | 'locked';
  requirements?: string[];
}

const SAMPLE_TREASURES: TreasureItem[] = [
  {
    id: '1',
    name: 'Town Hall',
    description: 'A central gathering place for community discussions',
    cost: 1000,
    status: 'purchased'
  },
  {
    id: '2',
    name: 'Market Square',
    description: 'Enable trading and commerce between community members',
    cost: 2500,
    status: 'purchased'
  },
  {
    id: '3',
    name: 'Guild Hall',
    description: 'Special meeting places for guild members',
    cost: 5000,
    status: 'purchased'
  },
  {
    id: '4',
    name: 'Community Garden',
    description: 'A place for growing ideas and collaboration',
    cost: 7500,
    status: 'available'
  },
  {
    id: '5',
    name: 'Grand Library',
    description: 'Archive and showcase community knowledge',
    cost: 10000,
    status: 'locked',
    requirements: [
      'Reach 1000 members',
      'Complete 50 projects',
      'Maintain 90% weekly activity'
    ]
  }
];

export function SampleTreasuryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Sample Community Treasury</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {SAMPLE_TREASURES.map(treasure => (
              <div
                key={treasure.id}
                className={`p-4 rounded-lg border ${
                  treasure.status === 'purchased'
                    ? 'bg-green-50 border-green-200'
                    : treasure.status === 'available'
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 flex items-center">
                      {treasure.name}
                      {treasure.status === 'purchased' && (
                        <Check className="w-4 h-4 text-green-500 ml-2" />
                      )}
                      {treasure.status === 'locked' && (
                        <Lock className="w-4 h-4 text-gray-400 ml-2" />
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {treasure.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {treasure.cost.toLocaleString()} Gold
                    </span>
                  </div>
                </div>

                {treasure.requirements && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Requirements:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {treasure.requirements.map((req, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end p-6 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
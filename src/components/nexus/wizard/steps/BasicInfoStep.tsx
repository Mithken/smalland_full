import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import type { NexusFormData } from '../types';
import { SimilarCommunityCard } from './SimilarCommunityCard';

interface BasicInfoStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
}

interface SimilarCommunity {
  id: string;
  name: string;
  villagers: number;
  storiesPerDay: number;
  size: 'Village' | 'Thriving City' | 'Metropolis';
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const [similarCommunities, setSimilarCommunities] = useState<SimilarCommunity[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (data.description) {
      setIsSearching(true);
      // Simulate AI search delay
      const timer = setTimeout(() => {
        // This would be replaced with actual AI-powered search
        setSimilarCommunities([
          {
            id: '1',
            name: 'WallstreetBets',
            villagers: 14423,
            storiesPerDay: 14.24,
            size: 'Metropolis'
          },
          {
            id: '2',
            name: 'NewYorkStockExchange',
            villagers: 8023,
            storiesPerDay: 9.21,
            size: 'Thriving City'
          },
          {
            id: '3',
            name: 'WisconsonTraders',
            villagers: 24,
            storiesPerDay: 0.3,
            size: 'Village'
          },
          {
            id: '4',
            name: 'SherwoodForest',
            villagers: 2,
            storiesPerDay: 0.01,
            size: 'Village'
          }
        ]);
        setIsSearching(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data.description]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe your desired community
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Stock trading community centered around the Robinhood app"
            className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proposed Community Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="RobinhoodTrading"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Similar communities
            </h3>
            {isSearching && (
              <div className="flex items-center text-sm text-gray-500">
                <Search className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </div>
            )}
          </div>

          <div className="space-y-3">
            {similarCommunities.map((community) => (
              <SimilarCommunityCard
                key={community.id}
                community={community}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { LineChart, BarChart } from '../charts/Charts';
import { MetricCard } from './MetricCard';
import { useNexusStats } from '../../hooks/useNexusStats';

interface CommunityStatsProps {
  nexusId: string;
  timeRange: '1d' | '7d' | '30d' | '1y' | 'all';
  onTimeRangeChange: (range: '1d' | '7d' | '30d' | '1y' | 'all') => void;
}

export function CommunityStats({ nexusId, timeRange, onTimeRangeChange }: CommunityStatsProps) {
  const { stats, loading } = useNexusStats(nexusId, timeRange);

  const timeRanges = [
    { value: '1d', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '1y', label: '1y' },
    { value: 'all', label: 'All' }
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Community Statistics</h2>
        
        <div className="flex space-x-2">
          {timeRanges.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onTimeRangeChange(value)}
              className={`px-3 py-1 rounded-lg text-sm ${
                timeRange === value
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Stories"
          value={stats?.totalStories || 0}
          subValue={`${stats?.storiesPerDay || 0} SPD`}
        />
        <MetricCard
          label="Members"
          value={stats?.totalMembers || 0}
          subValue={`${stats?.newMembersPerDay || 0} NMPD`}
        />
        <MetricCard
          label="Comments"
          value={stats?.totalComments || 0}
          subValue={`${stats?.commentsPerDay || 0} CPD`}
        />
        <MetricCard
          label="Gold Activity"
          value={stats?.totalGoldSpent || 0}
          subValue={`${stats?.goldSpentPerDay || 0} GPD`}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="h-64">
          <LineChart
            data={stats?.activityData || []}
            lines={[
              { key: 'stories', color: 'blue' },
              { key: 'comments', color: 'green' }
            ]}
          />
        </div>
        <div className="h-64">
          <BarChart
            data={stats?.engagementData || []}
            bars={[
              { key: 'boosts', color: 'purple' },
              { key: 'trophies', color: 'yellow' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
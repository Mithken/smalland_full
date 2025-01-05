import React, { useState } from 'react';
import { ModerationQueueTabs } from './ModerationQueueTabs';
import { ModerationQueueList } from './ModerationQueueList';
import { ModerationQueueFilters } from './ModerationQueueFilters';
import type { ModerationReport } from '../../types/moderation';

type QueueTab = 'stories' | 'comments' | 'users' | 'projects';

export function ModerationQueue() {
  const [activeTab, setActiveTab] = useState<QueueTab>('stories');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'reports'>('newest');

  // In a real app, fetch reports from API based on activeTab
  const reports: ModerationReport[] = [];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Moderation Queue</h2>
      </div>

      <ModerationQueueTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{
          stories: 2,
          comments: 1,
          users: 0,
          projects: 0
        }}
      />

      <div className="p-6">
        <ModerationQueueFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <ModerationQueueList
          reports={reports}
          type={activeTab}
          onAllow={(id) => console.log('Allow', id)}
          onRemove={(id) => console.log('Remove', id)}
        />
      </div>
    </div>
  );
}
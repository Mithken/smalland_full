import React from 'react';
import { Search } from 'lucide-react';

interface ModerationQueueFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: 'newest' | 'reports';
  onSortChange: (sort: 'newest' | 'reports') => void;
}

export function ModerationQueueFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange
}: ModerationQueueFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reports..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'newest' | 'reports')}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="newest">Newest</option>
          <option value="reports">Most Reports</option>
        </select>
      </div>
    </div>
  );
}
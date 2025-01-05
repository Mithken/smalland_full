import React from 'react';
import { MessageSquare, Users, Briefcase, AlertTriangle } from 'lucide-react';

interface ModerationQueueTabsProps {
  activeTab: 'stories' | 'comments' | 'users' | 'projects';
  onTabChange: (tab: 'stories' | 'comments' | 'users' | 'projects') => void;
  counts: Record<'stories' | 'comments' | 'users' | 'projects', number>;
}

export function ModerationQueueTabs({ activeTab, onTabChange, counts }: ModerationQueueTabsProps) {
  const tabs = [
    { id: 'stories', label: 'Stories', icon: MessageSquare },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'projects', label: 'Projects', icon: Briefcase }
  ] as const;

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6" aria-label="Moderation sections">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === id
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon className="w-5 h-5 mr-2" />
            {label}
            {counts[id] > 0 && (
              <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                activeTab === id
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {counts[id]}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
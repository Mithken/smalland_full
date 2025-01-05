import React from 'react';
import { BookOpen, MessageSquare, Trophy, Activity } from 'lucide-react';

interface ProfileTab {
  id: 'stories' | 'comments' | 'trophies' | 'activity';
  label: string;
  icon: typeof BookOpen;
  count?: number;
}

interface ProfileTabsProps {
  activeTab: ProfileTab['id'];
  onTabChange: (tab: ProfileTab['id']) => void;
  counts: {
    stories: number;
    comments: number;
    trophies: number;
  };
}

export function ProfileTabs({ activeTab, onTabChange, counts }: ProfileTabsProps) {
  const tabs: ProfileTab[] = [
    { id: 'stories', label: 'Stories', icon: BookOpen, count: counts.stories },
    { id: 'comments', label: 'Comments', icon: MessageSquare, count: counts.comments },
    { id: 'trophies', label: 'Trophies', icon: Trophy, count: counts.trophies },
    { id: 'activity', label: 'Activity', icon: Activity }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Profile sections">
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
              {count !== undefined && (
                <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  activeTab === id
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
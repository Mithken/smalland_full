import React from 'react';
import { MessageSquare, Shield } from 'lucide-react';

interface SubNexusNavigationProps {
  activeTab: 'content' | 'moderation';
  onTabChange: (tab: 'content' | 'moderation') => void;
  showModeration: boolean;
}

export function SubNexusNavigation({ 
  activeTab, 
  onTabChange,
  showModeration 
}: SubNexusNavigationProps) {
  return (
    <nav className="bg-white rounded-lg shadow-sm p-2 flex space-x-2">
      <button
        onClick={() => onTabChange('content')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          activeTab === 'content'
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        Discussion
      </button>

      {showModeration && (
        <button
          onClick={() => onTabChange('moderation')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'moderation'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Shield className="w-5 h-5 mr-2" />
          Moderation
        </button>
      )}
    </nav>
  );
}
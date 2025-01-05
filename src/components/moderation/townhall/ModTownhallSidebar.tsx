import React from 'react';
import { MessageSquare, History, BookOpen, AlertTriangle } from 'lucide-react';
import type { Nexus } from '../../../types/nexus';

interface ModTownhallSidebarProps {
  nexus: Nexus;
  activeView: 'discussions' | 'actions' | 'guidelines';
  onViewChange: (view: 'discussions' | 'actions' | 'guidelines') => void;
}

export function ModTownhallSidebar({ nexus, activeView, onViewChange }: ModTownhallSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-2">
          <button
            onClick={() => onViewChange('discussions')}
            className={`w-full flex items-center p-3 rounded-lg ${
              activeView === 'discussions'
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Discussions
          </button>

          <button
            onClick={() => onViewChange('actions')}
            className={`w-full flex items-center p-3 rounded-lg ${
              activeView === 'actions'
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <History className="w-5 h-5 mr-3" />
            Recent Actions
          </button>

          <button
            onClick={() => onViewChange('guidelines')}
            className={`w-full flex items-center p-3 rounded-lg ${
              activeView === 'guidelines'
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Guidelines
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium mb-3">Active Reports</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm">Pending Reports</span>
            </div>
            <span className="text-sm font-medium text-red-600">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
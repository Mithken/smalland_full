import React, { useState } from 'react';
import { Shield, AlertTriangle, History, Settings } from 'lucide-react';
import { ModerationReports } from './ModerationReports';
import { ModerationHistory } from './ModerationHistory';
import { ModerationSettings } from './ModerationSettings';
import type { Nexus } from '../../types/nexus';

interface ModerationDashboardProps {
  nexus: Nexus;
}

type Tab = 'reports' | 'history' | 'settings';

export function ModerationDashboard({ nexus }: ModerationDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('reports');

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold">Moderation Dashboard</h2>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Moderation sections">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Reports
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <History className="w-5 h-5 mr-2" />
            History
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'reports' && <ModerationReports nexusId={nexus.nexusId} />}
        {activeTab === 'history' && <ModerationHistory nexusId={nexus.nexusId} />}
        {activeTab === 'settings' && <ModerationSettings nexus={nexus} />}
      </div>
    </div>
  );
}
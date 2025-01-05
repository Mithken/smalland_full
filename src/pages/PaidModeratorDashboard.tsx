import React, { useState } from 'react';
import { CommunityHealthDashboard } from '../components/moderation/paid/CommunityHealthDashboard';
import { ManageNexusPanel } from '../components/moderation/paid/ManageNexusPanel';
import { ModsAndGuildsPanel } from '../components/moderation/paid/ModsAndGuildsPanel';
import { SettingsPanel } from '../components/moderation/paid/SettingsPanel';
import { useNexusStore } from '../store/nexusStore';

export function PaidModeratorDashboard() {
  const [timeRange, setTimeRange] = useState<'1d' | '7d' | '30d' | '1y' | 'all'>('7d');
  const nexus = useNexusStore(state => state.currentNexus);

  if (!nexus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Professional Moderation Dashboard</h1>

      {/* Health Dashboard */}
      <CommunityHealthDashboard 
        nexusId={nexus.nexusId}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      {/* Main Panels */}
      <div className="grid grid-cols-3 gap-6">
        <ModsAndGuildsPanel nexus={nexus} />
        <ManageNexusPanel nexus={nexus} />
        <SettingsPanel nexus={nexus} />
      </div>
    </div>
  );
}
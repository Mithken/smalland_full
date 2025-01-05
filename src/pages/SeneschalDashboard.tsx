import React, { useState } from 'react';
import { CommunityStats } from '../components/seneschal/CommunityStats';
import { ModsAndGuildsPanel } from '../components/seneschal/ModsAndGuildsPanel';
import { TreasuryPanel } from '../components/seneschal/TreasuryPanel';
import { SettingsPanel } from '../components/seneschal/SettingsPanel';
import { useNexusStore } from '../store/nexusStore';

export function SeneschalDashboard() {
  const [timeRange, setTimeRange] = useState<'1d' | '7d' | '30d' | '1y' | 'all'>('7d');
  const nexus = useNexusStore(state => state.currentNexus);

  if (!nexus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Seneschal Dashboard</h1>

      {/* Stats Dashboard */}
      <CommunityStats 
        nexusId={nexus.nexusId}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      {/* Main Panels */}
      <div className="grid grid-cols-3 gap-6">
        <ModsAndGuildsPanel nexus={nexus} />
        <TreasuryPanel nexus={nexus} />
        <SettingsPanel nexus={nexus} />
      </div>
    </div>
  );
}
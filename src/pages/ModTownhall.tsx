import React, { useState } from 'react';
import { ModTownhallHeader } from '../components/moderation/townhall/ModTownhallHeader';
import { ModTownhallContent } from '../components/moderation/townhall/ModTownhallContent';
import { ModTownhallSidebar } from '../components/moderation/townhall/ModTownhallSidebar';
import { useNexusStore } from '../store/nexusStore';

export function ModTownhall() {
  const nexus = useNexusStore(state => state.currentNexus);
  const [activeView, setActiveView] = useState<'discussions' | 'actions' | 'guidelines'>('discussions');

  if (!nexus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <ModTownhallHeader nexus={nexus} />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <ModTownhallContent 
            nexusId={nexus.nexusId} 
            activeView={activeView} 
          />
        </div>
        
        <div className="col-span-3">
          <ModTownhallSidebar
            nexus={nexus}
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </div>
      </div>
    </div>
  );
}
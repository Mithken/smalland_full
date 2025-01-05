import React from 'react';
import { ModTownhallDiscussions } from './ModTownhallDiscussions';
import { ModTownhallActions } from './ModTownhallActions';
import { ModTownhallGuidelines } from './ModTownhallGuidelines';

interface ModTownhallContentProps {
  nexusId: string;
  activeView: 'discussions' | 'actions' | 'guidelines';
}

export function ModTownhallContent({ nexusId, activeView }: ModTownhallContentProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {activeView === 'discussions' && (
        <ModTownhallDiscussions nexusId={nexusId} />
      )}
      
      {activeView === 'actions' && (
        <ModTownhallActions nexusId={nexusId} />
      )}
      
      {activeView === 'guidelines' && (
        <ModTownhallGuidelines nexusId={nexusId} />
      )}
    </div>
  );
}
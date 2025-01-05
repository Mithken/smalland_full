import React from 'react';
import { StoryFeed } from '../story/StoryFeed';
import { ProjectList } from '../project/ProjectList';
import { ChatBox } from './ChatBox';
import type { Nexus } from '../../types/nexus';

interface NexusContentProps {
  nexus: Nexus;
}

export function NexusContent({ nexus }: NexusContentProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="space-y-6">
          <StoryFeed />
          <ProjectList />
        </div>
      </div>
      
      <div className="col-span-4 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-4">Active Members</h3>
          {/* Member list component would go here */}
        </div>
        
        <ChatBox />
      </div>
    </div>
  );
}
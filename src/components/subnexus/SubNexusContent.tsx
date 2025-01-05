import React from 'react';
import { StoryFeed } from '../story/StoryFeed';
import { CommentList } from '../comments/CommentList';
import { ChatBox } from '../nexus/ChatBox';
import { SubNexusMembers } from './SubNexusMembers';
import type { SubNexus } from '../../types/subnexus';

interface SubNexusContentProps {
  subNexus: SubNexus;
}

export function SubNexusContent({ subNexus }: SubNexusContentProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <div className="space-y-6">
          <StoryFeed />
          <CommentList comments={[]} storyId="" />
        </div>
      </div>
      
      <div className="col-span-4 space-y-6">
        <SubNexusMembers members={subNexus.members} />
        <ChatBox />
      </div>
    </div>
  );
}
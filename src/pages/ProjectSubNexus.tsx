import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubNexusHeader } from '../components/subnexus/SubNexusHeader';
import { SubNexusNavigation } from '../components/subnexus/SubNexusNavigation';
import { SubNexusContent } from '../components/subnexus/SubNexusContent';
import { ModerationDashboard } from '../components/moderation/ModerationDashboard';
import { useAuthStore } from '../store/authStore';

export function ProjectSubNexus() {
  const { projectId, subNexusId } = useParams();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'content' | 'moderation'>('content');

  // In a real app, fetch sub-nexus data based on ID
  const subNexus = {
    subNexusId: subNexusId || '',
    projectId: projectId || '',
    name: 'Project Discussion',
    description: 'A space for project-related discussions and updates',
    members: [user?.userId || ''],
    moderators: [user?.userId || ''],
    storyHistory: [],
    chatId: 'chat-id',
    moderationHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const isModerator = subNexus.moderators.includes(user?.userId || '');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <SubNexusHeader subNexus={subNexus} />
      
      <SubNexusNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showModeration={isModerator}
      />
      
      {activeTab === 'content' ? (
        <SubNexusContent subNexus={subNexus} />
      ) : (
        <ModerationDashboard nexus={{ 
          nexusId: subNexus.subNexusId,
          name: subNexus.name,
          description: subNexus.description,
          seneschalId: subNexus.moderators[0],
          treasuryBalance: 0,
          level: 1,
          memberCount: subNexus.members.length,
          storyCount: subNexus.storyHistory.length,
          projectCount: 0,
          moderators: subNexus.moderators.map(id => ({
            userId: id,
            displayName: id === user?.userId ? user.displayName : 'Moderator'
          })),
          createdAt: subNexus.createdAt,
          updatedAt: subNexus.updatedAt,
          settings: {
            isPrivate: true,
            requiresApproval: false,
            allowsProjects: false,
            allowsStories: true,
            allowsPolls: true,
            showMemberCount: true,
            showTreasury: false,
            isNSFW: false
          }
        }} />
      )}
    </div>
  );
}
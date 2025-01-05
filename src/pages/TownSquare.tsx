import React from 'react';
import { StoryFeed } from '../components/story/StoryFeed';
import { ProjectList } from '../components/project/ProjectList';
import { SearchBar } from '../components/search/SearchBar';
import { NotificationBell } from '../components/notifications/NotificationBell';
import { GoldDisplay } from '../components/gold/GoldDisplay';
import { UserAvatar } from '../components/user/UserAvatar';
import { NexusSidebar } from '../components/nexus/NexusSidebar';
import { useAuthStore } from '../store/authStore';
import { ChatBox } from '../components/nexus/ChatBox';

export function TownSquare() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-2">
          <NexusSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-7">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Global Town Square</h1>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <GoldDisplay />
              <UserAvatar user={user} size="sm" />
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <SearchBar placeholder="Search stories and projects..." />
          </div>

          {/* Stories Feed */}
          <StoryFeed />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 space-y-6">
          <ProjectList />
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Community Ad</h3>
            {/* Ad content */}
          </div>
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
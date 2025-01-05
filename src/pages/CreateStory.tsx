import React, { useState } from 'react';
import { StoryEditor } from '../components/story/StoryEditor';
import { StoryPreview } from '../components/story/StoryPreview';
import { StoryControls } from '../components/story/StoryControls';
import { SearchBar } from '../components/search/SearchBar';
import { NotificationBell } from '../components/notifications/NotificationBell';
import { GoldDisplay } from '../components/gold/GoldDisplay';
import { UserAvatar } from '../components/user/UserAvatar';
import { useAuthStore } from '../store/authStore';
import type { Story } from '../types/story';

export function CreateStory() {
  const { user } = useAuthStore();
  const [isPreview, setIsPreview] = useState(false);
  const [story, setStory] = useState<Partial<Story>>({
    title: '',
    content: { text: '', images: [], links: [] },
    tags: [],
    isPoll: false,
    pollQuestion: '',
    pollOptions: []
  });

  const handleSubmit = async () => {
    // TODO: Implement story submission
    console.log('Submitting story:', story);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Story</h1>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <GoldDisplay />
          <UserAvatar user={user} size="sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {isPreview ? (
            <StoryPreview story={story as Story} onEdit={() => setIsPreview(false)} />
          ) : (
            <StoryEditor story={story} onChange={setStory} />
          )}
        </div>

        <div className="space-y-6">
          <StoryControls
            story={story}
            onChange={setStory}
            onPreview={() => setIsPreview(true)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
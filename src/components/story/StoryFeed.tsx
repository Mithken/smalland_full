import React, { useState, useEffect } from 'react';
import { StoryCard } from '../nexus/StoryCard';
import { useStoryStore } from '../../store/storyStore';
import type { Story } from '../../types/story';

export function StoryFeed() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch stories from your API
    // Sort by gold value descending
    const fetchStories = async () => {
      try {
        // Fetch stories logic here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      {stories.map(story => (
        <StoryCard
          key={story.storyId}
          story={story}
          expanded={expandedStoryId === story.storyId}
          onExpand={() => setExpandedStoryId(story.storyId)}
        />
      ))}
    </div>
  );
}
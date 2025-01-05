import React from 'react';
import { Edit } from 'lucide-react';
import { StoryCard } from '../nexus/StoryCard';
import type { Story } from '../../types/story';

interface StoryPreviewProps {
  story: Story;
  onEdit: () => void;
}

export function StoryPreview({ story, onEdit }: StoryPreviewProps) {
  return (
    <div>
      <div className="mb-4">
        <button
          onClick={onEdit}
          className="flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Story
        </button>
      </div>
      <StoryCard story={story} expanded />
    </div>
  );
}
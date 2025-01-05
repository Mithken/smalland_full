import React from 'react';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import type { Comment } from '../../types/comment';

interface CommentSectionProps {
  storyId: string;
  comments: Comment[];
}

export function CommentSection({ storyId, comments }: CommentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <CommentForm storyId={storyId} />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Comments ({comments.length})
        </h3>
        <CommentList comments={comments} storyId={storyId} />
      </div>
    </div>
  );
}
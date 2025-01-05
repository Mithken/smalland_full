import React from 'react';
import { CommentItem } from './CommentItem';
import type { Comment } from '../../types/comment';

interface CommentListProps {
  comments: Comment[];
  storyId: string;
  parentId?: string;
  level?: number;
}

export function CommentList({ comments, storyId, parentId = null, level = 0 }: CommentListProps) {
  const filteredComments = comments.filter(comment => 
    comment.parentCommentId === parentId
  );

  if (filteredComments.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${level > 0 ? 'ml-12 border-l-2 border-gray-100 pl-4' : ''}`}>
      {filteredComments.map(comment => (
        <div key={comment.commentId}>
          <CommentItem comment={comment} storyId={storyId} />
          <CommentList 
            comments={comments} 
            storyId={storyId}
            parentId={comment.commentId}
            level={level + 1}
          />
        </div>
      ))}
    </div>
  );
}
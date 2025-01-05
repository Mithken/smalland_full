import React, { useState } from 'react';
import { MessageSquare, Share2 } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import { CoinTossButton } from '../currency/CoinTossButton';
import { CommentForm } from './CommentForm';
import { useAuthStore } from '../../store/authStore';
import type { Comment } from '../../types/comment';

interface CommentItemProps {
  comment: Comment;
  storyId: string;
}

export function CommentItem({ comment, storyId }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useAuthStore();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start space-x-3 mb-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {comment.author.displayName}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(comment.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="text-gray-800 mb-3">
        {comment.commentText}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center hover:text-gray-700"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>Reply</span>
          </button>
          
          <CoinTossButton objectId={comment.commentId} objectType="comment" />
          
          <button className="hover:text-gray-700">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-sm text-yellow-600">
          Gold: {comment.goldReceived || 0}
        </div>
      </div>

      {isReplying && (
        <div className="mt-4">
          <CommentForm 
            storyId={storyId}
            parentCommentId={comment.commentId}
            onSubmit={() => setIsReplying(false)}
          />
        </div>
      )}
    </div>
  );
}
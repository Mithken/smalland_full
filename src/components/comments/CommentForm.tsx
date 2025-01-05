import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { createComment } from '../../lib/api/comment';
import { RichTextEditor } from './editor/RichTextEditor';

interface CommentFormProps {
  storyId: string;
  parentCommentId?: string;
  onSubmit?: () => void;
}

export function CommentForm({ storyId, parentCommentId, onSubmit }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    try {
      await createComment(storyId, 'nexus-id', commentText, parentCommentId);
      setCommentText('');
      onSubmit?.();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RichTextEditor
        value={commentText}
        onChange={setCommentText}
        placeholder="Write a comment..."
      />
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            setCommentText('');
            onSubmit?.();
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 mr-2" />
          Comment
        </button>
      </div>
    </form>
  );
}
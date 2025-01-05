import React from 'react';
import { RichTextEditor } from '../../story/RichTextEditor';
import { UserAvatar } from '../../user/UserAvatar';
import { useAuthStore } from '../../../store/authStore';

interface ModTownhallDiscussionsProps {
  nexusId: string;
}

export function ModTownhallDiscussions({ nexusId }: ModTownhallDiscussionsProps) {
  const [newPost, setNewPost] = React.useState('');
  const { user } = useAuthStore();

  return (
    <div className="divide-y divide-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Moderator Discussions</h2>
        
        <div className="space-y-4">
          <RichTextEditor
            value={newPost}
            onChange={setNewPost}
            placeholder="Start a discussion..."
          />
          
          <div className="flex justify-end">
            <button
              disabled={!newPost.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Post Discussion
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Sample discussion - would be populated from API */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <UserAvatar user={user} size="sm" />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Moderator Name</span>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-gray-800">
                    Discussion about recent moderation actions and guidelines.
                  </p>
                </div>
                
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <button className="hover:text-gray-700">Reply</button>
                  <button className="hover:text-gray-700">Pin</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
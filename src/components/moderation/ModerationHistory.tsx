import React from 'react';
import { Shield, MessageSquare, User } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import type { ModerationAction } from '../../types/moderation';

interface ModerationHistoryProps {
  nexusId: string;
}

export function ModerationHistory({ nexusId }: ModerationHistoryProps) {
  // In a real app, fetch history from API
  const history: ModerationAction[] = [];

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No moderation history</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((action, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                {action.action === 'story_removed' && (
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                )}
                {action.action === 'comment_removed' && (
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                )}
                {action.action === 'user_banned' && (
                  <User className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {action.action.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(action.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{action.reason}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-500">Action by</p>
                <p className="font-medium">Moderator Name</p>
              </div>
              <UserAvatar user={null} size="sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
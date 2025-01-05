import React from 'react';
import { Shield, MessageSquare, User } from 'lucide-react';
import { UserAvatar } from '../../user/UserAvatar';
import type { ModerationAction } from '../../../types/moderation';

interface ModTownhallActionsProps {
  nexusId: string;
}

export function ModTownhallActions({ nexusId }: ModTownhallActionsProps) {
  // In a real app, fetch actions from API
  const actions: ModerationAction[] = [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Recent Moderation Actions</h2>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="p-2 bg-indigo-100 rounded-lg">
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

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {action.action.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(action.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">By</span>
                  <UserAvatar user={null} size="sm" />
                </div>
              </div>

              <p className="text-gray-600">{action.reason}</p>
            </div>
          </div>
        ))}

        {actions.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No recent moderation actions</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { formatDistanceToNow } from '../../utils/date';
import type { UserActivity } from '../../types/user';

interface ProfileActivityProps {
  activities: UserActivity[];
}

export function ProfileActivity({ activities }: ProfileActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      {activities.map(activity => (
        <div key={activity.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 mt-2 bg-indigo-600 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                {activity.type === 'story_post' && 'Posted a new story'}
                {activity.type === 'comment_post' && 'Commented on a story'}
                {activity.type === 'project_start' && 'Started a new project'}
                {activity.type === 'project_complete' && 'Completed a project'}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
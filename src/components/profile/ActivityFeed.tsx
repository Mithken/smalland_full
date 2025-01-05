import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from '../../utils/date';

interface ActivityFeedProps {
  userId: string;
}

export function ActivityFeed({ userId }: ActivityFeedProps) {
  // This would typically fetch activity data from your API
  const activities = [
    { id: 1, type: 'story_post', timestamp: new Date().toISOString(), description: 'Posted a new story' },
    { id: 2, type: 'comment', timestamp: new Date().toISOString(), description: 'Commented on a story' },
    // Add more activities as needed
  ];

  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="w-2 h-2 mt-2 bg-indigo-600 rounded-full" />
          <div>
            <p className="text-gray-900">{activity.description}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(activity.timestamp))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
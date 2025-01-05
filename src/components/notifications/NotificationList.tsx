import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../../store/notificationStore';
import type { Notification } from '../../types/notification';

interface NotificationListProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationList({ notifications, onClose }: NotificationListProps) {
  const navigate = useNavigate();
  const markAsRead = useNotificationStore(state => state.markAsRead);
  
  const handleClick = (notification: Notification) => {
    markAsRead(notification.notificationId);
    onClose();
    
    // Navigate based on notification type
    switch (notification.category) {
      case 'nexus':
        navigate(`/nexus/${notification.nexusId}`);
        break;
      case 'projects':
        navigate(`/projects/${notification.relatedObjectId}`);
        break;
      // Add other navigation cases as needed
    }
  };
  
  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map(notification => (
        <button
          key={notification.notificationId}
          onClick={() => handleClick(notification)}
          className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
        >
          <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
          <p className="text-xs text-gray-500">
            {new Date(notification.timestamp).toLocaleDateString()}
          </p>
        </button>
      ))}
    </div>
  );
}
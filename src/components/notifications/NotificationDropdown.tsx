import React from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import { NotificationList } from './NotificationList';
import type { NotificationCategory } from '../../types/notification';

interface NotificationDropdownProps {
  onClose: () => void;
}

const CATEGORIES: NotificationCategory[] = ['activity', 'nexus', 'projects', 'chat', 'moderation', 'guild'];

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const [activeCategory, setActiveCategory] = React.useState<NotificationCategory>('activity');
  const { notifications, markAllAsRead, getUnreadCount } = useNotificationStore();
  
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button
            onClick={() => markAllAsRead(activeCategory)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Mark all as read
          </button>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap relative ${
                activeCategory === category
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {getUnreadCount(category) > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <NotificationList
        notifications={notifications.unread.filter(n => n.category === activeCategory)}
        onClose={onClose}
      />
      
      {notifications.unread.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No new notifications
        </div>
      )}
    </div>
  );
}
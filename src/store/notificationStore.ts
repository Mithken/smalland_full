import { create } from 'zustand';
import type { Notification, NotificationCategory } from '../types/notification';

interface NotificationStore {
  notifications: {
    unread: Notification[];
    history: Notification[];
  };
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: (category?: NotificationCategory) => void;
  getUnreadCount: (category?: NotificationCategory) => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: {
    unread: [],
    history: []
  },
  
  addNotification: (notification) => set(state => ({
    notifications: {
      ...state.notifications,
      unread: [notification, ...state.notifications.unread]
    }
  })),
  
  markAsRead: (notificationId) => set(state => {
    const notification = state.notifications.unread.find(n => n.notificationId === notificationId);
    if (!notification) return state;
    
    return {
      notifications: {
        unread: state.notifications.unread.filter(n => n.notificationId !== notificationId),
        history: [{ ...notification, read: true }, ...state.notifications.history]
      }
    };
  }),
  
  markAllAsRead: (category) => set(state => {
    const notificationsToMove = state.notifications.unread.filter(n => 
      !category || n.category === category
    );
    
    return {
      notifications: {
        unread: state.notifications.unread.filter(n => 
          category && n.category !== category
        ),
        history: [
          ...notificationsToMove.map(n => ({ ...n, read: true })),
          ...state.notifications.history
        ]
      }
    };
  }),
  
  getUnreadCount: (category) => {
    const { unread } = get().notifications;
    return category 
      ? unread.filter(n => n.category === category).length 
      : unread.length;
  }
}));
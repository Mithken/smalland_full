export type NotificationCategory = 'activity' | 'nexus' | 'projects' | 'chat' | 'moderation' | 'guild';

export interface Notification {
  notificationId: string;
  userId: string;
  category: NotificationCategory;
  type: string;
  message: string;
  timestamp: string;
  relatedObjectId: string;
  read: boolean;
  moderatorId?: string;
  nexusId?: string;
}

export interface NotificationState {
  unread: Notification[];
  history: Notification[];
}
import type { User } from './user';

export interface ChatMessage {
  messageId: string;
  nexusId: string;
  authorId: string;
  content: string;
  timestamp: string;
  edited?: boolean;
  editedAt?: string;
  mentions?: string[];
  reactions?: Record<string, string[]>;
}

export interface ChatRoom {
  roomId: string;
  nexusId: string;
  name: string;
  description?: string;
  members: string[];
  moderators: string[];
  lastActivity: string;
  messageCount: number;
}
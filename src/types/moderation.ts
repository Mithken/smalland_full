import type { User } from './user';

export type ModerationType = 'user_banned' | 'story_removed' | 'comment_removed';

export interface ModerationAction {
  action: ModerationType;
  targetUserId?: string;
  contentId?: string;
  moderatorId: string;
  reason: string;
  timestamp: string;
  nexusId: string;
}

export interface ModerationReport {
  reportId: string;
  reportType: 'story' | 'comment' | 'user';
  reportedId: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp: string;
  nexusId: string;
  moderatorId?: string;
  resolution?: string;
  resolutionTimestamp?: string;
}
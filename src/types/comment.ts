export interface ModerationAction {
  action: string;
  moderatorId: string;
  reason: string;
  timestamp: string;
  nexusId: string;
}

export interface Comment {
  commentId: string;
  storyId: string;
  parentCommentId?: string;
  nexusId: string;
  authorId: string;
  commentText: string;
  timestamp: string;
  moderationActions?: ModerationAction[];
  goldReceived?: number;
}
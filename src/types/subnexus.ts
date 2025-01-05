import type { ModerationAction } from './moderation';

export interface SubNexus {
  subNexusId: string;
  projectId: string;
  name: string;
  description: string;
  members: string[];
  moderators: string[];
  storyHistory: Array<{
    storyId: string;
    postTimestamp: string;
  }>;
  chatId: string;
  moderationHistory: ModerationAction[];
  createdAt: string;
  updatedAt: string;
}
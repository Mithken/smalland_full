export interface TrophyCriteria {
  storiesPosted?: number;
  commentsPosted?: number;
  projectsCompleted?: number;
  goldReceived?: number;
  nexusLevelReached?: string;
  commentsSaved?: number;
  storiesSaved?: number;
  projectsPosted?: number;
  projectsStarted?: number;
  chatsPosted?: number;
  nexusJoined?: string;
  storyTagged?: string;
  commentTagged?: string;
  projectTagged?: string;
  storyReceivedGold?: number;
  commentReceivedGold?: number;
  nexusTreasuresAcquired?: string[];
}

export interface Trophy {
  trophyId: string;
  trophyName: string;
  trophyDescription: string;
  trophyImage: string;
  trophyType: 'achievement' | 'community' | 'project' | 'story' | 'comment' | 'nexus';
  criteria: TrophyCriteria;
}

export interface AwardedTrophy {
  objectId: string; // story_id or comment_id
  trophyId: string;
  awardedAt: string;
}
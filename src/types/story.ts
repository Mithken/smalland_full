export interface StoryContent {
  text: string;
  images?: string[];
  links?: string[];
}

export interface PollOption {
  optionText: string;
  voteCount?: number;
}

export interface ModerationAction {
  action: string;
  moderatorId: string;
  reason: string;
  timestamp: string;
  nexusId: string;
}

export interface CommentHistory {
  commentId: string;
  timestamp: string;
  moderationActions?: ModerationAction[];
  goldReceived: number;
}

export interface StoryBoost {
  userId: string;
  boostTimestamp: string;
}

export interface Story {
  storyId: string;
  nexusId: string;
  authorId: string;
  title: string;
  content: StoryContent;
  titleImage?: string;
  bodyImage?: string;
  tags?: string[];
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
  goldReceived?: number;
  boostScore?: number;
  trophiesReceived?: string[];
  coinTosses?: number;
  boosts?: StoryBoost[];
  commentHistory?: CommentHistory[];
  isPoll: boolean;
  pollQuestion?: string | null;
  pollOptions?: PollOption[];
}
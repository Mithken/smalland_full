export interface Nexus {
  nexusId: string;
  name: string;
  description: string;
  headerImage?: string;
  seneschalId: string;
  treasuryBalance: number;
  level: number;
  memberCount: number;
  storyCount: number;
  projectCount: number;
  moderators?: Array<{
    userId: string;
    displayName: string;
    profilePicture?: string;
  }>;
  createdAt: string;
  updatedAt: string;
  settings: {
    isPrivate: boolean;
    requiresApproval: boolean;
    allowsProjects: boolean;
    allowsStories: boolean;
    allowsPolls: boolean;
    showMemberCount: boolean;
    showTreasury: boolean;
    isNSFW: boolean;
  };
}
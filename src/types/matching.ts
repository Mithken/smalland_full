// Types for the Secret Sauce matching algorithm

export interface MatchScore {
  score: number;
  factors: {
    interestMatch: number;
    skillMatch: number;
    activityMatch: number;
    locationMatch: number;
    availabilityMatch: number;
  };
}

export interface MatchResult {
  objectId: string;
  objectType: 'nexus' | 'project' | 'role';
  score: number;
  factors: MatchScore['factors'];
  confidence: number;
}

export interface UserMatchProfile {
  interests: string[];
  skills: string[];
  activityLevel: number;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  availability: {
    hoursPerWeek: number;
    preferredTimes: string[];
  };
  projectHistory: {
    completed: number;
    abandoned: number;
    active: number;
  };
  recentActivity: {
    stories: number;
    comments: number;
    projectContributions: number;
  };
}

export interface MatchableObject {
  id: string;
  type: 'nexus' | 'project' | 'role';
  requiredSkills: string[];
  desiredSkills: string[];
  interests: string[];
  timeCommitment?: number;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  activityLevel: number;
}
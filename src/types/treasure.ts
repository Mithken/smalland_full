export interface Treasure {
  treasureId: string;
  treasureName: string;
  description: string;
  baseCost: number;
  requiredProjects?: number;
  requiredStories?: number;
  requiredComments?: number;
  requiredChats?: number;
  requiredUsers?: number;
  speedOfPosting?: number;
  isNegative: boolean;
}

export interface NexusTreasure {
  nexusId: string;
  treasureId: string;
  acquiredAt: string;
}
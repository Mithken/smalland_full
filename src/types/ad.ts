import type { User } from './user';

export interface Ad {
  adId: string;
  nexusId: string;
  title: string;
  content: string;
  imageUrl?: string;
  targetUrl?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'ended';
  impressions: number;
  clicks: number;
  goldGenerated: number;
}

export interface AdSlot {
  slotId: string;
  nexusId: string;
  position: 'sidebar' | 'feed' | 'banner';
  currentAdId?: string;
  goldPerImpression: number;
  isActive: boolean;
}

export interface AdImpression {
  impressionId: string;
  adId: string;
  nexusId: string;
  userId?: string;
  timestamp: string;
  goldGenerated: number;
}

export interface AdSettings {
  nexusId: string;
  adsEnabled: boolean;
  maxAdSlots: number;
  currentAdSlots: number;
  adRevenuePerSlot: number;
  goldAllocation: {
    moderatorsPct: number;
    rolesPct: number;
  };
  seneschalGold: number;
}
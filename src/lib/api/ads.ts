import { supabase } from '../supabase';
import type { Ad, AdSlot, AdImpression, AdSettings } from '../types/ad';

export async function getAdsForNexus(nexusId: string, numSlots: number): Promise<Ad[]> {
  const { data: ads } = await supabase
    .from('ads')
    .select('*')
    .eq('nexus_id', nexusId)
    .eq('status', 'active')
    .lte('start_date', new Date().toISOString())
    .gte('end_date', new Date().toISOString())
    .limit(numSlots);

  if (!ads) return [];

  return ads.map(ad => ({
    adId: ad.id,
    nexusId: ad.nexus_id,
    title: ad.title,
    content: ad.content,
    imageUrl: ad.image_url,
    targetUrl: ad.target_url,
    startDate: ad.start_date,
    endDate: ad.end_date,
    status: ad.status,
    impressions: ad.impressions,
    clicks: ad.clicks,
    goldGenerated: ad.gold_generated
  }));
}

export async function recordAdImpression(
  adId: string,
  nexusId: string,
  userId?: string
): Promise<void> {
  await supabase.from('ad_impressions').insert({
    ad_id: adId,
    nexus_id: nexusId,
    user_id: userId,
    gold_generated: 0.01 // This would be configurable in production
  });
}

export async function getAdSettings(nexusId: string): Promise<AdSettings | null> {
  const { data: settings } = await supabase
    .from('nexus_ad_settings')
    .select('*')
    .eq('nexus_id', nexusId)
    .single();

  if (!settings) return null;

  return {
    nexusId: settings.nexus_id,
    adsEnabled: settings.ads_enabled,
    maxAdSlots: settings.max_ad_slots,
    currentAdSlots: settings.current_ad_slots,
    adRevenuePerSlot: settings.ad_revenue_per_slot,
    goldAllocation: settings.gold_allocation,
    seneschalGold: settings.seneschal_gold
  };
}

export async function updateAdSettings(
  nexusId: string,
  updates: Partial<AdSettings>
): Promise<void> {
  await supabase
    .from('nexus_ad_settings')
    .update(updates)
    .eq('nexus_id', nexusId);
}
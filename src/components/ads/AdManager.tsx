import React, { useEffect, useState } from 'react';
import { getAdsForNexus, getAdSettings } from '../../lib/api/ads';
import { AdSlot } from './AdSlot';
import type { Ad, AdSettings } from '../../types/ad';

interface AdManagerProps {
  nexusId: string;
  position: 'sidebar' | 'feed' | 'banner';
}

export function AdManager({ nexusId, position }: AdManagerProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [settings, setSettings] = useState<AdSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      const adSettings = await getAdSettings(nexusId);
      if (!adSettings || !adSettings.adsEnabled) {
        setLoading(false);
        return;
      }

      setSettings(adSettings);
      const nexusAds = await getAdsForNexus(nexusId, adSettings.currentAdSlots);
      setAds(nexusAds);
      setLoading(false);
    };

    loadAds();
  }, [nexusId]);

  if (loading) return null;
  if (!settings?.adsEnabled || ads.length === 0) return null;

  return (
    <div className="space-y-4">
      {ads.map(ad => (
        <AdSlot 
          key={ad.adId} 
          ad={ad} 
          position={position}
        />
      ))}
    </div>
  );
}
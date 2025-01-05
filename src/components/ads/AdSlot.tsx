import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { recordAdImpression } from '../../lib/api/ads';
import type { Ad } from '../../types/ad';

interface AdSlotProps {
  ad: Ad;
  position: 'sidebar' | 'feed' | 'banner';
}

export function AdSlot({ ad, position }: AdSlotProps) {
  const { user } = useAuthStore();

  useEffect(() => {
    // Record impression when ad is viewed
    recordAdImpression(ad.adId, ad.nexusId, user?.userId);
  }, [ad.adId, ad.nexusId, user?.userId]);

  const handleClick = () => {
    if (ad.targetUrl) {
      window.open(ad.targetUrl, '_blank');
    }
  };

  const positionClasses = {
    sidebar: 'w-full',
    feed: 'max-w-2xl mx-auto',
    banner: 'w-full'
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${positionClasses[position]}`}
    >
      {ad.imageUrl && (
        <img 
          src={ad.imageUrl} 
          alt={ad.title}
          className="w-full h-40 object-cover"
        />
      )}
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{ad.title}</h3>
        <p className="text-gray-600 text-sm">{ad.content}</p>
        <div className="text-xs text-gray-400 mt-2">Sponsored</div>
      </div>
    </div>
  );
}
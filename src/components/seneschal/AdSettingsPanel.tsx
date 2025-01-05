import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { getAdSettings, updateAdSettings } from '../../lib/api/ads';
import type { AdSettings } from '../../types/ad';

interface AdSettingsPanelProps {
  nexusId: string;
}

export function AdSettingsPanel({ nexusId }: AdSettingsPanelProps) {
  const [settings, setSettings] = useState<AdSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const adSettings = await getAdSettings(nexusId);
      setSettings(adSettings);
      setLoading(false);
    };

    loadSettings();
  }, [nexusId]);

  const handleToggleAds = async () => {
    if (!settings) return;

    const updates = {
      adsEnabled: !settings.adsEnabled
    };

    await updateAdSettings(nexusId, updates);
    setSettings({ ...settings, ...updates });
  };

  const handleSlotChange = async (slots: number) => {
    if (!settings) return;

    const updates = {
      currentAdSlots: Math.min(slots, settings.maxAdSlots)
    };

    await updateAdSettings(nexusId, updates);
    setSettings({ ...settings, ...updates });
  };

  if (loading) return <div>Loading...</div>;
  if (!settings) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Ad Settings</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Enable Ads</h4>
            <p className="text-sm text-gray-500">
              Show ads in your community to generate gold
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.adsEnabled}
              onChange={handleToggleAds}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div>
          <h4 className="font-medium mb-2">Ad Slots</h4>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max={settings.maxAdSlots}
              value={settings.currentAdSlots}
              onChange={(e) => handleSlotChange(parseInt(e.target.value))}
              className="flex-1"
              disabled={!settings.adsEnabled}
            />
            <span className="text-sm text-gray-600">
              {settings.currentAdSlots} / {settings.maxAdSlots}
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center text-yellow-800 mb-2">
            <Coins className="w-5 h-5 mr-2" />
            <h4 className="font-medium">Gold Generation</h4>
          </div>
          <p className="text-sm text-yellow-700">
            Current Rate: {settings.adRevenuePerSlot} gold per slot per day
          </p>
          <div className="mt-2 text-sm text-yellow-700">
            <div>Moderators: {settings.goldAllocation.moderatorsPct}%</div>
            <div>Guild Roles: {settings.goldAllocation.rolesPct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
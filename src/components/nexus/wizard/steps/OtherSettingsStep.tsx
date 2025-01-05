import React, { useState } from 'react';
import { Image, Settings, Shield, UserPlus, AlertTriangle } from 'lucide-react';
import { InviteMembersModal } from './InviteMembersModal';
import type { NexusFormData } from '../types';

interface OtherSettingsStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
  onFinalize: () => void;
}

export function OtherSettingsStep({ data, onChange, onFinalize }: OtherSettingsStepProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [headerImage, setHeaderImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, this would upload to your storage service
      const imageUrl = URL.createObjectURL(file);
      setHeaderImage(imageUrl);
      onChange({ headerImage: imageUrl });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Image Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Image className="w-5 h-5 text-indigo-600 mr-2" />
          Header Image
        </h3>
        
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors cursor-pointer"
          onClick={() => document.getElementById('header-image-input')?.click()}
        >
          {headerImage ? (
            <div className="relative">
              <img 
                src={headerImage} 
                alt="Community header" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHeaderImage(null);
                  onChange({ headerImage: null });
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Image className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload a header image</p>
            </div>
          )}
        </div>
        <input
          id="header-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Settings className="w-5 h-5 text-indigo-600 mr-2" />
          Display Settings
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.settings?.showMemberCount}
              onChange={(e) => onChange({
                settings: { ...data.settings, showMemberCount: e.target.checked }
              })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Show member count</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.settings?.showTreasury}
              onChange={(e) => onChange({
                settings: { ...data.settings, showTreasury: e.target.checked }
              })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Show treasury balance</span>
          </label>
        </div>
      </div>

      {/* NSFW Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
          Content Settings
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.settings?.isNSFW}
              onChange={(e) => onChange({
                settings: { ...data.settings, isNSFW: e.target.checked }
              })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Mark community as NSFW</span>
          </label>
        </div>
      </div>

      {/* Community Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Community Description</h3>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="Describe your community..."
        />
      </div>

      {/* Community Defaults */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Shield className="w-5 h-5 text-indigo-600 mr-2" />
          Community Defaults
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.settings?.requireApproval}
              onChange={(e) => onChange({
                settings: { ...data.settings, requireApproval: e.target.checked }
              })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Require approval for new members</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.settings?.allowSelfPromotion}
              onChange={(e) => onChange({
                settings: { ...data.settings, allowSelfPromotion: e.target.checked }
              })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-gray-700">Allow self-promotion</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center px-6 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Invite Members
        </button>

        <button
          onClick={onFinalize}
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          Finalize Community
        </button>
      </div>

      {isInviteModalOpen && (
        <InviteMembersModal
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={(members) => {
            onChange({
              invitedMembers: [...(data.invitedMembers || []), ...members]
            });
            setIsInviteModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
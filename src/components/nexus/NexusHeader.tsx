import React from 'react';
import { Shield, Users, Coins } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import { CurrencyDisplay } from '../currency/CurrencyDisplay';
import type { Nexus } from '../../types/nexus';

interface NexusHeaderProps {
  nexus: Nexus;
}

export function NexusHeader({ nexus }: NexusHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative">
        {nexus.headerImage ? (
          <img 
            src={nexus.headerImage} 
            alt={nexus.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg" />
        )}
        
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 bg-white rounded-lg p-1 shadow-lg">
            <Shield className="w-full h-full text-indigo-600" />
          </div>
        </div>
      </div>
      
      <div className="pt-16 px-8 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{nexus.name}</h1>
            <p className="text-gray-600 mt-1">{nexus.description}</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>{nexus.memberCount} members</span>
            </div>
            
            <div className="flex items-center text-yellow-600">
              <Coins className="w-5 h-5 mr-2" />
              <CurrencyDisplay amount={nexus.treasuryBalance} showDecimal />
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-6 space-x-4">
          {nexus.moderators?.slice(0, 5).map(moderator => (
            <div key={moderator.userId} className="text-center">
              <UserAvatar user={moderator} size="sm" />
              <span className="text-xs text-gray-500 block mt-1">Moderator</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
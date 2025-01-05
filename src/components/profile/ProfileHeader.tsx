import React from 'react';
import { MapPin, Link as LinkIcon, Edit } from 'lucide-react';
import { UserAvatar } from '../user/UserAvatar';
import { GoldDisplay } from '../gold/GoldDisplay';
import type { User } from '../../types/user';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg" />
        <div className="absolute -bottom-16 left-8 flex items-end">
          <div className="relative">
            <UserAvatar user={user} size="lg" />
            {isOwnProfile && (
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="pt-20 px-8 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">{user.displayName}</h1>
              {isOwnProfile && (
                <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Edit Profile
                </button>
              )}
            </div>
            <p className="text-gray-600">@{user.username}</p>
            
            <div className="mt-4 space-y-2">
              {user.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.location}
                </div>
              )}
              {user.website && (
                <div className="flex items-center text-gray-600">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
            
            {user.bio && (
              <p className="mt-4 text-gray-700">{user.bio}</p>
            )}
          </div>
          
          <GoldDisplay />
        </div>
      </div>
    </div>
  );
}
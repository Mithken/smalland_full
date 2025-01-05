import React from 'react';
import { Trophy } from 'lucide-react';
import type { AwardedTrophy } from '../../types/trophy';

interface ProfileTrophiesProps {
  trophies: AwardedTrophy[];
}

export function ProfileTrophies({ trophies }: ProfileTrophiesProps) {
  if (trophies.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No trophies earned yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {trophies.map(trophy => (
        <div key={trophy.trophyId} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{trophy.trophyName}</h3>
              <p className="text-sm text-gray-500">{trophy.trophyDescription}</p>
              <p className="text-xs text-gray-400 mt-1">
                Awarded {new Date(trophy.awardedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
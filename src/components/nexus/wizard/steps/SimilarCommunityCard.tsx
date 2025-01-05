import React from 'react';
import { Users, BookOpen } from 'lucide-react';

interface SimilarCommunityProps {
  community: {
    name: string;
    villagers: number;
    storiesPerDay: number;
    size: string;
  };
}

export function SimilarCommunityCard({ community }: SimilarCommunityProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-gray-900">{community.name}</h4>
          <span className="text-sm text-gray-500">{community.size}</span>
        </div>
        <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">
          Join
        </button>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>Villagers: {community.villagers.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-1" />
          <span>Avg Story per day: {community.storiesPerDay}</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Users, MessageSquare, Shield } from 'lucide-react';
import type { SubNexus } from '../../types/subnexus';

interface SubNexusHeaderProps {
  subNexus: SubNexus;
}

export function SubNexusHeader({ subNexus }: SubNexusHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{subNexus.name}</h2>
          <p className="text-gray-600 mt-1">{subNexus.description}</p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{subNexus.members.length} members</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MessageSquare className="w-5 h-5 mr-2" />
            <span>{subNexus.storyHistory.length} stories</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Shield className="w-5 h-5 mr-2" />
            <span>{subNexus.moderators.length} moderators</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Shield, Users } from 'lucide-react';
import type { Nexus } from '../../../types/nexus';

interface ModTownhallHeaderProps {
  nexus: Nexus;
}

export function ModTownhallHeader({ nexus }: ModTownhallHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-100 rounded-lg mr-4">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Mod Townhall</h1>
            <p className="text-gray-600 mt-1">
              Private discussion space for {nexus.name} moderators
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>{nexus.moderators?.length || 0} Moderators</span>
          </div>
        </div>
      </div>
    </div>
  );
}
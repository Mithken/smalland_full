import React from 'react';
import { ArrowRight, Vote, AlertTriangle, Tags, Megaphone } from 'lucide-react';
import type { Nexus } from '../../../types/nexus';

interface ManageNexusPanelProps {
  nexus: Nexus;
}

export function ManageNexusPanel({ nexus }: ManageNexusPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Manage Nexus</h3>
      
      <div className="space-y-4">
        <button className="w-full text-left">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <ArrowRight className="w-5 h-5 text-gray-600 mr-2" />
              <span>Transfer Ownership</span>
            </div>
          </div>
        </button>

        <button className="w-full text-left">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <Vote className="w-5 h-5 text-indigo-600 mr-2" />
              <span>Member Votes</span>
            </div>
          </div>
        </button>

        <button className="w-full text-left">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <span>Professional Mod Queue</span>
            </div>
          </div>
        </button>

        <button className="w-full text-left">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <Tags className="w-5 h-5 text-gray-600 mr-2" />
              <span>Nexus Tags</span>
            </div>
          </div>
        </button>

        <button className="w-full text-left">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center">
              <Megaphone className="w-5 h-5 text-yellow-600 mr-2" />
              <span>Nexus Announcement</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
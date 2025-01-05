import React from 'react';
import { Shield, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Nexus } from '../../types/nexus';

interface ModsAndGuildsPanelProps {
  nexus: Nexus;
}

export function ModsAndGuildsPanel({ nexus }: ModsAndGuildsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Manage Mods and Guilds</h3>
      
      <div className="space-y-4">
        <Link
          to={`/nexus/${nexus.nexusId}/modqueue`}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-red-600 mr-2" />
            <div>
              <span className="font-medium">Mod Queue</span>
              <span className="ml-2 text-sm text-red-600">30</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </Link>

        <Link
          to={`/nexus/${nexus.nexusId}/moderators`}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-indigo-600 mr-2" />
            <div>
              <span className="font-medium">Moderators</span>
              <span className="ml-2 text-sm text-gray-600">5</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </Link>

        <Link
          to={`/nexus/${nexus.nexusId}/guildmasters`}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center">
            <Users className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <span className="font-medium">Guild Masters</span>
              <span className="ml-2 text-sm text-gray-600">10</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </Link>
      </div>
    </div>
  );
}
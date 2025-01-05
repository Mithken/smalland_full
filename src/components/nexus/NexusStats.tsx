import React from 'react';
import { Users, MessageSquare, Briefcase, Star } from 'lucide-react';
import type { Nexus } from '../../types/nexus';

interface NexusStatsProps {
  nexus: Nexus;
}

export function NexusStats({ nexus }: NexusStatsProps) {
  const stats = [
    {
      icon: Users,
      label: 'Members',
      value: nexus.memberCount,
      change: '+12% this month'
    },
    {
      icon: MessageSquare,
      label: 'Stories',
      value: nexus.storyCount,
      change: '+5% this week'
    },
    {
      icon: Briefcase,
      label: 'Projects',
      value: nexus.projectCount,
      change: '+3 this month'
    },
    {
      icon: Star,
      label: 'Level',
      value: nexus.level,
      change: '75% to next level'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(({ icon: Icon, label, value, change }) => (
        <div key={label} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center text-gray-600 mb-2">
            <Icon className="w-5 h-5 mr-2" />
            {label}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {value}
          </div>
          <div className="text-sm text-green-600">
            {change}
          </div>
        </div>
      ))}
    </div>
  );
}
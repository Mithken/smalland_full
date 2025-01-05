import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Briefcase, Trophy, Settings } from 'lucide-react';

interface NexusNavigationProps {
  nexusId: string;
}

export function NexusNavigation({ nexusId }: NexusNavigationProps) {
  const links = [
    { icon: Home, label: 'Home', path: `/nexus/${nexusId}` },
    { icon: MessageSquare, label: 'Stories', path: `/nexus/${nexusId}/stories` },
    { icon: Briefcase, label: 'Projects', path: `/nexus/${nexusId}/projects` },
    { icon: Trophy, label: 'Treasures', path: `/nexus/${nexusId}/treasures` },
    { icon: Settings, label: 'Settings', path: `/nexus/${nexusId}/settings` }
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm p-2 flex justify-center space-x-2">
      {links.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <Icon className="w-5 h-5 mr-2" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
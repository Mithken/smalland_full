import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, PlusCircle, Search, Briefcase, Users } from 'lucide-react';

const menuItems = [
  { icon: Globe, label: 'Global Town Square', path: '/townsquare' },
  { icon: PlusCircle, label: '+ Create Story', path: '/create-story' },
  { icon: PlusCircle, label: '+ Create Project', path: '/create-project' },
  { icon: Search, label: 'Find me a Project', path: '/find-project' },
  { icon: Briefcase, label: 'My Projects', path: '/my-projects' },
  { icon: PlusCircle, label: '+ Create Community', path: '/create-community' },
  { icon: Search, label: 'Find me a Community', path: '/find-community' },
  { icon: Users, label: 'My Communities', path: '/my-communities' },
];

export function NexusSidebar() {
  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
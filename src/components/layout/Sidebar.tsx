import React from 'react';
import { NavLink } from 'react-router-dom';
import { Globe, PlusCircle, Search, Briefcase, Users } from 'lucide-react';
import { ROUTES } from '@lib/constants';

const menuItems = [
  { icon: Globe, label: 'Global Town Square', path: ROUTES.TOWN_SQUARE },
  { icon: PlusCircle, label: 'Create Nexus', path: ROUTES.CREATE_NEXUS },
  { icon: PlusCircle, label: 'Create Story', path: ROUTES.CREATE_STORY },
  { icon: PlusCircle, label: 'Create Project', path: ROUTES.CREATE_PROJECT },
  { icon: Search, label: 'Find Projects', path: ROUTES.FIND_PROJECT },
  { icon: Briefcase, label: 'My Projects', path: ROUTES.MY_PROJECTS },
  { icon: Search, label: 'Find Communities', path: ROUTES.FIND_COMMUNITY },
  { icon: Users, label: 'My Communities', path: ROUTES.MY_COMMUNITIES },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
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
    </div>
  );
}
import React from 'react';
import { Coins, Users } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  gold: number;
  roles: string;
}

export function ProjectCard({ title, gold, roles }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Coins className="w-4 h-4 mr-1 text-yellow-600" />
          <span>Gold: {gold}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1 text-indigo-600" />
          <span>Roles {roles}</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Briefcase, Calendar, Sword } from 'lucide-react';
import type { ProjectType } from '../../../types/project';

interface ProjectTypeSelectorProps {
  selectedType: ProjectType;
  onTypeSelect: (type: ProjectType) => void;
}

export function ProjectTypeSelector({ selectedType, onTypeSelect }: ProjectTypeSelectorProps) {
  const types: Array<{ type: ProjectType; icon: typeof Briefcase; label: string; description: string }> = [
    {
      type: 'quest',
      icon: Sword,
      label: 'Quest',
      description: 'Individual tasks for personal achievement'
    },
    {
      type: 'event',
      icon: Calendar,
      label: 'Event',
      description: 'Time-based activities for group participation'
    },
    {
      type: 'project',
      icon: Briefcase,
      label: 'Project',
      description: 'Collaborative work with defined roles and goals'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {types.map(({ type, icon: Icon, label, description }) => (
        <button
          key={type}
          onClick={() => onTypeSelect(type)}
          className={`p-6 rounded-lg border text-left transition-colors ${
            selectedType === type
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Icon className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-medium text-gray-900 mb-1">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </button>
      ))}
    </div>
  );
}
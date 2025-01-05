import React from 'react';
import type { Project } from '../../../types/project';

interface ProjectBasicInfoProps {
  project: Partial<Project>;
  onChange: (updates: Partial<Project>) => void;
}

export function ProjectBasicInfo({ project, onChange }: ProjectBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Name
        </label>
        <input
          type="text"
          value={project.projectName || ''}
          onChange={(e) => onChange({ projectName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter project name..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={project.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-32"
          placeholder="Describe your project..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Goal
        </label>
        <textarea
          value={project.projectGoal || ''}
          onChange={(e) => onChange({ projectGoal: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-24"
          placeholder="What is the main goal of this project?"
        />
      </div>

      {project.projectType === 'event' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <input
            type="datetime-local"
            value={project.eventDate?.slice(0, 16) || ''}
            onChange={(e) => onChange({ eventDate: new Date(e.target.value).toISOString() })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      )}
    </div>
  );
}
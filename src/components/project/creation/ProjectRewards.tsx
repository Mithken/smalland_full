import React from 'react';
import { Coins } from 'lucide-react';
import type { Project, GoldAllocationMethod } from '../../../types/project';

interface ProjectRewardsProps {
  project: Partial<Project>;
  onChange: (updates: Partial<Project>) => void;
}

export function ProjectRewards({ project, onChange }: ProjectRewardsProps) {
  const allocationMethods: Array<{
    value: GoldAllocationMethod;
    label: string;
    description: string;
  }> = [
    {
      value: 'up_front',
      label: 'Up Front',
      description: 'All gold is awarded upon project completion'
    },
    {
      value: 'evenly',
      label: 'Evenly Distributed',
      description: 'Gold is distributed evenly as tasks are completed'
    },
    {
      value: 'ramp_up',
      label: 'Ramp Up',
      description: 'Gold rewards increase as more tasks are completed'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gold Value
        </label>
        <div className="flex items-end gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Gold</label>
            <input
              type="number"
              min="0"
              value={project.goldValue || ''}
              onChange={(e) => onChange({ goldValue: parseInt(e.target.value) })}
              className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Silver</label>
            <input
              type="number"
              min="0"
              value={project.silverValue || ''}
              onChange={(e) => onChange({ silverValue: parseInt(e.target.value) })}
              className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Copper</label>
            <input
              type="number"
              min="0"
              value={project.copperValue || ''}
              onChange={(e) => onChange({ copperValue: parseInt(e.target.value) })}
              className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Gold Allocation Method
        </label>
        <div className="grid grid-cols-3 gap-4">
          {allocationMethods.map(({ value, label, description }) => (
            <button
              key={value}
              onClick={() => onChange({ goldAllocationMethod: value })}
              className={`p-4 rounded-lg border text-left transition-colors ${
                project.goldAllocationMethod === value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Coins className="w-6 h-6 text-indigo-600 mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">{label}</h4>
              <p className="text-sm text-gray-500">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
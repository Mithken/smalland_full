import React from 'react';
import { Coins } from 'lucide-react';
import type { Project } from '../../../types/project';
import { CurrencyDisplay } from '../../currency/CurrencyDisplay';

interface GoldDistributionPreviewProps {
  project: Project;
}

export function GoldDistributionPreview({ project }: GoldDistributionPreviewProps) {
  const totalTasks = project.subTasks.length;
  const goldPerTask = Math.floor((project.goldValue || 0) / totalTasks);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Coins className="w-5 h-5 text-yellow-600 mr-2" />
        Gold Distribution Preview
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <span className="text-yellow-800">Total Project Gold</span>
          <CurrencyDisplay amount={project.goldValue || 0} showDecimal />
        </div>

        {project.goldAllocationMethod === 'up_front' && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              All gold will be distributed equally among participants upon project completion.
            </p>
            <div className="flex justify-between items-center">
              <span>Per participant (estimated)</span>
              <CurrencyDisplay 
                amount={Math.floor((project.goldValue || 0) / (project.projectRoles?.length || 1))} 
                showDecimal 
              />
            </div>
          </div>
        )}

        {project.goldAllocationMethod === 'evenly' && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Gold will be distributed evenly across all tasks.
            </p>
            <div className="flex justify-between items-center">
              <span>Per task completion</span>
              <CurrencyDisplay amount={goldPerTask} showDecimal />
            </div>
          </div>
        )}

        {project.goldAllocationMethod === 'ramp_up' && (
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Gold rewards increase with more task completions.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>First task</span>
                <CurrencyDisplay amount={goldPerTask} showDecimal />
              </div>
              <div className="flex justify-between items-center">
                <span>Final task</span>
                <CurrencyDisplay 
                  amount={goldPerTask * 2} 
                  showDecimal 
                />
              </div>
            </div>
          </div>
        )}

        {project.projectRoles?.map(role => (
          <div 
            key={role.roleId}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <span>{role.roleName}</span>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">
                {role.goldAllocationPct}%
              </span>
              <CurrencyDisplay 
                amount={Math.floor((project.goldValue || 0) * (role.goldAllocationPct || 0) / 100)} 
                showDecimal 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
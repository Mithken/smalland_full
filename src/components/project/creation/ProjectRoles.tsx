import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Project, ProjectRole } from '../../../types/project';

interface ProjectRolesProps {
  project: Partial<Project>;
  onChange: (updates: Partial<Project>) => void;
}

export function ProjectRoles({ project, onChange }: ProjectRolesProps) {
  const [newRole, setNewRole] = useState<Partial<ProjectRole>>({});

  const handleAddRole = () => {
    if (!newRole.roleName) return;

    const role: ProjectRole = {
      roleId: crypto.randomUUID(),
      roleName: newRole.roleName,
      goldAllocationPct: newRole.goldAllocationPct
    };

    onChange({
      projectRoles: [...(project.projectRoles || []), role]
    });
    setNewRole({});
  };

  const handleRemoveRole = (roleId: string) => {
    onChange({
      projectRoles: project.projectRoles?.filter(r => r.roleId !== roleId)
    });
  };

  if (project.projectType === 'quest') {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Roles</h3>

      <div className="space-y-4">
        {project.projectRoles?.map(role => (
          <div 
            key={role.roleId}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{role.roleName}</p>
              {role.goldAllocationPct && (
                <p className="text-sm text-gray-500">
                  Gold Allocation: {role.goldAllocationPct}%
                </p>
              )}
            </div>
            <button
              onClick={() => handleRemoveRole(role.roleId)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role Name
          </label>
          <input
            type="text"
            value={newRole.roleName || ''}
            onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gold %
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={newRole.goldAllocationPct || ''}
            onChange={(e) => setNewRole({ 
              ...newRole, 
              goldAllocationPct: parseInt(e.target.value) 
            })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAddRole}
          disabled={!newRole.roleName}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
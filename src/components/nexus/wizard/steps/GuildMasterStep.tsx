import React, { useState } from 'react';
import { Crown, Plus, Users, Shield } from 'lucide-react';
import type { NexusFormData } from '../types';
import { CreateGuildRoleModal } from './CreateGuildRoleModal';
import { AssignGuildMasterModal } from './AssignGuildMasterModal';

interface GuildMasterStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
}

export function GuildMasterStep({ data, onChange }: GuildMasterStepProps) {
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <p className="text-gray-600">
          In any community there are individuals who contribute more. They may not have 
          authoritative power, but they make the community thrive.
        </p>
        
        <p className="text-gray-600">
          Småland is different from other "Social Media" in that it allows communities 
          to recognize these contributions. This helps reduce "Trolls", "Spam bots", and 
          other negatives while allowing villagers a feeling of who to trust about 
          different needs of the community.
        </p>
        
        <p className="text-gray-600">
          As Seneschal, you can add guild master roles at any time, and assign and 
          remove the title. You can also grant moderators the ability to assign guild masters.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center">
            <Crown className="w-5 h-5 text-yellow-600 mr-2" />
            Guild Master Roles
          </h3>
          <button
            onClick={() => setIsCreateRoleModalOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Role
          </button>
        </div>

        {data.guildRoles?.length ? (
          <div className="space-y-4">
            {data.guildRoles.map((role) => (
              <div 
                key={role.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{role.name}</h4>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Users className="w-4 h-4 mr-1.5" />
                  Assign Members
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No guild master roles created yet
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Moderator Permissions</p>
              <p className="text-sm text-gray-500 mt-1">
                Allow moderators to assign guild master roles to community members
              </p>
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={data.moderatorCanAssignGuildMasters}
                  onChange={(e) => onChange({ 
                    moderatorCanAssignGuildMasters: e.target.checked 
                  })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enable moderator guild master assignment
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {isCreateRoleModalOpen && (
        <CreateGuildRoleModal
          onClose={() => setIsCreateRoleModalOpen(false)}
          onSave={(role) => {
            onChange({
              guildRoles: [...(data.guildRoles || []), role]
            });
            setIsCreateRoleModalOpen(false);
          }}
        />
      )}

      {isAssignModalOpen && (
        <AssignGuildMasterModal
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={(assignments) => {
            onChange({
              guildMasterAssignments: [...(data.guildMasterAssignments || []), ...assignments]
            });
            setIsAssignModalOpen(false);
          }}
          existingMembers={data.moderators || []}
        />
      )}
    </div>
  );
}
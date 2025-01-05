import React from 'react';
import { UserAvatar } from '../user/UserAvatar';
import { useAuthStore } from '../../store/authStore';

interface SubNexusMembersProps {
  members: string[];
}

export function SubNexusMembers({ members }: SubNexusMembersProps) {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Project Members</h3>
      
      <div className="space-y-3">
        {members.map(memberId => (
          <div 
            key={memberId}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <UserAvatar user={null} size="sm" />
              <div>
                <p className="font-medium text-gray-900">
                  {memberId === user?.userId ? 'You' : 'Member Name'}
                </p>
                <p className="text-sm text-gray-500">Member</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
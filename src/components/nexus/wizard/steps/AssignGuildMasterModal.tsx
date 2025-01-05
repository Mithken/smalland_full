import React, { useState } from 'react';
import { X, Search, Users } from 'lucide-react';
import { UserAvatar } from '../../../user/UserAvatar';

interface AssignGuildMasterModalProps {
  onClose: () => void;
  onAssign: (assignments: Array<{ userId: string; roleId: string }>) => void;
  existingMembers: Array<{ type: string; value: string }>;
}

export function AssignGuildMasterModal({ 
  onClose, 
  onAssign,
  existingMembers 
}: AssignGuildMasterModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Assign Guild Master Role</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-medium">Available Members</span>
                </div>
                <span className="text-sm text-gray-500">
                  {selectedUsers.length} selected
                </span>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto p-2 space-y-2">
              {existingMembers.map((member) => (
                <div
                  key={member.value}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <UserAvatar user={null} size="sm" />
                    <div>
                      <p className="font-medium">{member.value}</p>
                      <p className="text-sm text-gray-500">Member</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(member.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, member.value]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== member.value));
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAssign(selectedUsers.map(userId => ({
                userId,
                roleId: 'temp-role-id' // This would be the actual role ID in practice
              })));
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            disabled={selectedUsers.length === 0}
          >
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Search, Users, Mail, Link } from 'lucide-react';

interface InviteModeratorsModalProps {
  onClose: () => void;
  onInvite: (moderators: Array<{ type: string; value: string }>) => void;
}

export function InviteModeratorsModal({ onClose, onInvite }: InviteModeratorsModalProps) {
  const [inviteMethod, setInviteMethod] = useState<'username' | 'email' | 'link'>('username');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Array<{ type: string; value: string }>>([]);

  const handleInvite = () => {
    onInvite(selectedUsers);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Invite Moderators</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setInviteMethod('username')}
              className={`flex-1 p-4 rounded-lg border ${
                inviteMethod === 'username' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-center">Find by Username</p>
            </button>

            <button
              onClick={() => setInviteMethod('email')}
              className={`flex-1 p-4 rounded-lg border ${
                inviteMethod === 'email' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <Mail className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-center">Invite by Email</p>
            </button>

            <button
              onClick={() => setInviteMethod('link')}
              className={`flex-1 p-4 rounded-lg border ${
                inviteMethod === 'link' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
              }`}
            >
              <Link className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-medium text-center">Share Invite Link</p>
            </button>
          </div>

          {inviteMethod === 'username' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="h-48 border border-gray-200 rounded-lg overflow-y-auto p-2">
                {/* User search results would go here */}
                <div className="text-center text-gray-500 mt-8">
                  Start typing to search for users
                </div>
              </div>
            </div>
          )}

          {inviteMethod === 'email' && (
            <div>
              <textarea
                placeholder="Enter email addresses (one per line)"
                className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          )}

          {inviteMethod === 'link' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Share this link with trusted friends:</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value="https://smaland.com/invite/mod/abc123"
                    readOnly
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg"
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                This link will expire in 7 days and can be used up to 5 times.
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Send Invites
          </button>
        </div>
      </div>
    </div>
  );
}
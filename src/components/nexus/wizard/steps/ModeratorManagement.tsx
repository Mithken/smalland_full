import React, { useState } from 'react';
import { Shield, UserPlus, Mail, MessageSquare } from 'lucide-react';
import { InviteModeratorsModal } from './InviteModeratorsModal';
import type { NexusFormData } from '../types';

interface ModeratorManagementProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
}

export function ModeratorManagement({ data, onChange }: ModeratorManagementProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <p className="text-gray-600">
          In any community there are rules and there are people who break the rules. 
          Some times on accident, and sometimes on purpose with something to gain from it.
        </p>
        
        <p className="text-gray-600">
          Rule breaking could be as simple as posting an off topic Story, or as complex 
          as getting many villagers to band together in private messages to attack a minority group.
        </p>
        
        <p className="text-gray-600">
          Moderators keep the community thriving by enforcing the spirit of the community 
          and helping individuals find their voice.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="w-5 h-5 text-indigo-600 mr-2" />
          Moderator Management
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Invite Trusted Friends as Moderators</h4>
              <p className="text-sm text-gray-500">
                Choose people you trust to help maintain community standards
              </p>
            </div>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Moderators
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-4">Moderator Permissions</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MessageSquare className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">See moderation area to discuss actions</p>
                  <p className="text-sm text-gray-500">
                    Private area for moderators to coordinate and discuss moderation activities
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Review reported content</p>
                  <p className="text-sm text-gray-500">
                    Review items that need to have action taken such as stories reported by villagers
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Take moderation actions</p>
                  <p className="text-sm text-gray-500">
                    Remove stories and comments, mute users, restrict posting privileges, and ban users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isInviteModalOpen && (
        <InviteModeratorsModal
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={(moderators) => {
            onChange({
              ...data,
              moderators: [...(data.moderators || []), ...moderators]
            });
            setIsInviteModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
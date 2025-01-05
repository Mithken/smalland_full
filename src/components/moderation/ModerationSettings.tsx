import React from 'react';
import { Shield, AlertTriangle, MessageSquare, User } from 'lucide-react';
import type { Nexus } from '../../types/nexus';

interface ModerationSettingsProps {
  nexus: Nexus;
}

export function ModerationSettings({ nexus }: ModerationSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Moderation Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-900">
                  Auto-remove content after 3 reports
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Automatically remove content that receives multiple reports
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-900">
                  Require approval for new members
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                New members must be approved by moderators
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-900">
                  Filter inappropriate content
                </span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Automatically filter known inappropriate words and phrases
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Moderator Management
        </h3>
        
        <div className="space-y-4">
          {nexus.moderators?.map(moderator => (
            <div
              key={moderator.userId}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    {moderator.displayName}
                  </p>
                  <p className="text-sm text-gray-500">Moderator</p>
                </div>
              </div>
              
              <button className="text-red-600 hover:text-red-700">
                Remove
              </button>
            </div>
          ))}
          
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Add Moderator
          </button>
        </div>
      </div>
    </div>
  );
}
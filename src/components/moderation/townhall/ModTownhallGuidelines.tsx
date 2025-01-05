import React from 'react';
import { BookOpen, Edit2 } from 'lucide-react';

interface ModTownhallGuidelinesProps {
  nexusId: string;
}

export function ModTownhallGuidelines({ nexusId }: ModTownhallGuidelinesProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Moderation Guidelines</h2>
        <button className="flex items-center px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Guidelines
        </button>
      </div>

      <div className="prose max-w-none">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
          <p className="text-yellow-800">
            These guidelines are only visible to moderators and help maintain consistency in moderation actions.
          </p>
        </div>

        <h3>General Principles</h3>
        <ul>
          <li>Be fair and consistent in applying rules</li>
          <li>Always provide clear reasons for moderation actions</li>
          <li>Escalate unclear situations to senior moderators</li>
          <li>Document all significant moderation decisions</li>
        </ul>

        <h3>Content Moderation</h3>
        <ul>
          <li>Remove content that violates community guidelines</li>
          <li>Issue warnings before taking severe actions</li>
          <li>Consider context and user history</li>
          <li>Archive removed content for review</li>
        </ul>

        <h3>User Management</h3>
        <ul>
          <li>Follow the three-strike system for violations</li>
          <li>Temporary bans before permanent actions</li>
          <li>Allow appeals for major decisions</li>
          <li>Document all user interactions</li>
        </ul>
      </div>
    </div>
  );
}
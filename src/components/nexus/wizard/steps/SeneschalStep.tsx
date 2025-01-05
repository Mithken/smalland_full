import React, { useState } from 'react';
import { Shield, Users, Gavel, MessageSquare } from 'lucide-react';
import type { NexusFormData } from '../types';

interface SeneschalStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
}

interface ResponsibilityTab {
  id: 'responsibilities' | 'moderation' | 'guild-masters' | 'projects' | 'treasures' | 'gold' | 'settings';
  label: string;
}

const TABS: ResponsibilityTab[] = [
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'moderation', label: 'Moderation' },
  { id: 'guild-masters', label: 'Guild Masters' },
  { id: 'projects', label: 'Projects' },
  { id: 'treasures', label: 'Treasures' },
  { id: 'gold', label: 'Gold Allocation' },
  { id: 'settings', label: 'Other Settings' }
];

const CORE_RESPONSIBILITIES = [
  {
    title: 'Community Leadership',
    description: 'The Seneschal sets the tone and direction for the Nexus, fostering a positive and productive environment.',
    icon: Shield
  },
  {
    title: 'Oversight',
    description: 'The Seneschal has ultimate authority within the Community, overseeing all activities and ensuring that the community rules are followed.',
    icon: Users
  },
  {
    title: 'Delegation',
    description: 'The Seneschal can delegate responsibilities to Moderators and Guild Masters.',
    icon: Gavel
  },
  {
    title: 'Conflict Resolution',
    description: 'The Seneschal helps resolve disputes and conflicts within the Community.',
    icon: MessageSquare
  }
];

export function SeneschalStep({ data, onChange }: SeneschalStepProps) {
  const [activeTab, setActiveTab] = useState<ResponsibilityTab['id']>('responsibilities');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold">You're now a Seneschal!</h2>
        <div className="px-4 py-2 bg-gray-100 rounded-lg">
          <span className="font-medium">{data.name}</span>
        </div>
      </div>

      <p className="text-gray-600">
        Welcome to making a new home for you and others to gather! Seneschals are the town managers of Småland. 
        They are responsible for the overall health, direction, and management of the community. Think of them 
        as the mayor or governor of their digital town. They have many duties to help the community thrive.
      </p>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'responsibilities' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Core Responsibilities:</h3>
            <div className="grid grid-cols-1 gap-4">
              {CORE_RESPONSIBILITIES.map(responsibility => (
                <div
                  key={responsibility.title}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <responsibility.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {responsibility.title}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      {responsibility.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Other tab content will be implemented as needed */}
        {activeTab !== 'responsibilities' && (
          <div className="h-64 flex items-center justify-center text-gray-500">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} configuration coming soon
          </div>
        )}
      </div>
    </div>
  );
}
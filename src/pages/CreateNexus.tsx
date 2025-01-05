import React from 'react';
import { NexusWizard } from '../components/nexus/wizard/NexusWizard';
import { BasicInfoStep } from '../components/nexus/wizard/steps/BasicInfoStep';
import { SeneschalStep } from '../components/nexus/wizard/steps/SeneschalStep';
import type { NexusFormData } from '../components/nexus/wizard/types';

const WIZARD_STEPS = [
  {
    id: 'basic-info',
    title: 'Creating a Community',
    description: 'Småland is all about building communities. Communities are often formed around a concept such as a legal need of a group of people. It can be based on a region such as a neighborhood, or a project such as a food drive. Småland is all about facilitating the creating and growth of communities. Think through what you want to accomplish with your community and who could help you accomplish these goals.',
    component: BasicInfoStep,
    isValid: (data: NexusFormData) => Boolean(data.name && data.description)
  },
  {
    id: 'seneschal',
    title: 'Seneschal Responsibilities',
    description: 'As a Seneschal, you will be responsible for managing and growing your community. Learn about your roles and responsibilities.',
    component: SeneschalStep,
    isValid: () => true // This step is informational, always valid
  }
  // Additional steps will be added here
];

export function CreateNexus() {
  const handleComplete = (data: NexusFormData) => {
    console.log('Nexus creation complete:', data);
    // Handle nexus creation
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <NexusWizard
        steps={WIZARD_STEPS}
        onComplete={handleComplete}
      />
    </div>
  );
}
import React, { useState } from 'react';
import { WizardProgress } from './WizardProgress';
import { WizardNavigation } from './WizardNavigation';
import type { NexusFormData, WizardStep } from './types';

interface NexusWizardProps {
  steps: WizardStep[];
  onComplete: (data: NexusFormData) => void;
}

export function NexusWizard({ steps, onComplete }: NexusWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<NexusFormData>({
    name: '',
    description: '',
    category: '',
    tags: [],
    guidelines: '',
    roles: [],
    settings: {
      isPrivate: false,
      requiresApproval: false,
      allowsProjects: true,
      allowsStories: true,
      allowsPolls: true
    }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextDisabled = !steps[currentStep].isValid(formData);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[currentStep].title}
          </h2>
          <p className="mt-1 text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="min-h-[400px]">
          {steps[currentStep].component}
        </div>

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
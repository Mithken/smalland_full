import React from 'react';
import { Check } from 'lucide-react';

interface WizardStep {
  title: string;
  component: React.ReactNode;
  isValid: () => boolean;
}

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200" />
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={`mt-2 text-sm ${
                index === currentStep ? 'text-indigo-600 font-medium' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
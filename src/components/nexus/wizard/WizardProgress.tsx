import React from 'react';
import { Check } from 'lucide-react';
import type { WizardStep } from './types';

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
  completedSteps: number[];
}

export function WizardProgress({ steps, currentStep, completedSteps }: WizardProgressProps) {
  return (
    <div className="py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm ${
                      isCurrent ? 'text-indigo-600 font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
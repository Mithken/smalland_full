import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled: boolean;
}

export function WizardNavigation({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack,
  isNextDisabled 
}: WizardNavigationProps) {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {currentStep === totalSteps - 1 ? (
          'Create Nexus'
        ) : (
          <>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </button>
    </div>
  );
}
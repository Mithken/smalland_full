import React from 'react';
import { Coins, ArrowRight } from 'lucide-react';
import type { NexusFormData } from '../types';
import { GoldDistributionSlider } from './GoldDistributionSlider';

interface GoldAllocationStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
  onNext: () => void;
}

export function GoldAllocationStep({ data, onChange, onNext }: GoldAllocationStepProps) {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h3 className="flex items-center text-xl font-semibold">
          <Coins className="w-6 h-6 text-yellow-600 mr-2" />
          Gold Distribution
        </h3>

        <div className="space-y-4 text-gray-600">
          <p>
            As Seneschal you will receive an amount of Gold for your community moderators 
            and Guild masters each month. This gold is used to "Boost" Stories, buy 
            Trophies for excellent stories and comments, start Projects, and keep the 
            community going.
          </p>

          <p>
            It is essentially a way to tip community members for contributing to the 
            community. It represents the social credit generated when people engage 
            with each other in a community.
          </p>

          <p>
            It has no real world value, but can be very motivational in establishing 
            community dynamics.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h4 className="text-lg font-semibold">
          Gold Distribution Between Roles
        </h4>

        <GoldDistributionSlider
          value={data.goldDistribution || 50}
          onChange={(value) => onChange({ goldDistribution: value })}
        />

        <p className="text-sm text-gray-600">
          You should try to find a balance that makes your community thrive with content and projects.
        </p>

        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
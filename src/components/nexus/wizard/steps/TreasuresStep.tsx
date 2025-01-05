import React, { useState } from 'react';
import { Gem, Trophy, Star, Lock } from 'lucide-react';
import { SampleTreasuryModal } from './SampleTreasuryModal';
import type { NexusFormData } from '../types';

interface TreasuresStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
}

export function TreasuresStep({ data, onChange }: TreasuresStepProps) {
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="flex items-center text-xl font-semibold">
            <Gem className="w-6 h-6 text-indigo-600 mr-2" />
            Treasures
          </h3>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Trophy className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-gray-600">
                As Seneschal you can purchase "Treasures" for your community with gold donated to the treasury
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Star className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-gray-600">
                This is how your community progresses from a small town to a thriving metropolis
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Lock className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-gray-600">
                Treasures can be just for display or open new features for the community
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-800">
              Treasures are displayed in the Community treasury and show off who is contributing 
              to the community. That recognition can really motivate community members to contribute.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-6">Treasure Availability</h3>
        
        <div className="space-y-6">
          <p className="text-gray-600">
            Treasures become available as your community accomplishes tasks such as:
          </p>

          <ul className="space-y-3">
            {[
              'Number of Stories or Comments posted',
              'Frequency of posting',
              'Projects completed',
              'Gold acquired'
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsSampleModalOpen(true)}
            className="w-full mt-4 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
          >
            View Sample Treasury
          </button>
        </div>
      </div>

      {isSampleModalOpen && (
        <SampleTreasuryModal onClose={() => setIsSampleModalOpen(false)} />
      )}
    </div>
  );
}
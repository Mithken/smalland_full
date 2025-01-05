import React from 'react';
import { Shield, Award } from 'lucide-react';

interface GoldDistributionSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function GoldDistributionSlider({ value, onChange }: GoldDistributionSliderProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="font-medium text-gray-900">Moderators</div>
          <div className="text-2xl font-bold text-indigo-600">{value}%</div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="font-medium text-gray-900">Guild Masters</div>
          <div className="text-2xl font-bold text-yellow-600">{100 - value}%</div>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${value}%, rgb(202, 138, 4) ${value}%, rgb(202, 138, 4) 100%)`
          }}
        />
        <div 
          className="absolute top-0 left-0 w-full flex justify-between text-xs text-gray-500 px-1"
          style={{ transform: 'translateY(-150%)' }}
        >
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
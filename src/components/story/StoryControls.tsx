import React from 'react';
import { Eye, PieChart, Rocket, Trophy } from 'lucide-react';
import type { Story } from '../../types/story';

interface StoryControlsProps {
  story: Partial<Story>;
  onChange: (story: Partial<Story>) => void;
  onPreview: () => void;
  onSubmit: () => void;
}

export function StoryControls({ story, onChange, onPreview, onSubmit }: StoryControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Preview Button */}
      <button
        onClick={onPreview}
        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Eye className="w-5 h-5 mr-2" />
        Preview Post
      </button>

      {/* Poll Toggle */}
      <div>
        <button
          onClick={() => onChange({ ...story, isPoll: !story.isPoll })}
          className={`w-full flex items-center justify-center px-4 py-2 border rounded-lg ${
            story.isPoll
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          <PieChart className="w-5 h-5 mr-2" />
          Make this a poll
        </button>
      </div>

      {/* Boost Control */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Boost Story
        </label>
        <div className="flex items-center space-x-2">
          <Rocket className="w-5 h-5 text-indigo-600" />
          <input
            type="number"
            min="0"
            placeholder="Add boost amount..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Trophy Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Trophy
        </label>
        <button className="w-full flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Trophy className="w-5 h-5 mr-2" />
          Select Trophy
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Publish Story
      </button>
    </div>
  );
}
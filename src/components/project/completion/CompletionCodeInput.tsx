import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { distributeProjectGold } from '../../../lib/api/gold';

interface CompletionCodeInputProps {
  projectId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function CompletionCodeInput({ projectId, onSuccess, onError }: CompletionCodeInputProps) {
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const success = await distributeProjectGold(projectId, code);
      if (success) {
        onSuccess();
      } else {
        onError('Invalid completion code');
      }
    } catch (error) {
      onError('Failed to process completion code');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Completion Code
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter completion code..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setCode('')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!code || submitting}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-5 h-5 mr-2" />
          Complete Project
        </button>
      </div>
    </form>
  );
}
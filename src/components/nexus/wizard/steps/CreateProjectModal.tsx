import React, { useState } from 'react';
import { X, Plus, Minus, Users, User } from 'lucide-react';

interface ProjectStep {
  id: string;
  description: string;
}

interface CreateProjectModalProps {
  onClose: () => void;
  onSave: (project: {
    id: string;
    name: string;
    type: 'individual' | 'group';
    steps: ProjectStep[];
    goldValue: number;
  }) => void;
}

export function CreateProjectModal({ onClose, onSave }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'individual' | 'group'>('individual');
  const [steps, setSteps] = useState<ProjectStep[]>([{ id: '1', description: '' }]);
  const [goldValue, setGoldValue] = useState(10);

  const handleAddStep = () => {
    setSteps([...steps, { id: crypto.randomUUID(), description: '' }]);
  };

  const handleRemoveStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== id));
    }
  };

  const handleStepChange = (id: string, description: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, description } : step
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: crypto.randomUUID(),
      name,
      type,
      steps,
      goldValue
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold">Create New Project</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType('individual')}
                className={`flex items-center justify-center p-4 rounded-lg border ${
                  type === 'individual' 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Individual
              </button>
              <button
                type="button"
                onClick={() => setType('group')}
                className={`flex items-center justify-center p-4 rounded-lg border ${
                  type === 'group' 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200'
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                Group
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Steps
            </label>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleStepChange(step.id, e.target.value)}
                    placeholder="Describe this step..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(step.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddStep}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gold Value
            </label>
            <input
              type="number"
              min="1"
              value={goldValue}
              onChange={(e) => setGoldValue(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
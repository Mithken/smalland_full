import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { Project, SubTask } from '../../../types/project';
import { validateSubTask } from '../../../utils/project';

interface ProjectSubTasksProps {
  project: Partial<Project>;
  onChange: (updates: Partial<Project>) => void;
}

export function ProjectSubTasks({ project, onChange }: ProjectSubTasksProps) {
  const [newTask, setNewTask] = useState<Partial<SubTask>>({
    status: 'not_started'
  });

  const handleAddTask = () => {
    if (!validateSubTask(newTask)) return;

    const task: SubTask = {
      subTaskId: crypto.randomUUID(),
      taskName: newTask.taskName!,
      description: newTask.description!,
      status: 'not_started',
      timeEstimate: newTask.timeEstimate,
      requiredRoles: newTask.requiredRoles
    };

    onChange({
      subTasks: [...(project.subTasks || []), task]
    });
    setNewTask({ status: 'not_started' });
  };

  const handleRemoveTask = (taskId: string) => {
    onChange({
      subTasks: project.subTasks?.filter(t => t.subTaskId !== taskId)
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Tasks</h3>

      <div className="space-y-4">
        {project.subTasks?.map(task => (
          <div 
            key={task.subTaskId}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{task.taskName}</h4>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                {task.timeEstimate && (
                  <p className="text-sm text-gray-500 mt-2">
                    Estimated time: {task.timeEstimate} hours
                  </p>
                )}
              </div>
              <button
                onClick={() => handleRemoveTask(task.subTaskId)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            value={newTask.taskName || ''}
            onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newTask.description || ''}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-24"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Estimate (hours)
          </label>
          <input
            type="number"
            min="0"
            value={newTask.timeEstimate || ''}
            onChange={(e) => setNewTask({ 
              ...newTask, 
              timeEstimate: parseInt(e.target.value) 
            })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddTask}
            disabled={!validateSubTask(newTask)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
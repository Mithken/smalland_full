import React, { useState } from 'react';
import { Briefcase, Users, Coins, CheckCircle } from 'lucide-react';
import { CreateProjectModal } from './CreateProjectModal';
import type { NexusFormData } from '../types';

interface ProjectsStepProps {
  data: NexusFormData;
  onChange: (data: Partial<NexusFormData>) => void;
}

export function ProjectsStep({ data, onChange }: ProjectsStepProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="prose max-w-none">
          <h3 className="flex items-center text-xl font-semibold">
            <Briefcase className="w-6 h-6 text-indigo-600 mr-2" />
            Projects
          </h3>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-gray-600">
                Projects can be in Real Life or virtual tasks such as a tutorial that all members should view
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Coins className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-gray-600">
                Projects cost gold to set up, and award that gold to individuals who complete the project
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-gray-600">
                Projects can be bonding community experiences that make people feel a part of something
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Your community level is determined, in part, by projects completed. 
              Encouraging members to create and complete projects will bring your community to life.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-6">Create your First Project</h3>
        
        {data.projects?.length > 0 ? (
          <div className="space-y-4">
            {data.projects.map(project => (
              <div 
                key={project.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h4 className="font-medium">{project.name}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Type: {project.type}</p>
                  <p>Steps: {project.steps.length}</p>
                  <p>Gold Value: {project.goldValue}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              No projects created yet. Create your first project to continue.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              + Create Project
            </button>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateProjectModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(project) => {
            onChange({
              projects: [...(data.projects || []), project]
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
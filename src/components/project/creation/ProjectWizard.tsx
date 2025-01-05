import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { ProjectTypeSelector } from './ProjectTypeSelector';
import { ProjectBasicInfo } from './ProjectBasicInfo';
import { ProjectRoles } from './ProjectRoles';
import { ProjectSubTasks } from './ProjectSubTasks';
import { ProjectRewards } from './ProjectRewards';
import { WizardProgress } from './WizardProgress';
import { WizardNavigation } from './WizardNavigation';
import { generateProjectTemplate } from '../../../utils/project';
import { createProject } from '../../../lib/api/project';
import type { Project, ProjectType } from '../../../types/project';

export function ProjectWizard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [project, setProject] = useState<Partial<Project>>(generateProjectTemplate('quest'));

  const handleTypeSelect = (type: ProjectType) => {
    setProject(generateProjectTemplate(type));
  };

  const handleProjectUpdate = (updates: Partial<Project>) => {
    setProject(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreate();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    if (!user) return;

    try {
      const newProject = await createProject(
        'nexus-id', // This would come from context/props
        user.userId,
        project.projectName!,
        project.description!,
        project.projectType!,
        project.projectGoal!
      );

      if (newProject) {
        navigate(`/projects/${newProject.projectId}`);
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const steps = [
    {
      title: 'Project Type',
      component: (
        <ProjectTypeSelector
          selectedType={project.projectType!}
          onTypeSelect={handleTypeSelect}
        />
      ),
      isValid: () => Boolean(project.projectType)
    },
    {
      title: 'Basic Information',
      component: (
        <ProjectBasicInfo
          project={project}
          onChange={handleProjectUpdate}
        />
      ),
      isValid: () => Boolean(
        project.projectName &&
        project.description &&
        project.projectGoal &&
        (!project.projectType || project.projectType !== 'event' || project.eventDate)
      )
    },
    {
      title: 'Project Roles',
      component: (
        <ProjectRoles
          project={project}
          onChange={handleProjectUpdate}
        />
      ),
      isValid: () => project.projectType === 'quest' || (project.projectRoles && project.projectRoles.length > 0)
    },
    {
      title: 'Tasks',
      component: (
        <ProjectSubTasks
          project={project}
          onChange={handleProjectUpdate}
        />
      ),
      isValid: () => Boolean(project.subTasks && project.subTasks.length > 0)
    },
    {
      title: 'Rewards',
      component: (
        <ProjectRewards
          project={project}
          onChange={handleProjectUpdate}
        />
      ),
      isValid: () => true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <WizardProgress
        steps={steps}
        currentStep={currentStep}
      />

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps[currentStep].title}
          </h2>
        </div>

        <div className="min-h-[400px]">
          {steps[currentStep].component}
        </div>

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={!steps[currentStep].isValid()}
        />
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { getProject, createProject, ProjectError } from '@lib/services/project';
import type { Project, ProjectType } from '@types/project';

export function useProject(projectId?: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ProjectError | null>(null);

  useEffect(() => {
    if (!projectId) {
      setProject(null);
      setLoading(false);
      return;
    }

    async function loadProject() {
      try {
        const data = await getProject(projectId);
        setProject(data);
        setError(null);
      } catch (err) {
        setError(err instanceof ProjectError ? err : new ProjectError('Failed to load project'));
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  const createNewProject = async (
    nexusId: string,
    creatorId: string,
    projectName: string,
    description: string,
    projectType: ProjectType,
    projectGoal: string
  ) => {
    try {
      const created = await createProject(
        nexusId,
        creatorId,
        projectName,
        description,
        projectType,
        projectGoal
      );
      setProject(created);
      setError(null);
      return created;
    } catch (err) {
      const error = err instanceof ProjectError ? err : new ProjectError('Failed to create project');
      setError(error);
      throw error;
    }
  };

  return {
    project,
    loading,
    error,
    createProject: createNewProject
  };
}
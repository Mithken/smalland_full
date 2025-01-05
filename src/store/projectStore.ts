import { create } from 'zustand';
import type { Project } from '../types/project';

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      // Fetch projects from API
      const response = await fetch('/api/projects');
      const projects = await response.json();
      set({ projects, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },

  addProject: (project) => {
    set(state => ({
      projects: [...state.projects, project]
    }));
  },

  updateProject: (projectId, updates) => {
    set(state => ({
      projects: state.projects.map(project =>
        project.id === projectId
          ? { ...project, ...updates }
          : project
      )
    }));
  }
}));
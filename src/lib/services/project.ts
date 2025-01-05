import { supabase } from '@lib/supabase';
import type { Project, ProjectType } from '@types/project';

export class ProjectError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ProjectError';
  }
}

export async function createProject(
  nexusId: string,
  creatorId: string,
  projectName: string,
  description: string,
  projectType: ProjectType,
  projectGoal: string
): Promise<Project> {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        nexus_id: nexusId,
        creator_id: creatorId,
        project_name: projectName,
        description,
        project_type: projectType,
        project_goal: projectGoal,
        project_status: 'open'
      })
      .select()
      .single();

    if (error) throw new ProjectError(error.message, error.code);
    if (!project) throw new ProjectError('Failed to create project');

    return {
      projectId: project.id,
      nexusId: project.nexus_id,
      creatorId: project.creator_id,
      projectName: project.project_name,
      description: project.description,
      creationTimestamp: project.created_at,
      lastUpdatedTimestamp: project.updated_at,
      projectType: project.project_type,
      projectGoal: project.project_goal,
      subTasks: [],
      projectStatus: project.project_status
    };
  } catch (error) {
    if (error instanceof ProjectError) throw error;
    throw new ProjectError('Failed to create project');
  }
}

export async function getProject(projectId: string): Promise<Project | null> {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_roles (*),
        project_tasks (*),
        project_files (url),
        project_stories (story_id),
        project_comments (comment_id)
      `)
      .eq('id', projectId)
      .single();

    if (error) throw new ProjectError(error.message, error.code);
    if (!project) return null;

    return {
      projectId: project.id,
      nexusId: project.nexus_id,
      creatorId: project.creator_id,
      projectName: project.project_name,
      description: project.description,
      tags: project.tags,
      creationTimestamp: project.created_at,
      lastUpdatedTimestamp: project.updated_at,
      projectType: project.project_type,
      eventDate: project.event_date,
      projectGoal: project.project_goal,
      projectFiles: project.project_files?.map(f => f.url),
      goldValue: project.gold_value,
      silverValue: project.silver_value,
      copperValue: project.copper_value,
      goldAllocationMethod: project.gold_allocation_method,
      projectRoles: project.project_roles,
      subTasks: project.project_tasks,
      projectStatus: project.project_status,
      projectCompletionCode: project.completion_code,
      projectCompletedBy: project.completed_by,
      projectCompletionTimestamp: project.completion_timestamp,
      projectStories: project.project_stories?.map(s => s.story_id),
      projectComments: project.project_comments?.map(c => c.comment_id)
    };
  } catch (error) {
    if (error instanceof ProjectError) throw error;
    throw new ProjectError('Failed to fetch project');
  }
}
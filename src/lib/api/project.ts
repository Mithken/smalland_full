import { supabase } from '../supabase';
import type { Project, ProjectType } from '../../types/project';

export async function createProject(
  nexusId: string,
  creatorId: string,
  projectName: string,
  description: string,
  projectType: ProjectType,
  projectGoal: string
): Promise<Project | null> {
  const { data: project } = await supabase
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

  if (!project) return null;

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
}

export async function getProject(projectId: string): Promise<Project | null> {
  const { data: project } = await supabase
    .from('projects')
    .select(`
      *,
      project_roles (*),
      sub_tasks (*),
      project_files (url),
      project_stories (story_id),
      project_comments (comment_id)
    `)
    .eq('id', projectId)
    .single();

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
    subTasks: project.sub_tasks,
    projectStatus: project.project_status,
    projectCompletionCode: project.completion_code,
    projectCompletedBy: project.completed_by,
    projectCompletionTimestamp: project.completion_timestamp,
    projectStories: project.project_stories?.map(s => s.story_id),
    projectComments: project.project_comments?.map(c => c.comment_id)
  };
}
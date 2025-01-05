import type { Project, ProjectType, SubTask } from '../types/project';

export function generateProjectTemplate(type: ProjectType): Partial<Project> {
  const baseTemplate = {
    projectStatus: 'open',
    subTasks: [],
    creationTimestamp: new Date().toISOString(),
    lastUpdatedTimestamp: new Date().toISOString()
  };

  switch (type) {
    case 'quest':
      return {
        ...baseTemplate,
        projectType: 'quest',
        goldAllocationMethod: 'up_front'
      };

    case 'event':
      return {
        ...baseTemplate,
        projectType: 'event',
        projectRoles: [],
        goldAllocationMethod: 'evenly',
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // Default to 1 week from now
      };

    case 'project':
      return {
        ...baseTemplate,
        projectType: 'project',
        projectRoles: [],
        goldAllocationMethod: 'ramp_up'
      };
  }
}

export function validateSubTask(subTask: Partial<SubTask>): boolean {
  return Boolean(
    subTask.taskName &&
    subTask.description &&
    subTask.status
  );
}

export function calculateProjectProgress(project: Project): number {
  if (!project.subTasks.length) return 0;
  
  const completedTasks = project.subTasks.filter(
    task => task.status === 'completed'
  ).length;
  
  return Math.round((completedTasks / project.subTasks.length) * 100);
}

export function canCompleteProject(project: Project, userId: string): boolean {
  if (project.projectStatus !== 'in_progress') return false;
  if (!project.subTasks.length) return false;
  
  const allTasksCompleted = project.subTasks.every(
    task => task.status === 'completed'
  );
  
  if (!allTasksCompleted) return false;

  // For quests, only creator can complete
  if (project.projectType === 'quest') {
    return project.creatorId === userId;
  }

  // For projects, any assigned role member can complete
  if (project.projectType === 'project') {
    return project.projectRoles?.some(role => 
      role.assignedUsers?.includes(userId)
    ) || false;
  }

  // For events, creator or any role member can complete
  return project.creatorId === userId || project.projectRoles?.some(role => 
    role.assignedUsers?.includes(userId)
  ) || false;
}
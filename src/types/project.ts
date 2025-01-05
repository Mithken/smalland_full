export type ProjectType = 'quest' | 'event' | 'project';
export type ProjectStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type SubTaskStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';
export type GoldAllocationMethod = 'up_front' | 'evenly' | 'ramp_up';

export interface ProjectRole {
  roleId: string;
  roleName: string;
  assignedUsers?: string[];
  permissions?: string[];
  goldAllocationPct?: number;
}

export interface CompletionRecord {
  userId: string;
  completionTimestamp: string;
  completionCode?: string;
}

export interface SubTask {
  subTaskId: string;
  taskName: string;
  description: string;
  tags?: string[];
  timeEstimate?: number;
  goldValue?: number;
  silverValue?: number;
  copperValue?: number;
  completedBy?: CompletionRecord[];
  requiredRoles?: string[];
  dueDate?: string;
  status: SubTaskStatus;
  assignedTo?: string[];
}

export interface Project {
  projectId: string;
  nexusId: string;
  creatorId: string;
  projectName: string;
  description: string;
  tags?: string[];
  creationTimestamp: string;
  lastUpdatedTimestamp: string;
  projectType: ProjectType;
  eventDate?: string;
  projectGoal: string;
  projectFiles?: string[];
  goldValue?: number;
  silverValue?: number;
  copperValue?: number;
  goldAllocationMethod?: GoldAllocationMethod;
  projectRoles?: ProjectRole[];
  subTasks: SubTask[];
  projectStatus: ProjectStatus;
  projectCompletionCode?: string;
  projectCompletedBy?: string;
  projectCompletionTimestamp?: string;
  projectStories?: string[];
  projectComments?: string[];
}
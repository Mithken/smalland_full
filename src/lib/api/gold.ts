import { supabase } from '../supabase';
import type { Project, SubTask, GoldAllocationMethod } from '../types/project';

export async function distributeProjectGold(
  projectId: string,
  completionCode: string
): Promise<boolean> {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('completion_code', completionCode)
    .single();

  if (!project) return false;

  const { data: completedTasks } = await supabase
    .from('sub_tasks')
    .select('*')
    .eq('project_id', projectId)
    .eq('status', 'completed');

  if (!completedTasks) return false;

  // Get unique users who completed tasks
  const completedUsers = new Set(
    completedTasks.flatMap(task => 
      task.completed_by?.map(completion => completion.user_id) || []
    )
  );

  const goldPerUser = calculateGoldDistribution(
    project.gold_value,
    project.gold_allocation_method,
    Array.from(completedUsers),
    completedTasks
  );

  // Record transactions for each user
  for (const [userId, amount] of Object.entries(goldPerUser)) {
    await supabase.from('gold_transactions').insert({
      user_id: userId,
      amount,
      description: `Project completion reward: ${project.project_name}`,
      transaction_type: 'project_reward',
      project_id: projectId
    });
  }

  return true;
}

function calculateGoldDistribution(
  totalGold: number,
  method: GoldAllocationMethod,
  users: string[],
  tasks: SubTask[]
): Record<string, number> {
  const distribution: Record<string, number> = {};

  switch (method) {
    case 'up_front':
      // Equal distribution among all participants
      const goldPerUser = Math.floor(totalGold / users.length);
      users.forEach(userId => {
        distribution[userId] = goldPerUser;
      });
      break;

    case 'evenly':
      // Distribution based on task completion
      const taskValue = Math.floor(totalGold / tasks.length);
      tasks.forEach(task => {
        task.completedBy?.forEach(completion => {
          distribution[completion.userId] = 
            (distribution[completion.userId] || 0) + taskValue;
        });
      });
      break;

    case 'ramp_up':
      // Increasing rewards for more task completions
      const userTaskCounts: Record<string, number> = {};
      tasks.forEach(task => {
        task.completedBy?.forEach(completion => {
          userTaskCounts[completion.userId] = 
            (userTaskCounts[completion.userId] || 0) + 1;
        });
      });

      const totalTaskCompletions = Object.values(userTaskCounts).reduce((a, b) => a + b, 0);
      Object.entries(userTaskCounts).forEach(([userId, count]) => {
        distribution[userId] = Math.floor(
          (totalGold * count * (count + 1)) / (2 * totalTaskCompletions)
        );
      });
      break;
  }

  return distribution;
}
import { supabase } from '../supabase';
import type { SubNexus } from '../../types/subnexus';

export async function createSubNexus(
  projectId: string,
  name: string,
  description: string,
  members: string[]
): Promise<SubNexus | null> {
  const { data: subNexus } = await supabase
    .from('sub_nexuses')
    .insert({
      project_id: projectId,
      name,
      description,
      members,
      moderators: [members[0]], // Project creator is initial moderator
      chat_id: crypto.randomUUID()
    })
    .select()
    .single();

  if (!subNexus) return null;

  return {
    subNexusId: subNexus.id,
    projectId: subNexus.project_id,
    name: subNexus.name,
    description: subNexus.description,
    members: subNexus.members,
    moderators: subNexus.moderators,
    storyHistory: [],
    chatId: subNexus.chat_id,
    moderationHistory: [],
    createdAt: subNexus.created_at,
    updatedAt: subNexus.updated_at
  };
}

export async function getSubNexus(subNexusId: string): Promise<SubNexus | null> {
  const { data: subNexus } = await supabase
    .from('sub_nexuses')
    .select(`
      *,
      story_history (story_id, created_at),
      moderation_history (*)
    `)
    .eq('id', subNexusId)
    .single();

  if (!subNexus) return null;

  return {
    subNexusId: subNexus.id,
    projectId: subNexus.project_id,
    name: subNexus.name,
    description: subNexus.description,
    members: subNexus.members,
    moderators: subNexus.moderators,
    storyHistory: subNexus.story_history,
    chatId: subNexus.chat_id,
    moderationHistory: subNexus.moderation_history,
    createdAt: subNexus.created_at,
    updatedAt: subNexus.updated_at
  };
}
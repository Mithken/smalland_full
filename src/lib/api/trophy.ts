import { supabase } from '../supabase';
import type { Trophy, AwardedTrophy } from '../../types/trophy';

export async function getTrophy(trophyId: string): Promise<Trophy | null> {
  const { data: trophy } = await supabase
    .from('trophies')
    .select(`
      *,
      trophy_criteria (*)
    `)
    .eq('id', trophyId)
    .single();

  if (!trophy) return null;

  return {
    trophyId: trophy.id,
    trophyName: trophy.name,
    trophyDescription: trophy.description,
    trophyImage: trophy.image_url,
    trophyType: trophy.trophy_type,
    criteria: {
      storiesPosted: trophy.trophy_criteria?.stories_posted,
      commentsPosted: trophy.trophy_criteria?.comments_posted,
      projectsCompleted: trophy.trophy_criteria?.projects_completed,
      goldReceived: trophy.trophy_criteria?.gold_received,
      nexusLevelReached: trophy.trophy_criteria?.nexus_level_reached,
      commentsSaved: trophy.trophy_criteria?.comments_saved,
      storiesSaved: trophy.trophy_criteria?.stories_saved,
      projectsPosted: trophy.trophy_criteria?.projects_posted,
      projectsStarted: trophy.trophy_criteria?.projects_started,
      chatsPosted: trophy.trophy_criteria?.chats_posted,
      nexusJoined: trophy.trophy_criteria?.nexus_joined,
      storyTagged: trophy.trophy_criteria?.story_tagged,
      commentTagged: trophy.trophy_criteria?.comment_tagged,
      projectTagged: trophy.trophy_criteria?.project_tagged,
      storyReceivedGold: trophy.trophy_criteria?.story_received_gold,
      commentReceivedGold: trophy.trophy_criteria?.comment_received_gold,
      nexusTreasuresAcquired: trophy.trophy_criteria?.nexus_treasures_required
    }
  };
}

export async function getStoryTrophies(storyId: string): Promise<AwardedTrophy[]> {
  const { data: trophies } = await supabase
    .from('story_trophies')
    .select('*')
    .eq('story_id', storyId);

  if (!trophies) return [];

  return trophies.map(t => ({
    objectId: t.story_id,
    trophyId: t.trophy_id,
    awardedAt: t.awarded_at
  }));
}

export async function getCommentTrophies(commentId: string): Promise<AwardedTrophy[]> {
  const { data: trophies } = await supabase
    .from('comment_trophies')
    .select('*')
    .eq('comment_id', commentId);

  if (!trophies) return [];

  return trophies.map(t => ({
    objectId: t.comment_id,
    trophyId: t.trophy_id,
    awardedAt: t.awarded_at
  }));
}
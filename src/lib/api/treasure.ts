import { supabase } from '../supabase';
import type { Treasure, NexusTreasure } from '../../types/treasure';

export async function getTreasure(treasureId: string): Promise<Treasure | null> {
  const { data: treasure } = await supabase
    .from('treasures')
    .select('*')
    .eq('id', treasureId)
    .single();

  if (!treasure) return null;

  return {
    treasureId: treasure.id,
    treasureName: treasure.name,
    description: treasure.description,
    baseCost: treasure.base_cost,
    requiredProjects: treasure.required_projects,
    requiredStories: treasure.required_stories,
    requiredComments: treasure.required_comments,
    requiredChats: treasure.required_chats,
    requiredUsers: treasure.required_users,
    speedOfPosting: treasure.speed_of_posting,
    isNegative: treasure.is_negative
  };
}

export async function getNexusTreasures(nexusId: string): Promise<NexusTreasure[]> {
  const { data: nexusTreasures } = await supabase
    .from('nexus_treasures')
    .select('*')
    .eq('nexus_id', nexusId);

  if (!nexusTreasures) return [];

  return nexusTreasures.map(nt => ({
    nexusId: nt.nexus_id,
    treasureId: nt.treasure_id,
    acquiredAt: nt.acquired_at
  }));
}

export async function acquireTreasure(
  nexusId: string,
  treasureId: string
): Promise<NexusTreasure | null> {
  const { data: nexusTreasure } = await supabase
    .from('nexus_treasures')
    .insert({
      nexus_id: nexusId,
      treasure_id: treasureId
    })
    .select()
    .single();

  if (!nexusTreasure) return null;

  return {
    nexusId: nexusTreasure.nexus_id,
    treasureId: nexusTreasure.treasure_id,
    acquiredAt: nexusTreasure.acquired_at
  };
}
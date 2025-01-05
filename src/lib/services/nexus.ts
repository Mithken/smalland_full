import { supabase } from '@lib/supabase';
import type { Nexus } from '@types/nexus';

export class NexusError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'NexusError';
  }
}

export async function createNexus(data: Partial<Nexus>): Promise<Nexus> {
  try {
    const { data: nexus, error } = await supabase
      .from('nexuses')
      .insert({
        name: data.name,
        description: data.description,
        seneschal_id: data.seneschalId,
        settings: data.settings
      })
      .select()
      .single();

    if (error) throw new NexusError(error.message, error.code);
    if (!nexus) throw new NexusError('Failed to create nexus');

    return {
      nexusId: nexus.id,
      name: nexus.name,
      description: nexus.description,
      seneschalId: nexus.seneschal_id,
      treasuryBalance: nexus.treasury_balance,
      level: nexus.level,
      memberCount: 1, // Creator is first member
      storyCount: 0,
      projectCount: 0,
      settings: nexus.settings,
      createdAt: nexus.created_at,
      updatedAt: nexus.updated_at
    };
  } catch (error) {
    if (error instanceof NexusError) throw error;
    throw new NexusError('Failed to create nexus');
  }
}

export async function getNexus(nexusId: string): Promise<Nexus | null> {
  try {
    const { data: nexus, error } = await supabase
      .from('nexuses')
      .select(`
        *,
        nexus_members (profile_id),
        stories (id),
        projects (id),
        moderators:nexus_members (
          profiles (id, display_name, profile_picture)
        )
      `)
      .eq('id', nexusId)
      .single();

    if (error) throw new NexusError(error.message, error.code);
    if (!nexus) return null;

    return {
      nexusId: nexus.id,
      name: nexus.name,
      description: nexus.description,
      seneschalId: nexus.seneschal_id,
      treasuryBalance: nexus.treasury_balance,
      level: nexus.level,
      memberCount: nexus.nexus_members?.length || 0,
      storyCount: nexus.stories?.length || 0,
      projectCount: nexus.projects?.length || 0,
      moderators: nexus.moderators?.map(m => ({
        userId: m.profiles.id,
        displayName: m.profiles.display_name,
        profilePicture: m.profiles.profile_picture
      })),
      settings: nexus.settings,
      createdAt: nexus.created_at,
      updatedAt: nexus.updated_at
    };
  } catch (error) {
    if (error instanceof NexusError) throw error;
    throw new NexusError('Failed to fetch nexus');
  }
}
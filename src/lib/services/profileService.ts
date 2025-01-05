import { supabase } from '@lib/supabase';
import type { Profile, ProfileUpdateData } from '@types/profile';

export class ProfileError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ProfileError';
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    // Simplified query without joins until relationships are established
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw new ProfileError('Failed to fetch profile', error.code);
    if (!profile) return null;

    return {
      id: profile.id,
      username: profile.username,
      displayName: profile.display_name,
      email: profile.email,
      bio: profile.bio || '',
      location: profile.location || '',
      website: profile.website || '',
      profilePicture: profile.profile_picture,
      interests: [], // Will be populated once relationships are set up
      createdAt: profile.created_at,
      updatedAt: profile.updated_at
    };
  } catch (error) {
    if (error instanceof ProfileError) throw error;
    throw new ProfileError('Failed to load profile');
  }
}

export async function getOrCreateProfile(userId: string): Promise<Profile> {
  try {
    let profile = await getProfile(userId);
    if (!profile) {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new ProfileError('No authenticated user');

      const { data: newProfile, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: user.user.email,
          email: user.user.email,
          display_name: user.user.email?.split('@')[0]
        })
        .select()
        .single();

      if (error) throw new ProfileError('Failed to create profile', error.code);
      if (!newProfile) throw new ProfileError('Failed to create profile');

      profile = {
        id: newProfile.id,
        username: newProfile.username,
        displayName: newProfile.display_name,
        email: newProfile.email,
        bio: '',
        location: '',
        website: '',
        interests: [],
        createdAt: newProfile.created_at,
        updatedAt: newProfile.updated_at
      };
    }
    return profile;
  } catch (error) {
    if (error instanceof ProfileError) throw error;
    throw new ProfileError('Failed to get or create profile');
  }
}

export async function updateProfile(userId: string, data: ProfileUpdateData): Promise<Profile> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        display_name: data.displayName,
        bio: data.bio,
        location: data.location,
        website: data.website,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new ProfileError('Failed to update profile', error.code);
    if (!profile) throw new ProfileError('Profile not found');

    return getProfile(userId);
  } catch (error) {
    if (error instanceof ProfileError) throw error;
    throw new ProfileError('Failed to update profile');
  }
}
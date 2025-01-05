import { supabase } from '@lib/supabase';
import type { Profile, ProfileUpdateData } from '@types/profile';

class ProfileError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ProfileError';
  }
}

export async function getProfile(userId: string): Promise<Profile> {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user_interests (interest),
        user_verification_data (phone_number)
      `)
      .eq('id', userId)
      .single();

    if (error) throw new ProfileError('Failed to fetch profile', error.code);
    if (!profile) throw new ProfileError('Profile not found');

    return {
      id: profile.id,
      username: profile.username,
      displayName: profile.display_name,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      profilePicture: profile.profile_picture,
      phone: profile.user_verification_data?.phone_number,
      interests: profile.user_interests?.map(i => i.interest),
      createdAt: profile.created_at,
      updatedAt: profile.updated_at
    };
  } catch (error) {
    if (error instanceof ProfileError) throw error;
    throw new ProfileError('Failed to load profile');
  }
}

export async function updateProfile(userId: string, data: ProfileUpdateData): Promise<Profile> {
  const { phone, interests, ...profileData } = data;

  try {
    // Start transaction
    const { error: txError } = await supabase.rpc('begin_transaction');
    if (txError) throw new ProfileError('Failed to start transaction');

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        display_name: profileData.displayName,
        email: profileData.email,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (profileError) throw new ProfileError('Failed to update profile', profileError.code);

    // Update phone if provided
    if (phone !== undefined) {
      const { error: phoneError } = await supabase
        .from('user_verification_data')
        .upsert({
          user_id: userId,
          phone_number: phone,
          updated_at: new Date().toISOString()
        });

      if (phoneError) throw new ProfileError('Failed to update phone', phoneError.code);
    }

    // Update interests if provided
    if (interests) {
      // Delete existing interests
      const { error: deleteError } = await supabase
        .from('user_interests')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw new ProfileError('Failed to update interests', deleteError.code);

      // Insert new interests
      if (interests.length > 0) {
        const { error: insertError } = await supabase
          .from('user_interests')
          .insert(
            interests.map(interest => ({
              user_id: userId,
              interest: interest.trim()
            }))
          );

        if (insertError) throw new ProfileError('Failed to update interests', insertError.code);
      }
    }

    // Commit transaction
    const { error: commitError } = await supabase.rpc('commit_transaction');
    if (commitError) throw new ProfileError('Failed to commit transaction');

    // Return updated profile
    return getProfile(userId);
  } catch (error) {
    // Rollback transaction
    await supabase.rpc('rollback_transaction');

    if (error instanceof ProfileError) throw error;
    throw new ProfileError('Failed to update profile');
  }
}
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getProfile, updateProfile, ProfileError } from '@lib/services/profileService';
import type { Profile, ProfileUpdateData } from '@types/profile';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ProfileError | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }

    async function loadProfile() {
      try {
        const data = await getProfile(user.id);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err instanceof ProfileError ? err : new ProfileError('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user?.id]);

  const updateUserProfile = async (data: ProfileUpdateData) => {
    if (!user?.id) throw new ProfileError('Not authenticated');
    
    try {
      const updated = await updateProfile(user.id, data);
      setProfile(updated);
      setError(null);
      return updated;
    } catch (err) {
      const error = err instanceof ProfileError ? err : new ProfileError('Failed to update profile');
      setError(error);
      throw error;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile: updateUserProfile
  };
}
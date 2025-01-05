import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { supabase } from '@lib/supabase';
import { getOrCreateProfile } from '@lib/services/profileService';
import type { Profile } from '@types/profile';

export function useAuth() {
  const { user: authUser, signIn: storeSignIn, signOut: storeSignOut } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }

    async function loadProfile() {
      try {
        const userProfile = await getOrCreateProfile(authUser.id);
        setProfile(userProfile);
      } catch (error) {
        console.error('Failed to load profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [authUser?.id]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await storeSignIn(email, password);
  }, [storeSignIn]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await storeSignOut();
    setProfile(null);
  }, [storeSignOut]);

  return {
    user: profile,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!authUser
  };
}
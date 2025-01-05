import { create } from 'zustand';
import { supabase } from '@lib/supabase';
import type { User } from '@supabase/supabase-js';
import { ROUTES } from '@lib/constants';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
      
      // Redirect to profile if it's not completed
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', data.user.id)
        .single();
        
      if (!profile?.display_name) {
        window.location.href = ROUTES.PROFILE;
      } else {
        window.location.href = ROUTES.TOWN_SQUARE;
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to sign in' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
      
      // Always redirect to profile after signup
      window.location.href = ROUTES.PROFILE;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to sign up' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
      window.location.href = ROUTES.HOME;
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to sign out' });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null })
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ user: session?.user ?? null });
});
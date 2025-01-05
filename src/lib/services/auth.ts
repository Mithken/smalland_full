import { supabase } from '@lib/supabase';
import { ProfileError } from './profile';
import type { AuthUser } from '@types/user';

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw new AuthError(error.message, error.status?.toString());
    if (!data.user) throw new AuthError('No user returned from sign in');

    return {
      id: data.user.id,
      email: data.user.email || ''
    };
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to sign in');
  }
}

export async function signUp(email: string, password: string): Promise<AuthUser> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw new AuthError(error.message, error.status?.toString());
    if (!data.user) throw new AuthError('No user returned from sign up');

    return {
      id: data.user.id,
      email: data.user.email || ''
    };
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Failed to sign up');
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new AuthError(error.message, error.status?.toString());
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) return null;

    return {
      id: user.id,
      email: user.email || ''
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
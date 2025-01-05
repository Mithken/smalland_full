export interface AuthUser {
  id: string;
  email: string;
}

export interface UserState {
  profile: Profile | null;
  auth: AuthUser | null;
}
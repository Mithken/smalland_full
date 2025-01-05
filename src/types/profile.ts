export interface ProfileFormData {
  displayName: string;
  email: string;
  bio: string;
  location: string;
  phone?: string;
  interests: string[];
  website: string;
}

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  interests?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdateData {
  displayName?: string;
  email?: string;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  phone?: string | null;
  interests?: string[];
}

export interface ProfileError extends Error {
  code?: string;
}
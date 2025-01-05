// Environment configuration
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  }
} as const;

// Validate required environment variables
if (!config.supabase.url) {
  throw new Error('VITE_SUPABASE_URL is required');
}

if (!config.supabase.anonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is required');
}
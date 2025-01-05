import { supabase } from '../supabase';
import type { User, UserNotification, UserActivity } from '../../types/user';

export async function getUserProfile(userId: string): Promise<User | null> {
  // Get basic profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (!profile) return null;

  // Get social links
  const { data: socialLinks } = await supabase
    .from('user_social_links')
    .select('platform, url')
    .eq('user_id', userId);

  // Get notifications
  const { data: notifications } = await supabase
    .from('user_notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // Get activities
  const { data: activities } = await supabase
    .from('user_activities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // Transform the data into the User type
  const user: User = {
    userId: profile.id,
    username: profile.username,
    displayName: profile.display_name,
    email: profile.email,
    profilePicture: profile.profile_picture,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
    socialLinks: socialLinks?.reduce((acc, { platform, url }) => ({
      ...acc,
      [platform]: url
    }), {}),
    notifications: {
      unread: notifications?.filter(n => !n.read) || [],
      history: notifications?.filter(n => n.read) || []
    },
    storiesVisited: activities
      ?.filter(a => a.activity_type === 'story_visit')
      .map(a => ({
        storyId: a.object_id,
        lastVisitedTimestamp: a.created_at
      })) || [],
    storiesPosted: activities
      ?.filter(a => a.activity_type === 'story_post')
      .map(a => ({
        storyId: a.object_id,
        postTimestamp: a.created_at
      })) || [],
    commentsPosted: activities
      ?.filter(a => a.activity_type === 'comment_post')
      .map(a => ({
        commentId: a.object_id,
        postTimestamp: a.created_at,
        storyId: a.metadata?.story_id
      })) || [],
    commentsSaved: activities
      ?.filter(a => a.activity_type === 'comment_save')
      .map(a => ({
        commentId: a.object_id,
        saveTimestamp: a.created_at,
        storyId: a.metadata?.story_id
      })) || [],
    storiesSaved: activities
      ?.filter(a => a.activity_type === 'story_save')
      .map(a => ({
        storyId: a.object_id,
        saveTimestamp: a.created_at
      })) || [],
    projectsPosted: activities
      ?.filter(a => a.activity_type === 'project_post')
      .map(a => ({
        projectId: a.object_id,
        postTimestamp: a.created_at
      })) || [],
    projectsStarted: activities
      ?.filter(a => a.activity_type === 'project_start')
      .map(a => ({
        projectId: a.object_id,
        joinTimestamp: a.created_at
      })) || [],
    projectsCompleted: activities
      ?.filter(a => a.activity_type === 'project_complete')
      .map(a => ({
        projectId: a.object_id,
        completionTimestamp: a.created_at
      })) || [],
    chatsPosted: activities
      ?.filter(a => a.activity_type === 'chat_post')
      .map(a => ({
        chatId: a.object_id,
        lastPostTimestamp: a.created_at
      })) || []
  };

  return user;
}
import type { UserMatchProfile } from '../../types/matching';
import { supabase } from '../supabase';

export class UserProfileBuilder {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  public async buildMatchProfile(): Promise<UserMatchProfile> {
    const [
      interests,
      skills,
      activity,
      location,
      availability,
      projectHistory,
      recentActivity
    ] = await Promise.all([
      this.getUserInterests(),
      this.getUserSkills(),
      this.calculateActivityLevel(),
      this.getUserLocation(),
      this.getUserAvailability(),
      this.getProjectHistory(),
      this.getRecentActivity()
    ]);

    return {
      interests,
      skills,
      activityLevel: activity,
      location,
      availability,
      projectHistory,
      recentActivity
    };
  }

  private async getUserInterests(): Promise<string[]> {
    const { data } = await supabase
      .from('user_interests')
      .select('interest')
      .eq('user_id', this.userId);

    return data?.map(row => row.interest) || [];
  }

  private async getUserSkills(): Promise<string[]> {
    const { data } = await supabase
      .from('user_skills')
      .select('skill')
      .eq('user_id', this.userId);

    return data?.map(row => row.skill) || [];
  }

  private async calculateActivityLevel(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activities } = await supabase
      .from('user_activities')
      .select('activity_type')
      .eq('user_id', this.userId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    return activities?.length || 0;
  }

  private async getUserLocation(): Promise<UserMatchProfile['location'] | undefined> {
    const { data } = await supabase
      .from('user_verification_data')
      .select('city, state, country')
      .eq('user_id', this.userId)
      .single();

    return data ? {
      city: data.city,
      state: data.state,
      country: data.country
    } : undefined;
  }

  private async getUserAvailability(): Promise<UserMatchProfile['availability']> {
    const { data } = await supabase
      .from('user_preferences')
      .select('hours_per_week, preferred_times')
      .eq('user_id', this.userId)
      .single();

    return {
      hoursPerWeek: data?.hours_per_week || 0,
      preferredTimes: data?.preferred_times || []
    };
  }

  private async getProjectHistory(): Promise<UserMatchProfile['projectHistory']> {
    const { data: projects } = await supabase
      .from('project_members')
      .select('project_status')
      .eq('user_id', this.userId);

    return {
      completed: projects?.filter(p => p.project_status === 'completed').length || 0,
      abandoned: projects?.filter(p => p.project_status === 'abandoned').length || 0,
      active: projects?.filter(p => p.project_status === 'active').length || 0
    };
  }

  private async getRecentActivity(): Promise<UserMatchProfile['recentActivity']> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activities } = await supabase
      .from('user_activities')
      .select('activity_type')
      .eq('user_id', this.userId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    return {
      stories: activities?.filter(a => a.activity_type === 'story_post').length || 0,
      comments: activities?.filter(a => a.activity_type === 'comment_post').length || 0,
      projectContributions: activities?.filter(a => 
        a.activity_type === 'project_contribution'
      ).length || 0
    };
  }
}
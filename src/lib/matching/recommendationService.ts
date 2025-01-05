import { MatchingEngine } from './matchingEngine';
import { UserProfileBuilder } from './userProfileBuilder';
import { supabase } from '../supabase';
import type { MatchResult, MatchableObject } from '../../types/matching';

export class RecommendationService {
  private engine: MatchingEngine;
  private userId: string;

  constructor(userId: string) {
    this.engine = new MatchingEngine();
    this.userId = userId;
  }

  public async getRecommendations(
    type: 'nexus' | 'project' | 'role',
    limit = 10
  ): Promise<MatchResult[]> {
    const [userProfile, objects] = await Promise.all([
      new UserProfileBuilder(this.userId).buildMatchProfile(),
      this.getMatchableObjects(type)
    ]);

    return this.engine.findMatches(userProfile, objects)
      .slice(0, limit);
  }

  private async getMatchableObjects(
    type: 'nexus' | 'project' | 'role'
  ): Promise<MatchableObject[]> {
    switch (type) {
      case 'nexus':
        return this.getNexusObjects();
      case 'project':
        return this.getProjectObjects();
      case 'role':
        return this.getRoleObjects();
    }
  }

  private async getNexusObjects(): Promise<MatchableObject[]> {
    const { data: nexuses } = await supabase
      .from('nexuses')
      .select(`
        id,
        tags,
        required_skills,
        desired_skills,
        activity_level,
        location
      `);

    return nexuses?.map(nexus => ({
      id: nexus.id,
      type: 'nexus',
      requiredSkills: nexus.required_skills || [],
      desiredSkills: nexus.desired_skills || [],
      interests: nexus.tags || [],
      location: nexus.location,
      activityLevel: nexus.activity_level
    })) || [];
  }

  private async getProjectObjects(): Promise<MatchableObject[]> {
    const { data: projects } = await supabase
      .from('projects')
      .select(`
        id,
        tags,
        required_skills,
        desired_skills,
        time_commitment,
        location,
        activity_level
      `)
      .eq('status', 'open');

    return projects?.map(project => ({
      id: project.id,
      type: 'project',
      requiredSkills: project.required_skills || [],
      desiredSkills: project.desired_skills || [],
      interests: project.tags || [],
      timeCommitment: project.time_commitment,
      location: project.location,
      activityLevel: project.activity_level
    })) || [];
  }

  private async getRoleObjects(): Promise<MatchableObject[]> {
    const { data: roles } = await supabase
      .from('project_roles')
      .select(`
        id,
        required_skills,
        desired_skills,
        time_commitment,
        project_id,
        project:projects (
          tags,
          location,
          activity_level
        )
      `)
      .eq('status', 'open');

    return roles?.map(role => ({
      id: role.id,
      type: 'role',
      requiredSkills: role.required_skills || [],
      desiredSkills: role.desired_skills || [],
      interests: role.project?.tags || [],
      timeCommitment: role.time_commitment,
      location: role.project?.location,
      activityLevel: role.project?.activity_level
    })) || [];
  }
}
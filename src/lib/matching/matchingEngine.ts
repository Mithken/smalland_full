import type { 
  MatchScore, 
  MatchResult, 
  UserMatchProfile, 
  MatchableObject 
} from '../../types/matching';

const WEIGHTS = {
  interests: 0.3,
  skills: 0.3,
  activity: 0.2,
  location: 0.1,
  availability: 0.1
};

export class MatchingEngine {
  private calculateInterestMatch(
    userInterests: string[],
    objectInterests: string[]
  ): number {
    if (!objectInterests.length) return 1;
    const matches = objectInterests.filter(interest => 
      userInterests.includes(interest)
    );
    return matches.length / objectInterests.length;
  }

  private calculateSkillMatch(
    userSkills: string[],
    requiredSkills: string[],
    desiredSkills: string[]
  ): number {
    if (!requiredSkills.length && !desiredSkills.length) return 1;

    // Required skills are weighted more heavily
    const requiredMatches = requiredSkills.filter(skill => 
      userSkills.includes(skill)
    );
    const desiredMatches = desiredSkills.filter(skill => 
      userSkills.includes(skill)
    );

    const requiredScore = requiredSkills.length ? 
      requiredMatches.length / requiredSkills.length : 1;
    const desiredScore = desiredSkills.length ? 
      desiredMatches.length / desiredSkills.length : 1;

    // Missing required skills is a deal breaker
    if (requiredScore < 1) return 0;

    return (requiredScore * 0.7) + (desiredScore * 0.3);
  }

  private calculateActivityMatch(
    userActivity: number,
    requiredActivity: number
  ): number {
    if (!requiredActivity) return 1;
    return Math.min(userActivity / requiredActivity, 1);
  }

  private calculateLocationMatch(
    userLocation?: UserMatchProfile['location'],
    objectLocation?: MatchableObject['location']
  ): number {
    if (!objectLocation || !userLocation) return 1;

    let score = 0;
    if (objectLocation.country === userLocation.country) {
      score += 0.4;
      if (objectLocation.state === userLocation.state) {
        score += 0.3;
        if (objectLocation.city === userLocation.city) {
          score += 0.3;
        }
      }
    }
    return score;
  }

  private calculateAvailabilityMatch(
    userAvailability: UserMatchProfile['availability'],
    requiredTime?: number
  ): number {
    if (!requiredTime) return 1;
    return Math.min(userAvailability.hoursPerWeek / requiredTime, 1);
  }

  public calculateMatchScore(
    user: UserMatchProfile,
    object: MatchableObject
  ): MatchScore {
    const interestMatch = this.calculateInterestMatch(
      user.interests,
      object.interests
    );
    
    const skillMatch = this.calculateSkillMatch(
      user.skills,
      object.requiredSkills,
      object.desiredSkills
    );
    
    const activityMatch = this.calculateActivityMatch(
      user.activityLevel,
      object.activityLevel
    );
    
    const locationMatch = this.calculateLocationMatch(
      user.location,
      object.location
    );
    
    const availabilityMatch = this.calculateAvailabilityMatch(
      user.availability,
      object.timeCommitment
    );

    const factors = {
      interestMatch,
      skillMatch,
      activityMatch,
      locationMatch,
      availabilityMatch
    };

    // Calculate weighted score
    const score = (
      interestMatch * WEIGHTS.interests +
      skillMatch * WEIGHTS.skills +
      activityMatch * WEIGHTS.activity +
      locationMatch * WEIGHTS.location +
      availabilityMatch * WEIGHTS.availability
    );

    return { score, factors };
  }

  public findMatches(
    user: UserMatchProfile,
    objects: MatchableObject[],
    threshold = 0.6
  ): MatchResult[] {
    return objects
      .map(object => {
        const { score, factors } = this.calculateMatchScore(user, object);
        
        // Calculate confidence based on available data
        const confidence = this.calculateConfidence(user, object);

        return {
          objectId: object.id,
          objectType: object.type,
          score,
          factors,
          confidence
        };
      })
      .filter(result => result.score >= threshold)
      .sort((a, b) => b.score - a.score);
  }

  private calculateConfidence(
    user: UserMatchProfile,
    object: MatchableObject
  ): number {
    // More data points = higher confidence
    let dataPoints = 0;
    let totalPoints = 0;

    // User profile completeness
    if (user.interests.length) dataPoints++;
    if (user.skills.length) dataPoints++;
    if (user.location) dataPoints++;
    if (user.availability.hoursPerWeek > 0) dataPoints++;
    if (user.projectHistory.completed > 0) dataPoints++;
    totalPoints += 5;

    // Object profile completeness
    if (object.interests.length) dataPoints++;
    if (object.requiredSkills.length) dataPoints++;
    if (object.location) dataPoints++;
    if (object.timeCommitment) dataPoints++;
    totalPoints += 4;

    return dataPoints / totalPoints;
  }
}
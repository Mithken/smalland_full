import React, { useState, useEffect } from 'react';
import { ProjectCard } from '../nexus/ProjectCard';
import { useProjectStore } from '../../store/projectStore';
import type { Project } from '../../types/project';

export function ProjectList() {
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    // In a real app, fetch projects from your API
    const fetchProjects = async () => {
      try {
        // Fetch projects logic here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    </div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Community Projects</h2>
      
      <div className="space-y-4">
        {activeProjects.map(project => (
          <ProjectCard
            key={project.id}
            title={project.title}
            gold={project.goldValue}
            roles={`${project.filledRoles}/${project.totalRoles}`}
          />
        ))}
        
        {showRecommended && recommendedProjects.map(project => (
          <ProjectCard
            key={project.id}
            title={project.title}
            gold={project.goldValue}
            roles={`${project.filledRoles}/${project.totalRoles}`}
          />
        ))}
      </div>
    </div>
  );
}
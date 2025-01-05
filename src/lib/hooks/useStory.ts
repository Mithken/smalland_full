import { useState, useEffect } from 'react';
import { getStory, createStory, StoryError } from '@lib/services/story';
import type { Story } from '@types/story';

export function useStory(storyId?: string) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<StoryError | null>(null);

  useEffect(() => {
    if (!storyId) {
      setStory(null);
      setLoading(false);
      return;
    }

    async function loadStory() {
      try {
        const data = await getStory(storyId);
        setStory(data);
        setError(null);
      } catch (err) {
        setError(err instanceof StoryError ? err : new StoryError('Failed to load story'));
      } finally {
        setLoading(false);
      }
    }

    loadStory();
  }, [storyId]);

  const createNewStory = async (nexusId: string, data: Partial<Story>) => {
    try {
      const created = await createStory(nexusId, data);
      setStory(created);
      setError(null);
      return created;
    } catch (err) {
      const error = err instanceof StoryError ? err : new StoryError('Failed to create story');
      setError(error);
      throw error;
    }
  };

  return {
    story,
    loading,
    error,
    createStory: createNewStory
  };
}
import { supabase } from '@lib/supabase';
import type { Story, StoryContent } from '@types/story';

export class StoryError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'StoryError';
  }
}

export async function createStory(nexusId: string, data: Partial<Story>): Promise<Story> {
  try {
    const { data: story, error } = await supabase
      .from('stories')
      .insert({
        nexus_id: nexusId,
        author_id: (await supabase.auth.getUser()).data.user?.id,
        title: data.title,
        content: data.content?.text,
        title_image: data.titleImage,
        is_poll: data.isPoll,
        poll_question: data.pollQuestion
      })
      .select()
      .single();

    if (error) throw new StoryError(error.message, error.code);
    if (!story) throw new StoryError('Failed to create story');

    return {
      storyId: story.id,
      nexusId: story.nexus_id,
      authorId: story.author_id,
      title: story.title,
      content: {
        text: story.content,
        images: [],
        links: []
      },
      titleImage: story.title_image,
      creationTimestamp: story.created_at,
      lastUpdatedTimestamp: story.updated_at,
      isPoll: story.is_poll,
      pollQuestion: story.poll_question
    };
  } catch (error) {
    if (error instanceof StoryError) throw error;
    throw new StoryError('Failed to create story');
  }
}

export async function getStory(storyId: string): Promise<Story | null> {
  try {
    const { data: story, error } = await supabase
      .from('stories')
      .select(`
        *,
        story_images (url),
        story_links (url),
        story_tags (tag),
        story_boosts (user_id, created_at),
        story_trophies (trophy_id),
        poll_options (id, option_text, vote_count)
      `)
      .eq('id', storyId)
      .single();

    if (error) throw new StoryError(error.message, error.code);
    if (!story) return null;

    return {
      storyId: story.id,
      nexusId: story.nexus_id,
      authorId: story.author_id,
      title: story.title,
      content: {
        text: story.content,
        images: story.story_images?.map(img => img.url) || [],
        links: story.story_links?.map(link => link.url) || []
      },
      titleImage: story.title_image,
      tags: story.story_tags?.map(tag => tag.tag),
      creationTimestamp: story.created_at,
      lastUpdatedTimestamp: story.updated_at,
      goldReceived: story.gold_received,
      boostScore: story.boost_score,
      coinTosses: story.coin_tosses,
      boosts: story.story_boosts?.map(boost => ({
        userId: boost.user_id,
        boostTimestamp: boost.created_at
      })),
      trophiesReceived: story.story_trophies?.map(trophy => trophy.trophy_id),
      isPoll: story.is_poll,
      pollQuestion: story.poll_question,
      pollOptions: story.poll_options?.map(option => ({
        optionText: option.option_text,
        voteCount: option.vote_count
      }))
    };
  } catch (error) {
    if (error instanceof StoryError) throw error;
    throw new StoryError('Failed to fetch story');
  }
}
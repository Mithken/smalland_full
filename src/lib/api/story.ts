import { supabase } from '../supabase';
import type { Story, StoryContent, PollOption } from '../../types/story';

export async function getStory(storyId: string): Promise<Story | null> {
  const { data: story } = await supabase
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

  if (!story) return null;

  const content: StoryContent = {
    text: story.content,
    images: story.story_images?.map(img => img.url),
    links: story.story_links?.map(link => link.url)
  };

  const pollOptions: PollOption[] = story.poll_options?.map(option => ({
    optionText: option.option_text,
    voteCount: option.vote_count
  })) || [];

  return {
    storyId: story.id,
    nexusId: story.nexus_id,
    authorId: story.author_id,
    title: story.title,
    content,
    titleImage: story.title_image,
    bodyImage: story.body_image,
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
    pollOptions: story.is_poll ? pollOptions : undefined
  };
}
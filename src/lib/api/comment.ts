import { supabase } from '../supabase';
import type { Comment, ModerationAction } from '../../types/comment';

export async function getComment(commentId: string): Promise<Comment | null> {
  const { data: comment } = await supabase
    .from('comments')
    .select(`
      *,
      comment_moderation_actions (
        action,
        moderator_id,
        reason,
        created_at,
        nexus_id
      )
    `)
    .eq('id', commentId)
    .single();

  if (!comment) return null;

  const moderationActions: ModerationAction[] = comment.comment_moderation_actions?.map(action => ({
    action: action.action,
    moderatorId: action.moderator_id,
    reason: action.reason,
    timestamp: action.created_at,
    nexusId: action.nexus_id
  })) || [];

  return {
    commentId: comment.id,
    storyId: comment.story_id,
    parentCommentId: comment.parent_comment_id,
    nexusId: comment.nexus_id,
    authorId: comment.author_id,
    commentText: comment.comment_text,
    timestamp: comment.created_at,
    moderationActions,
    goldReceived: comment.gold_received
  };
}

export async function createComment(
  storyId: string,
  nexusId: string,
  commentText: string,
  parentCommentId?: string
): Promise<Comment | null> {
  const { data: comment } = await supabase
    .from('comments')
    .insert({
      story_id: storyId,
      nexus_id: nexusId,
      comment_text: commentText,
      parent_comment_id: parentCommentId,
      author_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (!comment) return null;

  return {
    commentId: comment.id,
    storyId: comment.story_id,
    parentCommentId: comment.parent_comment_id,
    nexusId: comment.nexus_id,
    authorId: comment.author_id,
    commentText: comment.comment_text,
    timestamp: comment.created_at,
    goldReceived: comment.gold_received
  };
}
import { supabase } from '../supabase';
import type { ChatMessage, ChatRoom } from '../../types/chat';

export async function getChatRoom(nexusId: string): Promise<ChatRoom | null> {
  const { data: room } = await supabase
    .from('chat_rooms')
    .select('*')
    .eq('nexus_id', nexusId)
    .eq('is_active', true)
    .single();

  if (!room) return null;

  return {
    roomId: room.id,
    nexusId: room.nexus_id,
    name: room.name,
    description: room.description,
    members: [],
    moderators: [],
    lastActivity: room.updated_at,
    messageCount: 0
  };
}

export async function getChatMessages(
  roomId: string,
  limit: number = 50
): Promise<ChatMessage[]> {
  const { data: messages } = await supabase
    .from('chat_messages')
    .select(`
      id,
      room_id,
      author_id,
      content,
      mentions,
      edited,
      edited_at,
      created_at
    `)
    .eq('room_id', roomId)
    .eq('deleted', false)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (!messages) return [];

  return messages.map(msg => ({
    messageId: msg.id,
    nexusId: msg.room_id,
    authorId: msg.author_id,
    content: msg.content,
    timestamp: msg.created_at,
    edited: msg.edited,
    editedAt: msg.edited_at,
    mentions: msg.mentions
  }));
}

export async function sendChatMessage(
  roomId: string,
  content: string,
  mentions: string[] = []
): Promise<ChatMessage | null> {
  const { data: message } = await supabase
    .rpc('send_chat_message', {
      p_room_id: roomId,
      p_content: content,
      p_mentions: mentions
    })
    .single();

  if (!message) return null;

  return {
    messageId: message.id,
    nexusId: message.room_id,
    authorId: message.author_id,
    content: message.content,
    timestamp: message.created_at,
    mentions: message.mentions
  };
}

export function subscribeToChatMessages(
  roomId: string,
  onMessage: (message: ChatMessage) => void
) {
  return supabase
    .channel(`chat:${roomId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${roomId}`
      },
      (payload) => {
        const message = payload.new as any;
        onMessage({
          messageId: message.id,
          nexusId: message.room_id,
          authorId: message.author_id,
          content: message.content,
          timestamp: message.created_at,
          mentions: message.mentions
        });
      }
    )
    .subscribe();
}

export async function deleteMessage(messageId: string): Promise<boolean> {
  const { error } = await supabase
    .from('chat_messages')
    .update({
      deleted: true,
      deleted_by: (await supabase.auth.getUser()).data.user?.id
    })
    .eq('id', messageId);

  return !error;
}

export async function editMessage(
  messageId: string,
  content: string
): Promise<boolean> {
  const { error } = await supabase
    .from('chat_messages')
    .update({
      content,
      edited: true,
      edited_at: new Date().toISOString()
    })
    .eq('id', messageId);

  return !error;
}
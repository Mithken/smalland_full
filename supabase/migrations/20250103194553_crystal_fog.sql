/*
  # Chat System Implementation

  1. New Tables
    - `chat_rooms`
      - Room configuration and metadata
    - `chat_messages`
      - Message content and metadata
    - `chat_participants`
      - Active chat participants
    - `chat_moderation_actions`
      - Moderation actions on messages

  2. Security
    - Enable RLS on all tables
    - Add policies for member-only access
    - Add policies for moderator actions

  3. Functions
    - Add function for message creation
    - Add function for moderation actions
*/

-- Create chat_rooms table
CREATE TABLE chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  mentions text[] DEFAULT ARRAY[]::text[],
  edited boolean DEFAULT false,
  edited_at timestamptz,
  deleted boolean DEFAULT false,
  deleted_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Create chat_participants table
CREATE TABLE chat_participants (
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  last_read_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (room_id, user_id)
);

-- Create chat_moderation_actions table
CREATE TABLE chat_moderation_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE NOT NULL,
  message_id uuid REFERENCES chat_messages(id) ON DELETE CASCADE,
  moderator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL CHECK (action IN ('delete', 'warn', 'mute', 'ban')),
  reason text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_moderation_actions ENABLE ROW LEVEL SECURITY;

-- Chat rooms policies
CREATE POLICY "Anyone can view active chat rooms"
  ON chat_rooms FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Moderators can manage chat rooms"
  ON chat_rooms FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = chat_rooms.nexus_id
      AND profile_id = auth.uid()
      AND role IN ('moderator', 'seneschal')
    )
  );

-- Chat messages policies
CREATE POLICY "Members can view messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members nm
      JOIN chat_rooms cr ON cr.nexus_id = nm.nexus_id
      WHERE cr.id = chat_messages.room_id
      AND nm.profile_id = auth.uid()
    )
  );

CREATE POLICY "Members can send messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM nexus_members nm
      JOIN chat_rooms cr ON cr.nexus_id = nm.nexus_id
      WHERE cr.id = chat_messages.room_id
      AND nm.profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can edit their own messages"
  ON chat_messages FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Chat participants policies
CREATE POLICY "Members can view participants"
  ON chat_participants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members nm
      JOIN chat_rooms cr ON cr.nexus_id = nm.nexus_id
      WHERE cr.id = chat_participants.room_id
      AND nm.profile_id = auth.uid()
    )
  );

-- Moderation actions policies
CREATE POLICY "Moderators can view and create moderation actions"
  ON chat_moderation_actions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members nm
      JOIN chat_rooms cr ON cr.nexus_id = nm.nexus_id
      WHERE cr.id = chat_moderation_actions.room_id
      AND nm.profile_id = auth.uid()
      AND nm.role IN ('moderator', 'seneschal')
    )
  );

-- Function to send a chat message
CREATE OR REPLACE FUNCTION send_chat_message(
  p_room_id uuid,
  p_content text,
  p_mentions text[] DEFAULT ARRAY[]::text[]
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_message_id uuid;
BEGIN
  INSERT INTO chat_messages (
    room_id,
    author_id,
    content,
    mentions
  ) VALUES (
    p_room_id,
    auth.uid(),
    p_content,
    p_mentions
  )
  RETURNING id INTO v_message_id;

  -- Update participant's last read timestamp
  INSERT INTO chat_participants (room_id, user_id)
  VALUES (p_room_id, auth.uid())
  ON CONFLICT (room_id, user_id)
  DO UPDATE SET last_read_at = now();

  RETURN v_message_id;
END;
$$;
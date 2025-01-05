/*
  # Comments Schema

  1. New Tables
    - `comments`: Main comments table for storing all comment data
    - `comment_moderation_actions`: Track moderation actions on comments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  parent_comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment_text text NOT NULL,
  gold_received integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comment_moderation_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
  moderator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  reason text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_moderation_actions ENABLE ROW LEVEL SECURITY;

-- Comments policies
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Moderation actions policies
CREATE POLICY "Anyone can read moderation actions"
  ON comment_moderation_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Moderators can create moderation actions"
  ON comment_moderation_actions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = comment_moderation_actions.nexus_id
      AND profile_id = auth.uid()
      AND role IN ('moderator', 'seneschal')
    )
  );
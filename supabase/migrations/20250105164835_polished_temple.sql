/*
  # Trophy System Schema
  
  1. Tables
    - trophies: Core trophy definitions
    - trophy_criteria: Achievement requirements
    - story_trophies: Story-trophy relationships
    - comment_trophies: Comment-trophy relationships
    
  2. Security
    - RLS policies for data access control
    - Public read access
    - Moderator-only write access
*/

-- Create base tables first
CREATE TABLE IF NOT EXISTS trophies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  trophy_type text NOT NULL CHECK (trophy_type IN ('achievement', 'community', 'project', 'story', 'comment', 'nexus')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trophy_criteria (
  trophy_id uuid PRIMARY KEY REFERENCES trophies(id) ON DELETE CASCADE,
  stories_posted integer,
  comments_posted integer,
  projects_completed integer,
  gold_received integer,
  nexus_level_reached text,
  comments_saved integer,
  stories_saved integer,
  projects_posted integer,
  projects_started integer,
  chats_posted integer,
  nexus_joined uuid REFERENCES nexuses(id),
  story_tagged text,
  comment_tagged text,
  project_tagged text,
  story_received_gold integer,
  comment_received_gold integer,
  nexus_treasures_required jsonb
);

CREATE TABLE IF NOT EXISTS story_trophies (
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE,
  trophy_id uuid REFERENCES trophies(id) ON DELETE CASCADE,
  awarded_at timestamptz DEFAULT now(),
  PRIMARY KEY (story_id, trophy_id)
);

CREATE TABLE IF NOT EXISTS comment_trophies (
  comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  trophy_id uuid REFERENCES trophies(id) ON DELETE CASCADE,
  awarded_at timestamptz DEFAULT now(),
  PRIMARY KEY (comment_id, trophy_id)
);

-- Now that tables exist, drop any existing policies
DO $$ 
BEGIN
  EXECUTE 'DROP POLICY IF EXISTS "Anyone can read story trophies" ON story_trophies';
  EXECUTE 'DROP POLICY IF EXISTS "Anyone can read comment trophies" ON comment_trophies';
  EXECUTE 'DROP POLICY IF EXISTS "Anyone can read trophies" ON trophies';
  EXECUTE 'DROP POLICY IF EXISTS "Only moderators can manage trophies" ON trophies';
  EXECUTE 'DROP POLICY IF EXISTS "Anyone can read trophy criteria" ON trophy_criteria';
EXCEPTION 
  WHEN undefined_table THEN NULL;
END $$;

-- Enable RLS
ALTER TABLE trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE trophy_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_trophies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read trophies"
  ON trophies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only moderators can manage trophies"
  ON trophies FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE profile_id = auth.uid()
      AND role = 'moderator'
    )
  );

CREATE POLICY "Anyone can read trophy criteria"
  ON trophy_criteria FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read story trophies"
  ON story_trophies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read comment trophies"
  ON comment_trophies FOR SELECT
  TO authenticated
  USING (true);
/*
  # Stories Schema Update

  1. New Tables
    - `stories`: Main stories table
    - `story_images`: Story image references
    - `story_links`: Story link references
    - `story_tags`: Story tag associations
    - `story_boosts`: Story boost tracking
    - `story_trophies`: Story trophy tracking
    - `poll_options`: Poll options for stories
    - `poll_votes`: Poll vote tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  title_image text,
  body_image text,
  gold_received integer DEFAULT 0,
  boost_score integer DEFAULT 0,
  coin_tosses integer DEFAULT 0,
  is_poll boolean DEFAULT false,
  poll_question text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create story_images table
CREATE TABLE IF NOT EXISTS story_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create story_links table
CREATE TABLE IF NOT EXISTS story_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create story_tags table
CREATE TABLE IF NOT EXISTS story_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, tag)
);

-- Create story_boosts table
CREATE TABLE IF NOT EXISTS story_boosts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, user_id)
);

-- Create story_trophies table
CREATE TABLE IF NOT EXISTS story_trophies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  trophy_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(story_id, trophy_id)
);

-- Create poll_options table
CREATE TABLE IF NOT EXISTS poll_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE NOT NULL,
  option_text text NOT NULL,
  vote_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create poll_votes table
CREATE TABLE IF NOT EXISTS poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  option_id uuid REFERENCES poll_options(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(option_id, user_id)
);

-- Enable RLS
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_boosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

-- Stories policies
CREATE POLICY "Anyone can read stories"
  ON stories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create stories"
  ON stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their stories"
  ON stories FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Story components policies (images, links, tags)
CREATE POLICY "Anyone can read story components"
  ON story_images FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can read story links"
  ON story_links FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can read story tags"
  ON story_tags FOR SELECT TO authenticated USING (true);

-- Boosts and trophies policies
CREATE POLICY "Anyone can read story boosts"
  ON story_boosts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can boost stories"
  ON story_boosts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read story trophies"
  ON story_trophies FOR SELECT TO authenticated USING (true);

-- Poll policies
CREATE POLICY "Anyone can read poll options"
  ON poll_options FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can read poll votes"
  ON poll_votes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can vote in polls"
  ON poll_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
/*
  # Treasures Schema

  1. New Tables
    - `treasures`: Main treasures table for storing treasure definitions
    - `nexus_treasures`: Junction table tracking treasures acquired by nexuses

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS treasures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  base_cost integer NOT NULL CHECK (base_cost >= 0),
  required_projects integer,
  required_stories integer,
  required_comments integer,
  required_chats integer,
  required_users integer,
  speed_of_posting integer,
  is_negative boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS nexus_treasures (
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  treasure_id uuid REFERENCES treasures(id) ON DELETE CASCADE NOT NULL,
  acquired_at timestamptz DEFAULT now(),
  PRIMARY KEY (nexus_id, treasure_id)
);

-- Enable RLS
ALTER TABLE treasures ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_treasures ENABLE ROW LEVEL SECURITY;

-- Treasures policies
CREATE POLICY "Anyone can read treasures"
  ON treasures FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only moderators can manage treasures"
  ON treasures FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE profile_id = auth.uid()
      AND role = 'moderator'
    )
  );

-- Nexus treasures policies
CREATE POLICY "Anyone can read nexus treasures"
  ON nexus_treasures FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only seneschals can acquire treasures"
  ON nexus_treasures FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = nexus_treasures.nexus_id
      AND profile_id = auth.uid()
      AND role = 'seneschal'
    )
  );
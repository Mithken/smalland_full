/*
  # Leclerc System Implementation

  1. New Tables
    - `user_households`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `household_members`
      - `household_id` (uuid, references user_households)
      - `user_id` (uuid, references profiles)
      - `household_pct` (integer)
      - `verified` (boolean)
      - `verification_method` (text)
      - `created_at` (timestamptz)

    - `user_verification_data`
      - `user_id` (uuid, references profiles)
      - `ip_addresses` (text[])
      - `devices` (jsonb)
      - `phone_number` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `zip` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_similarity_scores`
      - `user_a_id` (uuid, references profiles)
      - `user_b_id` (uuid, references profiles)
      - `similarity_score` (integer)
      - `last_calculated` (timestamptz)
      - `factors` (jsonb)

  2. Security
    - Enable RLS on all tables
    - Add policies for data access and modification
    - Restrict sensitive operations to moderators

  3. Functions
    - Add function for calculating similarity scores
    - Add function for managing households
    - Add function for verifying users
*/

-- Create user_households table
CREATE TABLE user_households (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create household_members table
CREATE TABLE household_members (
  household_id uuid REFERENCES user_households(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  household_pct integer NOT NULL CHECK (household_pct BETWEEN 1 AND 100),
  verified boolean DEFAULT false,
  verification_method text CHECK (verification_method IN ('phone', 'address', 'moderator')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (household_id, user_id)
);

-- Create user_verification_data table
CREATE TABLE user_verification_data (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  ip_addresses text[] DEFAULT ARRAY[]::text[],
  devices jsonb DEFAULT '[]'::jsonb,
  phone_number text,
  address text,
  city text,
  state text,
  zip text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_similarity_scores table
CREATE TABLE user_similarity_scores (
  user_a_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  user_b_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  similarity_score integer NOT NULL CHECK (similarity_score BETWEEN 1 AND 100),
  last_calculated timestamptz DEFAULT now(),
  factors jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (user_a_id, user_b_id),
  CHECK (user_a_id < user_b_id) -- Ensure consistent ordering and no self-comparisons
);

-- Enable RLS
ALTER TABLE user_households ENABLE ROW LEVEL SECURITY;
ALTER TABLE household_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_verification_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_similarity_scores ENABLE ROW LEVEL SECURITY;

-- User households policies
CREATE POLICY "Moderators can manage households"
  ON user_households FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE role IN ('moderator', 'seneschal')
      AND profile_id = auth.uid()
    )
  );

-- Household members policies
CREATE POLICY "Users can view their own household"
  ON household_members FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Moderators can manage household members"
  ON household_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE role IN ('moderator', 'seneschal')
      AND profile_id = auth.uid()
    )
  );

-- User verification data policies
CREATE POLICY "Users can manage their own verification data"
  ON user_verification_data FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Moderators can view verification data"
  ON user_verification_data FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE role IN ('moderator', 'seneschal')
      AND profile_id = auth.uid()
    )
  );

-- Similarity scores policies
CREATE POLICY "Moderators can view similarity scores"
  ON user_similarity_scores FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE role IN ('moderator', 'seneschal')
      AND profile_id = auth.uid()
    )
  );

-- Function to calculate similarity score between two users
CREATE OR REPLACE FUNCTION calculate_user_similarity(
  p_user_a_id uuid,
  p_user_b_id uuid
) RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_score integer := 0;
  v_factors jsonb := '{}'::jsonb;
  v_user_a user_verification_data;
  v_user_b user_verification_data;
BEGIN
  -- Get user verification data
  SELECT * INTO v_user_a FROM user_verification_data WHERE user_id = p_user_a_id;
  SELECT * INTO v_user_b FROM user_verification_data WHERE user_id = p_user_b_id;

  -- IP address match (30 points)
  IF v_user_a.ip_addresses && v_user_b.ip_addresses THEN
    v_score := v_score + 30;
    v_factors := v_factors || '{"ip_match": true}'::jsonb;
  END IF;

  -- Device match (20 points)
  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(v_user_a.devices) a,
         jsonb_array_elements(v_user_b.devices) b
    WHERE a->>'device_id' = b->>'device_id'
  ) THEN
    v_score := v_score + 20;
    v_factors := v_factors || '{"device_match": true}'::jsonb;
  END IF;

  -- Phone number match (30 points)
  IF v_user_a.phone_number = v_user_b.phone_number 
     AND v_user_a.phone_number IS NOT NULL THEN
    v_score := v_score + 30;
    v_factors := v_factors || '{"phone_match": true}'::jsonb;
  END IF;

  -- Address match (20 points)
  IF v_user_a.address = v_user_b.address 
     AND v_user_a.city = v_user_b.city
     AND v_user_a.state = v_user_b.state
     AND v_user_a.zip = v_user_b.zip
     AND v_user_a.address IS NOT NULL THEN
    v_score := v_score + 20;
    v_factors := v_factors || '{"address_match": true}'::jsonb;
  END IF;

  -- Ensure ordered user IDs and insert/update score
  IF p_user_a_id < p_user_b_id THEN
    INSERT INTO user_similarity_scores (
      user_a_id, user_b_id, similarity_score, factors
    ) VALUES (
      p_user_a_id, p_user_b_id, v_score, v_factors
    )
    ON CONFLICT (user_a_id, user_b_id) DO UPDATE
    SET 
      similarity_score = v_score,
      factors = v_factors,
      last_calculated = now();
  ELSE
    INSERT INTO user_similarity_scores (
      user_a_id, user_b_id, similarity_score, factors
    ) VALUES (
      p_user_b_id, p_user_a_id, v_score, v_factors
    )
    ON CONFLICT (user_a_id, user_b_id) DO UPDATE
    SET 
      similarity_score = v_score,
      factors = v_factors,
      last_calculated = now();
  END IF;

  RETURN v_score;
END;
$$;

-- Function to manage household membership
CREATE OR REPLACE FUNCTION manage_household_membership(
  p_user_ids uuid[],
  p_household_pct integer,
  p_verification_method text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_household_id uuid;
  v_user_id uuid;
BEGIN
  -- Create new household
  INSERT INTO user_households DEFAULT VALUES
  RETURNING id INTO v_household_id;

  -- Add members to household
  FOREACH v_user_id IN ARRAY p_user_ids
  LOOP
    INSERT INTO household_members (
      household_id,
      user_id,
      household_pct,
      verification_method,
      verified
    ) VALUES (
      v_household_id,
      v_user_id,
      p_household_pct,
      p_verification_method,
      p_verification_method IS NOT NULL
    );
  END LOOP;

  RETURN v_household_id;
END;
$$;

-- Add verification data columns to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS address_verified boolean DEFAULT false;
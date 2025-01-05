/*
  # Fix profile tables and related functionality

  1. Ensure profiles table exists with correct schema
  2. Add user interests table
  3. Add verification data table
  4. Update policies and triggers
*/

-- Create user interests table if not exists
CREATE TABLE IF NOT EXISTS user_interests (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  interest text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, interest)
);

-- Create user verification data table if not exists
CREATE TABLE IF NOT EXISTS user_verification_data (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_verification_data ENABLE ROW LEVEL SECURITY;

-- User interests policies
CREATE POLICY "User interests are viewable by everyone"
  ON user_interests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own interests"
  ON user_interests FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Verification data policies
CREATE POLICY "Users can view own verification data"
  ON user_verification_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own verification data"
  ON user_verification_data FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
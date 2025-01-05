/*
  # Initial Schema for Småland Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `display_name` (text)
      - `bio` (text)
      - `gold_balance` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `nexuses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `seneschal_id` (uuid, references profiles)
      - `treasury_balance` (integer)
      - `level` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `nexus_members`
      - `nexus_id` (uuid, references nexuses)
      - `profile_id` (uuid, references profiles)
      - `role` (text)
      - `joined_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text,
  bio text,
  gold_balance integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create nexuses table
CREATE TABLE nexuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  seneschal_id uuid REFERENCES profiles(id),
  treasury_balance integer DEFAULT 0,
  level integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create nexus_members table
CREATE TABLE nexus_members (
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (nexus_id, profile_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Nexuses policies
CREATE POLICY "Anyone can read nexuses"
  ON nexuses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Seneschals can update their nexuses"
  ON nexuses FOR UPDATE
  TO authenticated
  USING (auth.uid() = seneschal_id);

CREATE POLICY "Users can create nexuses"
  ON nexuses FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Nexus members policies
CREATE POLICY "Anyone can read nexus members"
  ON nexus_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Members can join nexuses"
  ON nexus_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (
    new.id,
    new.email,
    split_part(new.email, '@', 1)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
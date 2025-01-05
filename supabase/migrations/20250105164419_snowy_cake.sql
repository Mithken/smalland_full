/*
  # Advertising System Schema
  
  1. Tables
    - ads: Stores ad content and metrics
    - ad_slots: Manages ad placement locations
    - ad_impressions: Tracks ad views
    - nexus_ad_settings: Controls ad configuration per nexus
    
  2. Security
    - RLS policies for each table
    - Seneschal-only management access
    - Public view access for active ads
    
  3. Functions
    - record_ad_impression: Handles impression tracking and gold distribution
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active ads" ON ads;
DROP POLICY IF EXISTS "Seneschals can manage ads" ON ads;
DROP POLICY IF EXISTS "Anyone can view ad slots" ON ad_slots;
DROP POLICY IF EXISTS "Seneschals can manage ad slots" ON ad_slots;
DROP POLICY IF EXISTS "Users can create impressions" ON ad_impressions;
DROP POLICY IF EXISTS "Users can view their own impressions" ON ad_impressions;
DROP POLICY IF EXISTS "Anyone can view ad settings" ON nexus_ad_settings;
DROP POLICY IF EXISTS "Seneschals can manage ad settings" ON nexus_ad_settings;

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  target_url text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'paused', 'ended')),
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  gold_generated numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ad_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  position text NOT NULL CHECK (position IN ('sidebar', 'feed', 'banner')),
  current_ad_id uuid REFERENCES ads(id),
  gold_per_impression numeric NOT NULL DEFAULT 0.01,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ad_impressions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id uuid REFERENCES ads(id) ON DELETE CASCADE NOT NULL,
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  gold_generated numeric NOT NULL DEFAULT 0.01,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS nexus_ad_settings (
  nexus_id uuid PRIMARY KEY REFERENCES nexuses(id) ON DELETE CASCADE,
  ads_enabled boolean DEFAULT false,
  max_ad_slots integer NOT NULL DEFAULT 5,
  current_ad_slots integer NOT NULL DEFAULT 0,
  ad_revenue_per_slot numeric NOT NULL DEFAULT 0.01,
  gold_allocation jsonb NOT NULL DEFAULT '{"moderatorsPct": 50, "rolesPct": 50}'::jsonb,
  seneschal_gold numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (current_ad_slots <= max_ad_slots),
  CHECK (current_ad_slots >= 0)
);

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
  ALTER TABLE ad_slots ENABLE ROW LEVEL SECURITY;
  ALTER TABLE ad_impressions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE nexus_ad_settings ENABLE ROW LEVEL SECURITY;
EXCEPTION 
  WHEN others THEN NULL;
END $$;

-- Recreate policies
CREATE POLICY "Anyone can view active ads"
  ON ads FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Seneschals can manage ads"
  ON ads FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = ads.nexus_id
      AND profile_id = auth.uid()
      AND role = 'seneschal'
    )
  );

CREATE POLICY "Anyone can view ad slots"
  ON ad_slots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Seneschals can manage ad slots"
  ON ad_slots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = ad_slots.nexus_id
      AND profile_id = auth.uid()
      AND role = 'seneschal'
    )
  );

CREATE POLICY "Users can create impressions"
  ON ad_impressions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own impressions"
  ON ad_impressions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can view ad settings"
  ON nexus_ad_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Seneschals can manage ad settings"
  ON nexus_ad_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = nexus_ad_settings.nexus_id
      AND profile_id = auth.uid()
      AND role = 'seneschal'
    )
  );

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS record_ad_impression(uuid, uuid, uuid);

-- Recreate function
CREATE OR REPLACE FUNCTION record_ad_impression(
  p_ad_id uuid,
  p_nexus_id uuid,
  p_user_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_settings nexus_ad_settings;
  v_gold_generated numeric;
BEGIN
  -- Get nexus ad settings
  SELECT * INTO v_settings
  FROM nexus_ad_settings
  WHERE nexus_id = p_nexus_id;

  -- Calculate gold for this impression
  v_gold_generated := v_settings.ad_revenue_per_slot;

  -- Create impression record
  INSERT INTO ad_impressions (
    ad_id,
    nexus_id,
    user_id,
    gold_generated
  ) VALUES (
    p_ad_id,
    p_nexus_id,
    p_user_id,
    v_gold_generated
  );

  -- Update ad metrics
  UPDATE ads
  SET 
    impressions = impressions + 1,
    gold_generated = gold_generated + v_gold_generated,
    updated_at = now()
  WHERE id = p_ad_id;

  -- Update nexus gold
  UPDATE nexus_ad_settings
  SET 
    seneschal_gold = seneschal_gold + v_gold_generated,
    updated_at = now()
  WHERE nexus_id = p_nexus_id;
END;
$$;
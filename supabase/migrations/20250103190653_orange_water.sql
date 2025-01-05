/*
  # Add Moderation Nexus Schema

  1. New Tables
    - `moderation_reports`
      - `id` (uuid, primary key)
      - `report_type` (text)
      - `reported_id` (uuid)
      - `reported_by` (uuid)
      - `reason` (text)
      - `status` (text)
      - `nexus_id` (uuid)
      - `moderator_id` (uuid, nullable)
      - `resolution` (text, nullable)
      - `created_at` (timestamptz)
      - `resolved_at` (timestamptz, nullable)

    - `moderation_actions`
      - `id` (uuid, primary key)
      - `action_type` (text)
      - `target_id` (uuid)
      - `moderator_id` (uuid)
      - `reason` (text)
      - `nexus_id` (uuid)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for moderators and users
*/

-- Create moderation_reports table
CREATE TABLE moderation_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type text NOT NULL CHECK (report_type IN ('story', 'comment', 'user')),
  reported_id uuid NOT NULL,
  reported_by uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  moderator_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  resolution text,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Create moderation_actions table
CREATE TABLE moderation_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type text NOT NULL CHECK (action_type IN ('user_banned', 'story_removed', 'comment_removed')),
  target_id uuid NOT NULL,
  moderator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reason text NOT NULL,
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE moderation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_actions ENABLE ROW LEVEL SECURITY;

-- Moderation reports policies
CREATE POLICY "Users can create reports"
  ON moderation_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can view their own reports"
  ON moderation_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = reported_by);

CREATE POLICY "Moderators can view all reports for their nexus"
  ON moderation_reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = moderation_reports.nexus_id
      AND profile_id = auth.uid()
      AND role IN ('moderator', 'seneschal')
    )
  );

CREATE POLICY "Moderators can update reports for their nexus"
  ON moderation_reports FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = moderation_reports.nexus_id
      AND profile_id = auth.uid()
      AND role IN ('moderator', 'seneschal')
    )
  );

-- Moderation actions policies
CREATE POLICY "Anyone can view moderation actions"
  ON moderation_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Moderators can create actions for their nexus"
  ON moderation_actions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM nexus_members
      WHERE nexus_id = moderation_actions.nexus_id
      AND profile_id = auth.uid()
      AND role IN ('moderator', 'seneschal')
    )
  );

-- Add moderation-related functions
CREATE OR REPLACE FUNCTION create_moderation_report(
  p_report_type text,
  p_reported_id uuid,
  p_reason text,
  p_nexus_id uuid
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_report_id uuid;
BEGIN
  INSERT INTO moderation_reports (
    report_type,
    reported_id,
    reported_by,
    reason,
    nexus_id
  ) VALUES (
    p_report_type,
    p_reported_id,
    auth.uid(),
    p_reason,
    p_nexus_id
  )
  RETURNING id INTO v_report_id;

  RETURN v_report_id;
END;
$$;

CREATE OR REPLACE FUNCTION resolve_moderation_report(
  p_report_id uuid,
  p_resolution text,
  p_action_type text DEFAULT NULL
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update report status
  UPDATE moderation_reports
  SET status = 'resolved',
      resolution = p_resolution,
      moderator_id = auth.uid(),
      resolved_at = now()
  WHERE id = p_report_id
  AND EXISTS (
    SELECT 1 FROM nexus_members
    WHERE nexus_id = moderation_reports.nexus_id
    AND profile_id = auth.uid()
    AND role IN ('moderator', 'seneschal')
  );

  -- Create moderation action if action_type is provided
  IF p_action_type IS NOT NULL THEN
    INSERT INTO moderation_actions (
      action_type,
      target_id,
      moderator_id,
      reason,
      nexus_id
    )
    SELECT
      p_action_type,
      reported_id,
      auth.uid(),
      p_resolution,
      nexus_id
    FROM moderation_reports
    WHERE id = p_report_id;
  END IF;

  RETURN FOUND;
END;
$$;
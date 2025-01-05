/*
  # Initial Project Schema

  1. New Tables
    - `projects` - Core project information
    - `project_roles` - Project role definitions
    - `project_members` - Project member assignments
    - `project_tasks` - Project task tracking
    - `project_comments` - Project-specific comments
    - `project_files` - Project file attachments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for project members and roles
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nexus_id uuid REFERENCES nexuses(id) ON DELETE CASCADE NOT NULL,
  creator_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_name text NOT NULL,
  description text NOT NULL,
  project_type text NOT NULL CHECK (project_type IN ('quest', 'event', 'project')),
  project_goal text NOT NULL,
  event_date timestamptz,
  gold_value integer DEFAULT 0,
  silver_value integer DEFAULT 0,
  copper_value integer DEFAULT 0,
  gold_allocation_method text CHECK (gold_allocation_method IN ('up_front', 'evenly', 'ramp_up')),
  project_status text NOT NULL DEFAULT 'open' CHECK (project_status IN ('open', 'in_progress', 'completed', 'cancelled')),
  completion_code text,
  completed_by uuid REFERENCES profiles(id),
  completion_timestamp timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project roles table
CREATE TABLE IF NOT EXISTS project_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  role_name text NOT NULL,
  gold_allocation_pct integer CHECK (gold_allocation_pct BETWEEN 0 AND 100),
  created_at timestamptz DEFAULT now()
);

-- Create project members table
CREATE TABLE IF NOT EXISTS project_members (
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role_id uuid REFERENCES project_roles(id) ON DELETE SET NULL,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (project_id, user_id)
);

-- Create project tasks table
CREATE TABLE IF NOT EXISTS project_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  task_name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'blocked')),
  time_estimate integer,
  gold_value integer DEFAULT 0,
  silver_value integer DEFAULT 0,
  copper_value integer DEFAULT 0,
  completed_by uuid REFERENCES profiles(id),
  completion_timestamp timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project comments table
CREATE TABLE IF NOT EXISTS project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create project files table
CREATE TABLE IF NOT EXISTS project_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  uploader_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Project creators can update their projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);

-- Project roles policies
CREATE POLICY "Anyone can view project roles"
  ON project_roles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Project creators can manage roles"
  ON project_roles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE id = project_roles.project_id
      AND creator_id = auth.uid()
    )
  );

-- Project members policies
CREATE POLICY "Anyone can view project members"
  ON project_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join projects"
  ON project_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Project tasks policies
CREATE POLICY "Anyone can view project tasks"
  ON project_tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Project members can update tasks"
  ON project_tasks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = project_tasks.project_id
      AND user_id = auth.uid()
    )
  );

-- Project comments policies
CREATE POLICY "Anyone can view project comments"
  ON project_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Project members can create comments"
  ON project_comments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = project_comments.project_id
      AND user_id = auth.uid()
    )
  );

-- Project files policies
CREATE POLICY "Anyone can view project files"
  ON project_files FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Project members can upload files"
  ON project_files FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_id = project_files.project_id
      AND user_id = auth.uid()
    )
  );
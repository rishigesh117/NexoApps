-- PostgreSQL Schema Extension: Autonomous AI Agents & Intelligent Development Assistant
-- NexoApps Platform - Phase 6B (Version 2.2)

-- AI Agents Table
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL, -- 'Software Engineer', 'Project Planner', 'QA Lead', 'Code Reviewer', 'Tech Writer'
  avatar TEXT,
  description TEXT,
  capabilities JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(50) CHECK (status IN ('Active', 'Busy', 'Idle', 'Offline')) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agent Chat Sessions Table
CREATE TABLE IF NOT EXISTS agent_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_title VARCHAR(255) NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agent Tasks Table
CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  task_title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Failed')) DEFAULT 'Pending',
  priority VARCHAR(50) CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')) DEFAULT 'Medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Agent Activity Stream Table
CREATE TABLE IF NOT EXISTS agent_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  action_type VARCHAR(100) NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Plans Table
CREATE TABLE IF NOT EXISTS project_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  target_deadline DATE,
  summary TEXT,
  requirements JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Development Tasks Table
CREATE TABLE IF NOT EXISTS development_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES project_plans(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  assigned_agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  category VARCHAR(100) DEFAULT 'Backend',
  status VARCHAR(50) CHECK (status IN ('Backlog', 'To Do', 'In Progress', 'Code Review', 'Done')) DEFAULT 'Backlog',
  estimated_hours INT DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bug Reports Table
CREATE TABLE IF NOT EXISTS bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path VARCHAR(255) NOT NULL,
  severity VARCHAR(50) CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')) DEFAULT 'Medium',
  issue_title VARCHAR(255) NOT NULL,
  description TEXT,
  suggested_fix TEXT,
  detected_by_agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Code Reviews Table
CREATE TABLE IF NOT EXISTS code_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  pull_request_title VARCHAR(255) NOT NULL,
  quality_score INT DEFAULT 95,
  status VARCHAR(50) CHECK (status IN ('Approved', 'Changes Requested', 'Pending')) DEFAULT 'Approved',
  comments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documentation History Table
CREATE TABLE IF NOT EXISTS documentation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_title VARCHAR(255) NOT NULL,
  doc_type VARCHAR(100) DEFAULT 'API Reference', -- 'README', 'Architecture', 'API Reference'
  content TEXT NOT NULL,
  generated_by_agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sprint Boards Table
CREATE TABLE IF NOT EXISTS sprint_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  sprint_goal TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE DEFAULT CURRENT_DATE + INTERVAL '14 days',
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sprint Tasks Table
CREATE TABLE IF NOT EXISTS sprint_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sprint_id UUID NOT NULL REFERENCES sprint_boards(id) ON DELETE CASCADE,
  task_title VARCHAR(255) NOT NULL,
  assigned_to VARCHAR(100) DEFAULT 'Nexo AI Engineer',
  status VARCHAR(50) CHECK (status IN ('To Do', 'In Progress', 'In Review', 'Done')) DEFAULT 'To Do',
  points INT DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Persistent Agent Memory Table
CREATE TABLE IF NOT EXISTS agent_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  memory_key VARCHAR(255) NOT NULL,
  memory_value TEXT NOT NULL,
  importance_score INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent ON agent_tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_dev_tasks_plan ON development_tasks(plan_id);
CREATE INDEX IF NOT EXISTS idx_bug_reports_sev ON bug_reports(severity);
CREATE INDEX IF NOT EXISTS idx_code_reviews_agent ON code_reviews(reviewer_agent_id);
CREATE INDEX IF NOT EXISTS idx_sprint_tasks_sprint ON sprint_tasks(sprint_id);

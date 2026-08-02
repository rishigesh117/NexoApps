-- PostgreSQL Schema Extension: AI Application Builder & Low-Code Automation
-- NexoApps Platform - Phase 6A (Version 2.1)

-- AI Projects Table
CREATE TABLE IF NOT EXISTS ai_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  framework VARCHAR(50) DEFAULT 'Next.js 14',
  language VARCHAR(50) DEFAULT 'TypeScript',
  styling VARCHAR(50) DEFAULT 'TailwindCSS / Glassmorphism',
  status VARCHAR(50) CHECK (status IN ('Draft', 'Generating', 'Completed', 'Archived')) DEFAULT 'Draft',
  prompt_used TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reusable AI Templates Table
CREATE TABLE IF NOT EXISTS ai_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  preview_url TEXT,
  icon VARCHAR(50) DEFAULT '🚀',
  stars_count INT DEFAULT 0,
  downloads_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Generated Files Table
CREATE TABLE IF NOT EXISTS ai_generated_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ai_projects(id) ON DELETE CASCADE,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) DEFAULT 'typescript',
  content TEXT NOT NULL,
  size_bytes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_project_filepath UNIQUE (project_id, file_path)
);

-- AI Code Generation Jobs Table
CREATE TABLE IF NOT EXISTS ai_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ai_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  status VARCHAR(50) CHECK (status IN ('Pending', 'Processing', 'Completed', 'Failed')) DEFAULT 'Pending',
  progress_percent INT DEFAULT 0,
  files_generated_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- AI Prompt History Table
CREATE TABLE IF NOT EXISTS ai_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES ai_projects(id) ON DELETE SET NULL,
  prompt_text TEXT NOT NULL,
  response_summary TEXT,
  tokens_used INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Low-Code AI Workflows Table
CREATE TABLE IF NOT EXISTS ai_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  trigger_type VARCHAR(100) NOT NULL, -- 'OnUpload', 'OnReview', 'Cron', 'Webhook'
  actions JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Export Packages Table
CREATE TABLE IF NOT EXISTS ai_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ai_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  export_format VARCHAR(50) NOT NULL, -- 'ZIP', 'Next.js', 'React', 'Node.js'
  download_url TEXT NOT NULL,
  size_bytes BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Activity Log Table
CREATE TABLE IF NOT EXISTS ai_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES ai_projects(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Template Categories Table
CREATE TABLE IF NOT EXISTS template_categories (
  slug VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Workflow Execution History Table
CREATE TABLE IF NOT EXISTS workflow_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES ai_workflows(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'Success',
  execution_time_ms INT DEFAULT 0,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- High Performance Indexes
CREATE INDEX IF NOT EXISTS idx_ai_projects_user ON ai_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_gen_files_proj ON ai_generated_files(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_status ON ai_generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_ai_prompts_user ON ai_prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_workflows_user ON ai_workflows(user_id);

-- PostgreSQL Schema Extension: Enterprise Collaboration, Team Workspace & Organization Management
-- NexoApps Platform - Phase 5D

-- Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  description TEXT,
  website_url VARCHAR(255),
  country VARCHAR(100) DEFAULT 'India',
  logo_url TEXT,
  banner_url TEXT,
  status VARCHAR(50) CHECK (status IN ('Active', 'Verified', 'Suspended')) DEFAULT 'Active',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organization Roles Definition
CREATE TABLE IF NOT EXISTS organization_roles (
  role_key VARCHAR(50) PRIMARY KEY,
  role_name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '[]'::jsonb
);

-- Insert Default Organization Roles
INSERT INTO organization_roles (role_key, role_name, description, permissions) VALUES
  ('owner', 'Organization Owner', 'Full control over billing, members, and deletion', '["*"]'::jsonb),
  ('admin', 'Organization Admin', 'Manage projects, members, and API keys', '["manage_members", "manage_projects", "manage_api_keys"]'::jsonb),
  ('pm', 'Project Manager', 'Manage assigned projects and team activity', '["manage_projects", "view_activity"]'::jsonb),
  ('developer', 'Developer', 'Upload APKs, view analytics, and update builds', '["upload_apks", "view_analytics"]'::jsonb),
  ('reviewer', 'Reviewer', 'Review app submissions and audit logs', '["review_submissions", "view_audit"]'::jsonb),
  ('viewer', 'Viewer', 'Read-only access to organization projects', '["view_projects"]'::jsonb)
ON CONFLICT (role_key) DO NOTHING;

-- Organization Members Table
CREATE TABLE IF NOT EXISTS organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) REFERENCES organization_roles(role_key) DEFAULT 'developer',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_org_user UNIQUE (organization_id, user_id)
);

-- Organization Invitations Table
CREATE TABLE IF NOT EXISTS organization_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) REFERENCES organization_roles(role_key) DEFAULT 'developer',
  invited_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('Pending', 'Accepted', 'Rejected', 'Expired')) DEFAULT 'Pending',
  token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days'
);

-- Organization Projects Table
CREATE TABLE IF NOT EXISTS organization_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) CHECK (status IN ('Planning', 'Active', 'Review', 'Completed', 'Archived')) DEFAULT 'Active',
  category VARCHAR(100) DEFAULT 'Android App',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_org_project_slug UNIQUE (organization_id, slug)
);

-- Project Members Assignment Table
CREATE TABLE IF NOT EXISTS project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES organization_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'developer',
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_project_user UNIQUE (project_id, user_id)
);

-- Project Activity Stream Table
CREATE TABLE IF NOT EXISTS project_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES organization_projects(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  actor_name VARCHAR(100) NOT NULL,
  action_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Comments Table
CREATE TABLE IF NOT EXISTS project_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES organization_projects(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  author_name VARCHAR(100) NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Files Table
CREATE TABLE IF NOT EXISTS project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES organization_projects(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_size_bytes BIGINT DEFAULT 0,
  file_type VARCHAR(100) DEFAULT 'application/vnd.android.package-archive',
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Audit Logs Table
CREATE TABLE IF NOT EXISTS project_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organization API Keys Table
CREATE TABLE IF NOT EXISTS project_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  key_name VARCHAR(100) NOT NULL,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  permissions JSONB DEFAULT '["read"]'::jsonb,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organization Notifications Table
CREATE TABLE IF NOT EXISTS organization_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- High-performance indexes
CREATE INDEX IF NOT EXISTS idx_org_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_org_members_user ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_projects_org ON organization_projects(organization_id);
CREATE INDEX IF NOT EXISTS idx_project_activity_org ON project_activity(organization_id);
CREATE INDEX IF NOT EXISTS idx_project_api_keys_org ON project_api_keys(organization_id);

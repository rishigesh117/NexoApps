-- Database Schema Foundation: Developer Portal & Admin Dashboard
-- NexoApps Platform - Phase 3E

-- 1. Developers Table
CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  website VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  status VARCHAR(50) DEFAULT 'Active', -- Active, Suspended, Pending Verification
  is_verified BOOLEAN DEFAULT FALSE,
  total_apps INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. App Submissions Table
CREATE TABLE IF NOT EXISTS app_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id UUID NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
  app_id UUID REFERENCES apps(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  version VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending Review', -- Pending Review, Approved, Rejected, In Changes
  submission_notes TEXT,
  apk_file TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. App Versions Table
CREATE TABLE IF NOT EXISTS app_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  version VARCHAR(50) NOT NULL,
  apk_file TEXT NOT NULL,
  file_size VARCHAR(50),
  release_notes TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  download_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Download Logs Table
CREATE TABLE IF NOT EXISTS download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  ip_address VARCHAR(100),
  user_agent TEXT,
  device_info VARCHAR(255),
  download_token VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admin Notifications Table
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info', -- info, warning, alert, submission
  is_read BOOLEAN DEFAULT FALSE,
  target_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Admin Activity Logs Table
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50), -- App, User, Developer, Review
  target_id VARCHAR(255),
  details TEXT,
  ip_address VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_developers_user_id ON developers(user_id);
CREATE INDEX IF NOT EXISTS idx_app_submissions_developer_id ON app_submissions(developer_id);
CREATE INDEX IF NOT EXISTS idx_app_versions_app_id ON app_versions(app_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_app_id ON download_logs(app_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_created_at ON download_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_activity_created_at ON admin_activity_logs(created_at);

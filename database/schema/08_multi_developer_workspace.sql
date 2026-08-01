-- Database Schema Extension: Multi-Developer Workspace & Submission Management
-- NexoApps Platform - Phase 4C

-- Table: Developer Profiles
CREATE TABLE IF NOT EXISTS developer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) UNIQUE NOT NULL,
  studio_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT,
  country VARCHAR(100) DEFAULT 'United States',
  website VARCHAR(255),
  support_email VARCHAR(255) NOT NULL,
  logo_url TEXT,
  banner_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  portfolio_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Verified, Rejected, Suspended
  is_verified BOOLEAN DEFAULT FALSE,
  total_apps INT DEFAULT 0,
  followers_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Developer Applications (Member -> Developer Application Queue)
CREATE TABLE IF NOT EXISTS developer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  studio_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  website VARCHAR(255),
  support_email VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  portfolio_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Approved, Rejected
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Table: Submission Queue (Owner & Admin Review Panel)
CREATE TABLE IF NOT EXISTS submission_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(255) NOT NULL,
  developer_id VARCHAR(255) NOT NULL,
  submission_type VARCHAR(50) DEFAULT 'New Release', -- 'New Release' | 'Version Update'
  app_title VARCHAR(255) NOT NULL,
  version_name VARCHAR(50) NOT NULL,
  build_number INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  changes_summary TEXT,
  status VARCHAR(50) DEFAULT 'Pending Review', -- 'Pending Review' | 'Approved' | 'Rejected' | 'Changes Requested'
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Table: Submission Comments (Review Discussion Thread)
CREATE TABLE IF NOT EXISTS submission_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id VARCHAR(255) NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(50) NOT NULL, -- 'ADMIN' | 'OWNER' | 'DEVELOPER'
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Developer Notifications
CREATE TABLE IF NOT EXISTS developer_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- submission_received, approved, rejected, needs_changes, new_review, app_featured, version_published
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Developer Followers (Placeholder)
CREATE TABLE IF NOT EXISTS developer_followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id VARCHAR(255) NOT NULL,
  follower_user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Developer Workspace
CREATE INDEX IF NOT EXISTS idx_developer_profiles_username ON developer_profiles(username);
CREATE INDEX IF NOT EXISTS idx_developer_profiles_user_id ON developer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_submission_queue_status ON submission_queue(status);
CREATE INDEX IF NOT EXISTS idx_submission_queue_developer_id ON submission_queue(developer_id);
CREATE INDEX IF NOT EXISTS idx_developer_notifications_dev_id ON developer_notifications(developer_id);

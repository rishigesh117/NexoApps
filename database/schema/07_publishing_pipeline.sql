-- Database Schema Extension: Advanced Publishing Pipeline & Owner Analytics
-- NexoApps Platform - Phase 4B

-- Add lifecycle state column to apps table
ALTER TABLE apps ADD COLUMN IF NOT EXISTS lifecycle_state VARCHAR(50) DEFAULT 'Published';
-- States: 'Draft', 'Pending Validation', 'Ready', 'Published', 'Archived', 'Deleted'

-- Table: App Versions History
CREATE TABLE IF NOT EXISTS app_versions_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(255) NOT NULL,
  version_name VARCHAR(50) NOT NULL,
  build_number INT NOT NULL,
  release_date DATE NOT NULL,
  release_notes TEXT,
  bug_fixes TEXT,
  known_issues TEXT,
  apk_file TEXT,
  apk_checksum VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: APK Validation Reports
CREATE TABLE IF NOT EXISTS apk_validation_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(255),
  package_name VARCHAR(255) NOT NULL,
  version_name VARCHAR(50) NOT NULL,
  build_number INT NOT NULL,
  is_valid BOOLEAN DEFAULT TRUE,
  validation_errors JSONB DEFAULT '[]'::jsonb,
  validation_warnings JSONB DEFAULT '[]'::jsonb,
  checksum VARCHAR(255),
  min_sdk VARCHAR(50),
  target_sdk VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Owner Notifications
CREATE TABLE IF NOT EXISTS owner_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: App Lifecycle Timeline
CREATE TABLE IF NOT EXISTS app_lifecycle_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Publishing Pipeline
CREATE INDEX IF NOT EXISTS idx_apps_lifecycle_state ON apps(lifecycle_state);
CREATE INDEX IF NOT EXISTS idx_app_versions_app_id ON app_versions_history(app_id);
CREATE INDEX IF NOT EXISTS idx_owner_notifications_is_read ON owner_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_app_lifecycle_app_id ON app_lifecycle_timeline(app_id);

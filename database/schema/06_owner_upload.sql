-- Database Schema Extension: Owner Upload Portal & App Lifecycle
-- NexoApps Platform - Phase 4A

-- Add columns for detailed app publishing, storage, permissions, and lifecycle
ALTER TABLE apps ADD COLUMN IF NOT EXISTS package_name VARCHAR(255) UNIQUE;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS build_number INT DEFAULT 1;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS visibility VARCHAR(50) DEFAULT 'Public'; -- Public, Private, Unlisted
ALTER TABLE apps ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS apk_checksum VARCHAR(255);
ALTER TABLE apps ADD COLUMN IF NOT EXISTS apk_path TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS icon_path TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS banner_path TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS cover_path TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS feature_list JSONB DEFAULT '[]'::jsonb;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS release_notes TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS bug_fixes TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS known_issues TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS coming_soon TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS privacy_policy_url TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS support_email VARCHAR(255);
ALTER TABLE apps ADD COLUMN IF NOT EXISTS target_android_version VARCHAR(50);
ALTER TABLE apps ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT FALSE;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE;

-- Indexes for Upload Portal
CREATE INDEX IF NOT EXISTS idx_apps_package_name ON apps(package_name);
CREATE INDEX IF NOT EXISTS idx_apps_is_draft ON apps(is_draft);
CREATE INDEX IF NOT EXISTS idx_apps_is_archived ON apps(is_archived);

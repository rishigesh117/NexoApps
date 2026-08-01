-- PostgreSQL Schema Extension: Cloud Sync, Multi-Device & Backup
-- NexoApps Platform - Phase 5C

-- User Devices Table
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(100) NOT NULL,
  device_type VARCHAR(50) CHECK (device_type IN ('phone', 'tablet', 'desktop', 'laptop', 'chromebook', 'other')) DEFAULT 'desktop',
  browser VARCHAR(100),
  operating_system VARCHAR(100),
  ip_address VARCHAR(45),
  is_current BOOLEAN DEFAULT FALSE,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sync Sessions Table
CREATE TABLE IF NOT EXISTS sync_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  sync_type VARCHAR(30) CHECK (sync_type IN ('full', 'incremental', 'preferences', 'offline_merge')) DEFAULT 'incremental',
  status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')) DEFAULT 'pending',
  items_synced INT DEFAULT 0,
  items_total INT DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Cloud Backups Table
CREATE TABLE IF NOT EXISTS cloud_backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  backup_name VARCHAR(255) NOT NULL,
  backup_size_bytes BIGINT DEFAULT 0,
  encryption_hash VARCHAR(128),
  includes JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(20) CHECK (status IN ('creating', 'completed', 'failed', 'restoring', 'verified')) DEFAULT 'creating',
  version INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sync History Table
CREATE TABLE IF NOT EXISTS sync_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL,
  details TEXT,
  status VARCHAR(20) DEFAULT 'success',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'dark',
  language VARCHAR(10) DEFAULT 'en',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  auto_sync BOOLEAN DEFAULT TRUE,
  auto_backup BOOLEAN DEFAULT FALSE,
  dashboard_layout JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Offline Changes Queue Table
CREATE TABLE IF NOT EXISTS offline_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(255) NOT NULL,
  action VARCHAR(20) CHECK (action IN ('create', 'update', 'delete')) NOT NULL,
  payload JSONB NOT NULL,
  synced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notification Sync Table
CREATE TABLE IF NOT EXISTS notification_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_id VARCHAR(255) NOT NULL,
  read_on_device UUID REFERENCES user_devices(id),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Download Sync Table
CREATE TABLE IF NOT EXISTS download_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  app_id VARCHAR(255) NOT NULL,
  downloaded_on_device UUID REFERENCES user_devices(id),
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recent Activity Table
CREATE TABLE IF NOT EXISTS recent_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  device_id UUID REFERENCES user_devices(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sync Conflicts Table
CREATE TABLE IF NOT EXISTS sync_conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(255) NOT NULL,
  local_value JSONB,
  remote_value JSONB,
  resolution VARCHAR(20) CHECK (resolution IN ('pending', 'local_wins', 'remote_wins', 'manual_merge')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_devices_user ON user_devices(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_sessions_user ON sync_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_cloud_backups_user ON cloud_backups(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_history_user ON sync_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_offline_changes_user ON offline_changes(user_id, synced);
CREATE INDEX IF NOT EXISTS idx_recent_activity_user ON recent_activity(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_conflicts_user ON sync_conflicts(user_id, resolution);

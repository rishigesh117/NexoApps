-- PostgreSQL Schema Extension: Cloud Sync, Multi-Device & Backup Synchronization
-- NexoApps Platform - Phase 5C

-- User Registered Devices Table
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(100) NOT NULL,
  device_type VARCHAR(50) CHECK (device_type IN ('Android Phone', 'Android Tablet', 'Desktop Browser', 'Chromebook', 'iOS Browser')) DEFAULT 'Desktop Browser',
  os VARCHAR(50) NOT NULL,
  browser VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  is_current_device BOOLEAN DEFAULT FALSE,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Active Sync Sessions Table
CREATE TABLE IF NOT EXISTS sync_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  status VARCHAR(20) CHECK (status IN ('Pending', 'Syncing', 'Completed', 'Failed')) DEFAULT 'Completed',
  items_synced INT DEFAULT 0,
  sync_type VARCHAR(50) DEFAULT 'incremental', -- 'full' or 'incremental'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cloud Encrypted Backups Table
CREATE TABLE IF NOT EXISTS cloud_backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  backup_name VARCHAR(255) NOT NULL,
  version VARCHAR(20) DEFAULT 'v1.0.0',
  size_bytes BIGINT DEFAULT 0,
  encryption_hash VARCHAR(255) NOT NULL,
  is_auto_backup BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Synchronization Audit History Table
CREATE TABLE IF NOT EXISTS sync_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Sync Table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'dark',
  language VARCHAR(10) DEFAULT 'en',
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  auto_backup BOOLEAN DEFAULT TRUE,
  sync_favorites BOOLEAN DEFAULT TRUE,
  sync_collections BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Offline Changes Queue Table
CREATE TABLE IF NOT EXISTS offline_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  synced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notification Sync Table
CREATE TABLE IF NOT EXISTS notification_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_id UUID NOT NULL,
  read_on_device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Download History Sync Table
CREATE TABLE IF NOT EXISTS download_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  app_id VARCHAR(255) NOT NULL,
  device_id UUID REFERENCES user_devices(id) ON DELETE SET NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cross-Device Recent Activity Table
CREATE TABLE IF NOT EXISTS recent_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_name VARCHAR(100) NOT NULL,
  activity_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sync Conflicts Table
CREATE TABLE IF NOT EXISTS sync_conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,
  local_version JSONB NOT NULL,
  cloud_version JSONB NOT NULL,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast sync lookup
CREATE INDEX IF NOT EXISTS idx_user_devices_user ON user_devices(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_sessions_user ON sync_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_cloud_backups_user ON cloud_backups(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_history_user ON sync_history(user_id);
CREATE INDEX IF NOT EXISTS idx_offline_changes_user ON offline_changes(user_id, synced);

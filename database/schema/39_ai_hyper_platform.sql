-- =====================================================
-- NexoApps Phase 10E — AI Hyper Platform & Version 8.0 Release Schema
-- Version 8.0
-- =====================================================

CREATE TABLE IF NOT EXISTS platform_registry (
  id TEXT PRIMARY KEY,
  platform_name TEXT NOT NULL DEFAULT 'NexoApps AI Hyper Platform',
  version TEXT NOT NULL DEFAULT '8.0.0-LTS',
  environment TEXT DEFAULT 'production',
  is_lts_ready INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_modules (
  id TEXT PRIMARY KEY,
  module_key TEXT UNIQUE NOT NULL,
  module_name TEXT NOT NULL,
  version TEXT NOT NULL DEFAULT '8.0.0',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS module_dependencies (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  depends_on_module_id TEXT NOT NULL,
  min_version TEXT DEFAULT '8.0.0',
  FOREIGN KEY (module_id) REFERENCES platform_modules(id)
);

CREATE TABLE IF NOT EXISTS module_versions (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  version_tag TEXT NOT NULL,
  release_notes TEXT,
  released_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (module_id) REFERENCES platform_modules(id)
);

CREATE TABLE IF NOT EXISTS platform_integrations (
  id TEXT PRIMARY KEY,
  integration_name TEXT NOT NULL,
  integration_type TEXT NOT NULL,
  status TEXT DEFAULT 'connected',
  config TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_orchestrations (
  id TEXT PRIMARY KEY,
  orchestration_name TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  action_workflow TEXT NOT NULL,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cross_platform_events (
  id TEXT PRIMARY KEY,
  source_module TEXT NOT NULL,
  event_name TEXT NOT NULL,
  payload TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cross_platform_workflows (
  id TEXT PRIMARY KEY,
  workflow_name TEXT NOT NULL,
  step_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS global_configurations (
  id TEXT PRIMARY KEY,
  config_key TEXT UNIQUE NOT NULL,
  config_value TEXT NOT NULL,
  category TEXT DEFAULT 'system',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workspace_registry (
  id TEXT PRIMARY KEY,
  workspace_name TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workspace_sessions (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  active_tab TEXT DEFAULT 'overview',
  last_activity TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspace_registry(id)
);

CREATE TABLE IF NOT EXISTS workspace_preferences (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  theme TEXT DEFAULT 'dark',
  layout TEXT DEFAULT 'grid',
  FOREIGN KEY (workspace_id) REFERENCES workspace_registry(id)
);

CREATE TABLE IF NOT EXISTS workspace_layouts (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  layout_json TEXT DEFAULT '{}',
  FOREIGN KEY (workspace_id) REFERENCES workspace_registry(id)
);

CREATE TABLE IF NOT EXISTS platform_notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  is_read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_health (
  id TEXT PRIMARY KEY,
  subsystem TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'healthy',
  cpu_percent REAL DEFAULT 12.4,
  memory_percent REAL DEFAULT 34.2,
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_metrics (
  id TEXT PRIMARY KEY,
  metric_key TEXT NOT NULL,
  metric_value REAL NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_telemetry (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS release_history (
  id TEXT PRIMARY KEY,
  release_version TEXT UNIQUE NOT NULL,
  release_name TEXT NOT NULL,
  notes TEXT,
  deployed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_backups (
  id TEXT PRIMARY KEY,
  backup_name TEXT NOT NULL,
  size_bytes INTEGER DEFAULT 0,
  storage_url TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_restore_points (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL,
  restore_point_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (backup_id) REFERENCES platform_backups(id)
);

CREATE TABLE IF NOT EXISTS maintenance_windows (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled'
);

CREATE TABLE IF NOT EXISTS feature_rollouts (
  id TEXT PRIMARY KEY,
  feature_key TEXT UNIQUE NOT NULL,
  rollout_pct INTEGER DEFAULT 100,
  is_enabled INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS system_recommendations (
  id TEXT PRIMARY KEY,
  recommendation_text TEXT NOT NULL,
  category TEXT DEFAULT 'performance',
  priority TEXT DEFAULT 'medium'
);

CREATE TABLE IF NOT EXISTS enterprise_support (
  id TEXT PRIMARY KEY,
  ticket_id TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  severity TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

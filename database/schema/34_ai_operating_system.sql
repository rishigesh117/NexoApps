-- =====================================================
-- NexoApps Phase 9E — AI Operating System & Unified Digital Ecosystem Schema
-- Version 7.0
-- =====================================================

CREATE TABLE IF NOT EXISTS workspace_registry (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  workspace_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_active INTEGER DEFAULT 1,
  theme TEXT DEFAULT 'dark',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workspace_modules (
  id TEXT PRIMARY KEY,
  module_key TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  category TEXT DEFAULT 'core',
  version TEXT DEFAULT '7.0.0',
  is_enabled INTEGER DEFAULT 1,
  icon TEXT DEFAULT 'Cpu',
  route_path TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS module_dependencies (
  id TEXT PRIMARY KEY,
  module_key TEXT NOT NULL,
  depends_on_key TEXT NOT NULL,
  min_version TEXT DEFAULT '1.0.0',
  FOREIGN KEY (module_key) REFERENCES workspace_modules(module_key)
);

CREATE TABLE IF NOT EXISTS unified_navigation (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  module_key TEXT,
  icon_name TEXT DEFAULT 'Globe',
  parent_id TEXT,
  display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS workspace_preferences (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  preference_key TEXT NOT NULL,
  preference_value TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspace_registry(id)
);

CREATE TABLE IF NOT EXISTS workspace_layouts (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  layout_name TEXT DEFAULT 'default',
  layout_config TEXT DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspace_registry(id)
);

CREATE TABLE IF NOT EXISTS global_search_index (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL,
  entity_type TEXT NOT NULL, -- project, app, marketplace, agent, doc
  title TEXT NOT NULL,
  description TEXT,
  target_url TEXT NOT NULL,
  keywords TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cross_module_events (
  id TEXT PRIMARY KEY,
  source_module TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cross_module_permissions (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  module_key TEXT NOT NULL,
  permission_action TEXT NOT NULL,
  granted INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS notification_center (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'system', -- system, alert, activity, ai
  is_read INTEGER DEFAULT 0,
  action_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS activity_center (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  actor_name TEXT DEFAULT 'System Agent',
  action_title TEXT NOT NULL,
  module_key TEXT DEFAULT 'system',
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_jobs (
  id TEXT PRIMARY KEY,
  job_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  progress_pct REAL DEFAULT 0.0,
  executed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS automation_history (
  id TEXT PRIMARY KEY,
  rule_name TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  execution_status TEXT DEFAULT 'success',
  executed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_recommendations (
  id TEXT PRIMARY KEY,
  target_user_id TEXT,
  recommendation_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  action_label TEXT,
  action_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workspace_shortcuts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  shortcut_label TEXT NOT NULL,
  hotkey TEXT NOT NULL,
  action_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS feature_flags (
  id TEXT PRIMARY KEY,
  flag_key TEXT UNIQUE NOT NULL,
  description TEXT,
  is_enabled INTEGER DEFAULT 1,
  rollout_percentage INTEGER DEFAULT 100,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_settings (
  id TEXT PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  severity TEXT DEFAULT 'info', -- info, warning, critical
  is_active INTEGER DEFAULT 1,
  published_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS module_health (
  id TEXT PRIMARY KEY,
  module_key TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'healthy', -- healthy, degraded, down
  uptime_pct REAL DEFAULT 99.99,
  latency_ms INTEGER DEFAULT 12,
  last_checked TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_version_history (
  id TEXT PRIMARY KEY,
  version_tag TEXT NOT NULL,
  release_name TEXT NOT NULL,
  changelog TEXT,
  deployed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

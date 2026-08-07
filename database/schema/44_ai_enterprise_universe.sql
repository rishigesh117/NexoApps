-- =====================================================
-- NexoApps Phase 11E — AI Enterprise Universe & Version 9.0 Release Schema
-- Version 9.0 Production Release
-- =====================================================

-- 1. Enterprise Registry
CREATE TABLE IF NOT EXISTS enterprise_registry (
  id TEXT PRIMARY KEY,
  enterprise_name TEXT NOT NULL,
  license_tier TEXT DEFAULT 'unlimited_enterprise',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Enterprise Modules
CREATE TABLE IF NOT EXISTS enterprise_modules (
  id TEXT PRIMARY KEY,
  module_name TEXT NOT NULL,
  module_key TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'core',
  version TEXT DEFAULT '9.0.0',
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Enterprise Workspaces
CREATE TABLE IF NOT EXISTS enterprise_workspaces (
  id TEXT PRIMARY KEY,
  workspace_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  owner_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Enterprise Services
CREATE TABLE IF NOT EXISTS enterprise_services (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  endpoint_url TEXT,
  status TEXT DEFAULT 'healthy',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5. Enterprise Integrations
CREATE TABLE IF NOT EXISTS enterprise_integrations (
  id TEXT PRIMARY KEY,
  integration_name TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT DEFAULT 'connected',
  config_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6. Enterprise Orchestrations
CREATE TABLE IF NOT EXISTS enterprise_orchestrations (
  id TEXT PRIMARY KEY,
  orchestration_name TEXT NOT NULL,
  trigger_type TEXT DEFAULT 'event',
  execution_state TEXT DEFAULT 'idle',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7. Enterprise Workflows
CREATE TABLE IF NOT EXISTS enterprise_workflows (
  id TEXT PRIMARY KEY,
  workflow_name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  steps_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 8. Enterprise Policies
CREATE TABLE IF NOT EXISTS enterprise_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  policy_type TEXT DEFAULT 'security',
  rules_json TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 9. Enterprise Settings
CREATE TABLE IF NOT EXISTS enterprise_settings (
  id TEXT PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 10. Enterprise Notifications
CREATE TABLE IF NOT EXISTS enterprise_notifications (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT DEFAULT 'info',
  is_read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Enterprise Activity
CREATE TABLE IF NOT EXISTS enterprise_activity (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 12. Enterprise AI Services
CREATE TABLE IF NOT EXISTS enterprise_ai_services (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  model_provider TEXT DEFAULT 'anthropic',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Enterprise AI Agents
CREATE TABLE IF NOT EXISTS enterprise_ai_agents (
  id TEXT PRIMARY KEY,
  agent_name TEXT NOT NULL,
  role_type TEXT DEFAULT 'autonomous_assistant',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Enterprise Health
CREATE TABLE IF NOT EXISTS enterprise_health (
  id TEXT PRIMARY KEY,
  subsystem_name TEXT NOT NULL,
  health_score REAL DEFAULT 100.0,
  status TEXT DEFAULT 'healthy',
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 15. Enterprise Metrics
CREATE TABLE IF NOT EXISTS enterprise_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value REAL NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 16. Enterprise Usage
CREATE TABLE IF NOT EXISTS enterprise_usage (
  id TEXT PRIMARY KEY,
  resource_name TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  recorded_date TEXT NOT NULL
);

-- 17. Enterprise Cost Management
CREATE TABLE IF NOT EXISTS enterprise_cost_management (
  id TEXT PRIMARY KEY,
  cost_center TEXT NOT NULL,
  allocated_budget REAL DEFAULT 0,
  actual_spend REAL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  recorded_month TEXT NOT NULL
);

-- 18. Enterprise Resource Usage
CREATE TABLE IF NOT EXISTS enterprise_resource_usage (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL,
  cpu_percent REAL DEFAULT 0,
  memory_percent REAL DEFAULT 0,
  storage_gb REAL DEFAULT 0,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 19. Enterprise Backups
CREATE TABLE IF NOT EXISTS enterprise_backups (
  id TEXT PRIMARY KEY,
  backup_name TEXT NOT NULL,
  backup_type TEXT DEFAULT 'full',
  size_bytes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 20. Enterprise Restore Points
CREATE TABLE IF NOT EXISTS enterprise_restore_points (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL,
  snapshot_tag TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (backup_id) REFERENCES enterprise_backups(id) ON DELETE CASCADE
);

-- 21. Enterprise Release History
CREATE TABLE IF NOT EXISTS enterprise_release_history (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  release_name TEXT NOT NULL,
  changelog TEXT,
  released_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 22. Enterprise Feature Management
CREATE TABLE IF NOT EXISTS enterprise_feature_management (
  id TEXT PRIMARY KEY,
  feature_key TEXT UNIQUE NOT NULL,
  feature_name TEXT NOT NULL,
  is_enabled INTEGER DEFAULT 1,
  rollout_percentage INTEGER DEFAULT 100
);

-- 23. Enterprise Recommendations
CREATE TABLE IF NOT EXISTS enterprise_recommendations (
  id TEXT PRIMARY KEY,
  target_id TEXT NOT NULL,
  recommendation_text TEXT NOT NULL,
  score REAL DEFAULT 1.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 24. Enterprise Support Cases
CREATE TABLE IF NOT EXISTS enterprise_support_cases (
  id TEXT PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  priority TEXT DEFAULT 'high',
  status TEXT DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Enterprise Audit Logs
CREATE TABLE IF NOT EXISTS enterprise_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

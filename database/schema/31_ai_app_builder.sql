-- =====================================================
-- NexoApps Phase 9B — AI Application Builder & Low-Code Studio Schema
-- Version 6.1
-- =====================================================

CREATE TABLE IF NOT EXISTS ai_applications (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  icon_url TEXT,
  status TEXT DEFAULT 'draft', -- draft, published, archived
  environment TEXT DEFAULT 'development',
  version TEXT DEFAULT '1.0.0',
  is_public INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS application_versions (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  version_number TEXT NOT NULL,
  changelog TEXT,
  snapshot_payload TEXT NOT NULL,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'Starter Kit',
  thumbnail_url TEXT,
  template_payload TEXT NOT NULL,
  is_featured INTEGER DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS application_components (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  page_id TEXT,
  component_type TEXT NOT NULL, -- prompt_block, chat_interface, form_builder, image_gen_block, agent_node
  name TEXT NOT NULL,
  props TEXT DEFAULT '{}',
  layout_position TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_pages (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  is_home INTEGER DEFAULT 0,
  layout_config TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_workflows (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  name TEXT NOT NULL,
  trigger_type TEXT DEFAULT 'event',
  workflow_nodes TEXT DEFAULT '[]',
  workflow_edges TEXT DEFAULT '[]',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_variables (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  variable_key TEXT NOT NULL,
  variable_value TEXT,
  is_secret INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_settings (
  id TEXT PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL,
  theme_mode TEXT DEFAULT 'dark',
  custom_css TEXT,
  model_override TEXT,
  rate_limit_rpm INTEGER DEFAULT 100,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_permissions (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  role TEXT NOT NULL,
  can_edit INTEGER DEFAULT 1,
  can_deploy INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_collaborators (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'editor',
  added_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_assets (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_url TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  mime_type TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_builds (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  build_number INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, building, success, failed
  logs TEXT,
  duration_sec REAL DEFAULT 0.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_deployments (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  build_id TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  deployment_url TEXT,
  status TEXT DEFAULT 'active',
  deployed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id),
  FOREIGN KEY (build_id) REFERENCES application_builds(id)
);

CREATE TABLE IF NOT EXISTS application_environments (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  environment_name TEXT NOT NULL, -- development, staging, production
  base_url TEXT,
  variables_config TEXT DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_testing (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  test_name TEXT NOT NULL,
  suite_type TEXT DEFAULT 'unit',
  status TEXT DEFAULT 'passed',
  results TEXT DEFAULT '{}',
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_releases (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  release_tag TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_latest INTEGER DEFAULT 1,
  released_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (application_id) REFERENCES ai_applications(id)
);

CREATE TABLE IF NOT EXISTS application_logs (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  metadata TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS application_backups (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  backup_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS component_library (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  component_type TEXT NOT NULL,
  category TEXT DEFAULT 'AI Blocks',
  icon_name TEXT DEFAULT 'Box',
  default_props TEXT DEFAULT '{}',
  is_published INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS component_categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS component_versions (
  id TEXT PRIMARY KEY,
  component_id TEXT NOT NULL,
  version_number TEXT NOT NULL,
  schema_definition TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (component_id) REFERENCES component_library(id)
);

CREATE TABLE IF NOT EXISTS visual_editor_sessions (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  last_cursor_position TEXT,
  active_page_id TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS application_snapshots (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL,
  snapshot_name TEXT NOT NULL,
  data_payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS application_favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  application_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS builder_activity_logs (
  id TEXT PRIMARY KEY,
  application_id TEXT,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

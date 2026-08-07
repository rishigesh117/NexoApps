-- =====================================================
-- NexoApps Phase 11A — AI Developer Cloud & Version 8.1 Release Schema
-- Version 8.1
-- =====================================================

CREATE TABLE IF NOT EXISTS developer_organizations (
  id TEXT PRIMARY KEY,
  org_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  billing_plan TEXT DEFAULT 'enterprise',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS developer_teams (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (org_id) REFERENCES developer_organizations(id)
);

CREATE TABLE IF NOT EXISTS repositories (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  slug TEXT NOT NULL,
  default_branch TEXT DEFAULT 'main',
  is_private INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (org_id) REFERENCES developer_organizations(id)
);

CREATE TABLE IF NOT EXISTS repository_members (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'developer',
  added_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES repositories(id)
);

CREATE TABLE IF NOT EXISTS repository_permissions (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  role TEXT NOT NULL,
  can_push INTEGER DEFAULT 1,
  can_merge INTEGER DEFAULT 1,
  can_admin INTEGER DEFAULT 0,
  FOREIGN KEY (repo_id) REFERENCES repositories(id)
);

CREATE TABLE IF NOT EXISTS branches (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  head_commit_hash TEXT,
  is_protected INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES repositories(id)
);

CREATE TABLE IF NOT EXISTS commits (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  commit_hash TEXT UNIQUE NOT NULL,
  author_name TEXT NOT NULL,
  commit_message TEXT NOT NULL,
  committed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES repositories(id)
);

CREATE TABLE IF NOT EXISTS merge_requests (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  mr_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  source_branch TEXT NOT NULL,
  target_branch TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  author_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES repositories(id)
);

CREATE TABLE IF NOT EXISTS pipeline_definitions (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  pipeline_name TEXT NOT NULL,
  config_yaml TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES repositories(id)
);

CREATE TABLE IF NOT EXISTS pipeline_runs (
  id TEXT PRIMARY KEY,
  pipeline_id TEXT NOT NULL,
  run_number INTEGER NOT NULL,
  status TEXT DEFAULT 'running',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  FOREIGN KEY (pipeline_id) REFERENCES pipeline_definitions(id)
);

CREATE TABLE IF NOT EXISTS pipeline_jobs (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  job_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  logs TEXT,
  started_at TEXT,
  finished_at TEXT,
  FOREIGN KEY (run_id) REFERENCES pipeline_runs(id)
);

CREATE TABLE IF NOT EXISTS build_runners (
  id TEXT PRIMARY KEY,
  runner_name TEXT NOT NULL,
  runner_type TEXT DEFAULT 'shared-k8s',
  status TEXT DEFAULT 'online',
  max_jobs INTEGER DEFAULT 8,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS artifacts (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  artifact_name TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  download_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (run_id) REFERENCES pipeline_runs(id)
);

CREATE TABLE IF NOT EXISTS artifact_registry (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  package_type TEXT NOT NULL,
  version TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (org_id) REFERENCES developer_organizations(id)
);

CREATE TABLE IF NOT EXISTS container_registries (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  registry_name TEXT NOT NULL,
  registry_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (org_id) REFERENCES developer_organizations(id)
);

CREATE TABLE IF NOT EXISTS container_images (
  id TEXT PRIMARY KEY,
  registry_id TEXT NOT NULL,
  image_name TEXT NOT NULL,
  tag TEXT NOT NULL,
  size_bytes INTEGER DEFAULT 0,
  pushed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (registry_id) REFERENCES container_registries(id)
);

CREATE TABLE IF NOT EXISTS deployment_environments (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  env_name TEXT NOT NULL,
  env_type TEXT DEFAULT 'staging',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (org_id) REFERENCES developer_organizations(id)
);

CREATE TABLE IF NOT EXISTS deployment_targets (
  id TEXT PRIMARY KEY,
  env_id TEXT NOT NULL,
  target_name TEXT NOT NULL,
  target_type TEXT DEFAULT 'k8s-cluster',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (env_id) REFERENCES deployment_environments(id)
);

CREATE TABLE IF NOT EXISTS deployment_histories (
  id TEXT PRIMARY KEY,
  target_id TEXT NOT NULL,
  image_tag TEXT NOT NULL,
  status TEXT DEFAULT 'success',
  deployed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (target_id) REFERENCES deployment_targets(id)
);

CREATE TABLE IF NOT EXISTS infrastructure_templates (
  id TEXT PRIMARY KEY,
  template_name TEXT NOT NULL,
  provider TEXT DEFAULT 'aws',
  iac_type TEXT DEFAULT 'terraform',
  template_body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS iac_projects (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  status TEXT DEFAULT 'synced',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (template_id) REFERENCES infrastructure_templates(id)
);

CREATE TABLE IF NOT EXISTS developer_notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS developer_activity (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS engineering_dashboards (
  id TEXT PRIMARY KEY,
  dashboard_name TEXT NOT NULL,
  config_json TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS developer_cloud_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =====================================================
-- NexoApps Phase 8B — AI Runtime Engine & Serverless Execution Schema
-- Version 5.1
-- =====================================================

CREATE TABLE IF NOT EXISTS runtime_environments (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  isolation_level TEXT DEFAULT 'sandboxed',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS runtime_sessions (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  session_token TEXT UNIQUE,
  status TEXT DEFAULT 'active',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT,
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_instances (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  instance_name TEXT NOT NULL,
  instance_type TEXT DEFAULT 'serverless_node',
  status TEXT DEFAULT 'running',
  memory_limit_mb INTEGER DEFAULT 512,
  cpu_cores REAL DEFAULT 1.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_containers (
  id TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  container_name TEXT NOT NULL,
  image_tag TEXT DEFAULT 'nexoapps/runtime:v5.1',
  status TEXT DEFAULT 'running',
  port_bindings TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (instance_id) REFERENCES runtime_instances(id)
);

CREATE TABLE IF NOT EXISTS runtime_images (
  id TEXT PRIMARY KEY,
  image_name TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT 'latest',
  size_bytes INTEGER DEFAULT 0,
  digest TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS runtime_deployments (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  deployment_name TEXT NOT NULL,
  artifact_url TEXT,
  status TEXT DEFAULT 'deployed',
  replicas INTEGER DEFAULT 2,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_logs (
  id TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (instance_id) REFERENCES runtime_instances(id)
);

CREATE TABLE IF NOT EXISTS runtime_metrics (
  id TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  cpu_usage_percent REAL DEFAULT 0,
  memory_usage_mb REAL DEFAULT 0,
  network_in_bytes INTEGER DEFAULT 0,
  network_out_bytes INTEGER DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (instance_id) REFERENCES runtime_instances(id)
);

CREATE TABLE IF NOT EXISTS runtime_events (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  details TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_variables (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  var_key TEXT NOT NULL,
  var_value TEXT,
  is_secret INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_secrets (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  secret_name TEXT NOT NULL,
  encrypted_value TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_networks (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  network_name TEXT NOT NULL,
  subnet_cidr TEXT DEFAULT '10.200.0.0/16',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_storage (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  volume_name TEXT NOT NULL,
  size_gb INTEGER DEFAULT 10,
  mount_path TEXT DEFAULT '/data',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_snapshots (
  id TEXT PRIMARY KEY,
  instance_id TEXT NOT NULL,
  snapshot_name TEXT NOT NULL,
  size_bytes INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (instance_id) REFERENCES runtime_instances(id)
);

CREATE TABLE IF NOT EXISTS runtime_backups (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  backup_name TEXT NOT NULL,
  storage_location TEXT DEFAULT 's3',
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_jobs (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  job_name TEXT NOT NULL,
  command TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_schedules (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  cron_expression TEXT NOT NULL,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES runtime_jobs(id)
);

CREATE TABLE IF NOT EXISTS runtime_permissions (
  id TEXT PRIMARY KEY,
  environment_id TEXT NOT NULL,
  principal TEXT NOT NULL,
  permission_role TEXT DEFAULT 'executor',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (environment_id) REFERENCES runtime_environments(id)
);

CREATE TABLE IF NOT EXISTS runtime_templates (
  id TEXT PRIMARY KEY,
  template_name TEXT NOT NULL,
  description TEXT,
  base_image TEXT DEFAULT 'nexoapps/runtime-base:latest',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS runtime_scaling (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  min_replicas INTEGER DEFAULT 1,
  max_replicas INTEGER DEFAULT 10,
  target_cpu_percent INTEGER DEFAULT 70,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES runtime_deployments(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_runtime_environments_tenant ON runtime_environments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_runtime_instances_env ON runtime_instances(environment_id);
CREATE INDEX IF NOT EXISTS idx_runtime_containers_inst ON runtime_containers(instance_id);
CREATE INDEX IF NOT EXISTS idx_runtime_metrics_inst ON runtime_metrics(instance_id);
CREATE INDEX IF NOT EXISTS idx_runtime_logs_inst ON runtime_logs(instance_id);

-- =====================================================
-- NexoApps Phase 7D — Enterprise AI Cloud & Orchestration Schema
-- Version 3.3
-- =====================================================

CREATE TABLE IF NOT EXISTS workflow_templates (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'automation',
  definition TEXT,
  version TEXT DEFAULT '1.0.0',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workflow_instances (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  tenant_id TEXT,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  trigger_type TEXT DEFAULT 'manual',
  trigger_config TEXT,
  environment TEXT DEFAULT 'production',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (template_id) REFERENCES workflow_templates(id)
);

CREATE TABLE IF NOT EXISTS workflow_steps (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  step_key TEXT NOT NULL,
  name TEXT NOT NULL,
  step_type TEXT NOT NULL DEFAULT 'action',
  config TEXT,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  next_step_keys TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES workflow_instances(id)
);

CREATE TABLE IF NOT EXISTS workflow_runs (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  duration_ms INTEGER DEFAULT 0,
  triggered_by TEXT,
  input_payload TEXT,
  output_payload TEXT,
  error_message TEXT,
  FOREIGN KEY (workflow_id) REFERENCES workflow_instances(id)
);

CREATE TABLE IF NOT EXISTS workflow_logs (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  step_id TEXT,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (run_id) REFERENCES workflow_runs(id)
);

CREATE TABLE IF NOT EXISTS workflow_variables (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  variable_name TEXT NOT NULL,
  variable_value TEXT,
  is_secret INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES workflow_instances(id)
);

CREATE TABLE IF NOT EXISTS automation_jobs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  job_type TEXT DEFAULT 'event_driven',
  event_pattern TEXT,
  action_target TEXT,
  action_payload TEXT,
  status TEXT DEFAULT 'active',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS job_schedules (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  cron_expression TEXT NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  is_enabled INTEGER DEFAULT 1,
  last_executed_at TEXT,
  next_execution_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES automation_jobs(id)
);

CREATE TABLE IF NOT EXISTS message_queues (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  queue_name TEXT NOT NULL,
  queue_type TEXT DEFAULT 'fifo',
  message_ttl_seconds INTEGER DEFAULT 86400,
  max_retries INTEGER DEFAULT 3,
  dead_letter_queue_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS queue_messages (
  id TEXT PRIMARY KEY,
  queue_id TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  retry_count INTEGER DEFAULT 0,
  available_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (queue_id) REFERENCES message_queues(id)
);

CREATE TABLE IF NOT EXISTS task_workers (
  id TEXT PRIMARY KEY,
  worker_name TEXT NOT NULL,
  node_id TEXT,
  status TEXT DEFAULT 'idle',
  concurrency INTEGER DEFAULT 5,
  current_tasks_count INTEGER DEFAULT 0,
  last_heartbeat TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS worker_status (
  id TEXT PRIMARY KEY,
  worker_id TEXT NOT NULL,
  cpu_percent REAL DEFAULT 0,
  memory_percent REAL DEFAULT 0,
  active_jobs INTEGER DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (worker_id) REFERENCES task_workers(id)
);

CREATE TABLE IF NOT EXISTS environment_profiles (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  environment_type TEXT NOT NULL DEFAULT 'production',
  description TEXT,
  is_default INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS environment_variables (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL,
  var_key TEXT NOT NULL,
  var_value TEXT,
  is_sensitive INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (profile_id) REFERENCES environment_profiles(id)
);

CREATE TABLE IF NOT EXISTS secret_store (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  secret_name TEXT NOT NULL,
  secret_type TEXT DEFAULT 'generic',
  encrypted_value TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS deployment_targets (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  target_type TEXT DEFAULT 'k8s',
  connection_config TEXT,
  status TEXT DEFAULT 'healthy',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS deployment_jobs (
  id TEXT PRIMARY KEY,
  target_id TEXT NOT NULL,
  tenant_id TEXT,
  name TEXT NOT NULL,
  build_artifact TEXT,
  status TEXT DEFAULT 'pending',
  started_at TEXT,
  completed_at TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (target_id) REFERENCES deployment_targets(id)
);

CREATE TABLE IF NOT EXISTS deployment_logs (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES deployment_jobs(id)
);

CREATE TABLE IF NOT EXISTS cloud_clusters (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  cluster_name TEXT NOT NULL,
  provider TEXT DEFAULT 'aws',
  region TEXT DEFAULT 'us-east-1',
  status TEXT DEFAULT 'active',
  node_count INTEGER DEFAULT 3,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cluster_nodes (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  node_name TEXT NOT NULL,
  ip_address TEXT,
  node_type TEXT DEFAULT 'worker',
  status TEXT DEFAULT 'ready',
  cpu_cores INTEGER DEFAULT 4,
  ram_gb INTEGER DEFAULT 16,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (cluster_id) REFERENCES cloud_clusters(id)
);

CREATE TABLE IF NOT EXISTS system_backups (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  backup_name TEXT NOT NULL,
  backup_type TEXT DEFAULT 'full',
  storage_location TEXT DEFAULT 's3',
  size_bytes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS backup_history (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL,
  completed_at TEXT,
  error_message TEXT,
  FOREIGN KEY (backup_id) REFERENCES system_backups(id)
);

CREATE TABLE IF NOT EXISTS restore_history (
  id TEXT PRIMARY KEY,
  backup_id TEXT NOT NULL,
  restored_by TEXT,
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL,
  completed_at TEXT,
  details TEXT,
  FOREIGN KEY (backup_id) REFERENCES system_backups(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_workflow_templates_tenant ON workflow_templates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_workflow_instances_template ON workflow_instances(template_id);
CREATE INDEX IF NOT EXISTS idx_workflow_runs_workflow ON workflow_runs(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_logs_run ON workflow_logs(run_id);
CREATE INDEX IF NOT EXISTS idx_queue_messages_queue ON queue_messages(queue_id);
CREATE INDEX IF NOT EXISTS idx_deployment_jobs_target ON deployment_jobs(target_id);
CREATE INDEX IF NOT EXISTS idx_cluster_nodes_cluster ON cluster_nodes(cluster_id);

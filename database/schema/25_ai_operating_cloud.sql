-- =====================================================
-- NexoApps Phase 8A — AI Operating Cloud & Multi-Agent Workspace Schema
-- Version 5.0
-- =====================================================

CREATE TABLE IF NOT EXISTS agent_workspaces (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  environment TEXT DEFAULT 'production',
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workspace_agents (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'assistant',
  model_name TEXT DEFAULT 'gemini-1.5-pro',
  temperature REAL DEFAULT 0.7,
  status TEXT DEFAULT 'idle',
  capabilities TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES agent_workspaces(id)
);

CREATE TABLE IF NOT EXISTS agent_collaboration_sessions (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  session_name TEXT NOT NULL,
  participating_agent_ids TEXT,
  status TEXT DEFAULT 'active',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT,
  FOREIGN KEY (workspace_id) REFERENCES agent_workspaces(id)
);

CREATE TABLE IF NOT EXISTS agent_conversations (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agent',
  message_text TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES agent_collaboration_sessions(id)
);

CREATE TABLE IF NOT EXISTS agent_shared_memory (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  memory_key TEXT NOT NULL,
  memory_value TEXT,
  memory_type TEXT DEFAULT 'context',
  access_level TEXT DEFAULT 'read_write',
  created_by_agent_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES agent_workspaces(id)
);

CREATE TABLE IF NOT EXISTS agent_permissions (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  permission_scope TEXT NOT NULL,
  is_granted INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

CREATE TABLE IF NOT EXISTS agent_capabilities (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  capability_name TEXT NOT NULL,
  config TEXT,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

CREATE TABLE IF NOT EXISTS agent_tools (
  id TEXT PRIMARY KEY,
  tool_name TEXT NOT NULL,
  description TEXT,
  parameter_schema TEXT,
  execution_handler TEXT,
  is_system INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_tool_calls (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  tool_id TEXT NOT NULL,
  arguments TEXT,
  result TEXT,
  status TEXT DEFAULT 'success',
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id),
  FOREIGN KEY (tool_id) REFERENCES agent_tools(id)
);

CREATE TABLE IF NOT EXISTS agent_execution_logs (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  execution_type TEXT DEFAULT 'task',
  input_payload TEXT,
  output_payload TEXT,
  status TEXT DEFAULT 'completed',
  duration_ms INTEGER DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

CREATE TABLE IF NOT EXISTS agent_jobs (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  assigned_agent_id TEXT,
  job_name TEXT NOT NULL,
  job_type TEXT DEFAULT 'automated',
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES agent_workspaces(id)
);

CREATE TABLE IF NOT EXISTS agent_job_history (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  error_message TEXT,
  FOREIGN KEY (job_id) REFERENCES agent_jobs(id)
);

CREATE TABLE IF NOT EXISTS agent_resource_usage (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  cpu_time_ms INTEGER DEFAULT 0,
  memory_mb REAL DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

CREATE TABLE IF NOT EXISTS agent_schedules (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  cron_expression TEXT NOT NULL,
  task_definition TEXT,
  is_enabled INTEGER DEFAULT 1,
  last_run_at TEXT,
  next_run_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

CREATE TABLE IF NOT EXISTS agent_notifications (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  notification_type TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

CREATE TABLE IF NOT EXISTS agent_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  role TEXT DEFAULT 'specialist',
  default_capabilities TEXT,
  is_official INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS agent_market (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  author TEXT DEFAULT 'NexoApps AI',
  downloads INTEGER DEFAULT 0,
  rating REAL DEFAULT 5.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (template_id) REFERENCES agent_templates(id)
);

CREATE TABLE IF NOT EXISTS workspace_activity (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES agent_workspaces(id)
);

CREATE TABLE IF NOT EXISTS agent_metrics (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  metric_key TEXT NOT NULL,
  metric_value REAL DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (agent_id) REFERENCES workspace_agents(id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_agent_workspaces_tenant ON agent_workspaces(tenant_id);
CREATE INDEX IF NOT EXISTS idx_workspace_agents_workspace ON workspace_agents(workspace_id);
CREATE INDEX IF NOT EXISTS idx_agent_shared_memory_workspace ON agent_shared_memory(workspace_id);
CREATE INDEX IF NOT EXISTS idx_agent_execution_logs_agent ON agent_execution_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_resource_usage_agent ON agent_resource_usage(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_metrics_agent ON agent_metrics(agent_id);

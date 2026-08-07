-- =====================================================
-- NexoApps Phase 11C — AI Enterprise Automation Platform & Version 8.3 Release Schema
-- Version 8.3
-- =====================================================

-- 1. Automation Workspaces
CREATE TABLE IF NOT EXISTS automation_workspaces (
  id TEXT PRIMARY KEY,
  workspace_name TEXT NOT NULL,
  description TEXT,
  organization_id TEXT,
  owner_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Automation Projects
CREATE TABLE IF NOT EXISTS automation_projects (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES automation_workspaces(id) ON DELETE CASCADE
);

-- 3. Automation Workflows
CREATE TABLE IF NOT EXISTS automation_workflows (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  workflow_name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  trigger_type TEXT DEFAULT 'manual',
  execution_mode TEXT DEFAULT 'sequential',
  created_by TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES automation_projects(id) ON DELETE CASCADE
);

-- 4. Workflow Versions
CREATE TABLE IF NOT EXISTS workflow_versions (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  definition_json TEXT NOT NULL,
  changelog TEXT,
  published_by TEXT NOT NULL,
  is_published INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES automation_workflows(id) ON DELETE CASCADE
);

-- 5. Workflow Executions
CREATE TABLE IF NOT EXISTS workflow_executions (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  version_id TEXT,
  status TEXT DEFAULT 'pending',
  triggered_by TEXT NOT NULL,
  input_data TEXT,
  output_data TEXT,
  error_message TEXT,
  started_at TEXT,
  completed_at TEXT,
  duration_ms INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES automation_workflows(id) ON DELETE CASCADE
);

-- 6. Workflow Steps
CREATE TABLE IF NOT EXISTS workflow_steps (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  step_name TEXT NOT NULL,
  step_type TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  configuration TEXT,
  next_step_id TEXT,
  on_failure TEXT DEFAULT 'stop',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES automation_workflows(id) ON DELETE CASCADE
);

-- 7. Workflow Variables
CREATE TABLE IF NOT EXISTS workflow_variables (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  variable_name TEXT NOT NULL,
  variable_type TEXT DEFAULT 'string',
  default_value TEXT,
  is_secret INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES automation_workflows(id) ON DELETE CASCADE
);

-- 8. Workflow Schedules
CREATE TABLE IF NOT EXISTS workflow_schedules (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  cron_expression TEXT NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  is_enabled INTEGER DEFAULT 1,
  last_run_at TEXT,
  next_run_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES automation_workflows(id) ON DELETE CASCADE
);

-- 9. Automation Triggers
CREATE TABLE IF NOT EXISTS automation_triggers (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  trigger_name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  event_pattern TEXT,
  config TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workflow_id) REFERENCES automation_workflows(id) ON DELETE CASCADE
);

-- 10. Event Subscriptions
CREATE TABLE IF NOT EXISTS event_subscriptions (
  id TEXT PRIMARY KEY,
  trigger_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  target_url TEXT,
  filter_rules TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (trigger_id) REFERENCES automation_triggers(id) ON DELETE CASCADE
);

-- 11. Business Rules
CREATE TABLE IF NOT EXISTS business_rules (
  id TEXT PRIMARY KEY,
  rule_name TEXT NOT NULL,
  description TEXT,
  rule_group TEXT DEFAULT 'general',
  conditions TEXT NOT NULL,
  actions TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 12. Decision Tables
CREATE TABLE IF NOT EXISTS decision_tables (
  id TEXT PRIMARY KEY,
  table_name TEXT NOT NULL,
  description TEXT,
  inputs_schema TEXT NOT NULL,
  outputs_schema TEXT NOT NULL,
  rules_json TEXT NOT NULL,
  hit_policy TEXT DEFAULT 'first',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Approval Workflows
CREATE TABLE IF NOT EXISTS approval_workflows (
  id TEXT PRIMARY KEY,
  workflow_name TEXT NOT NULL,
  description TEXT,
  approver_roles TEXT NOT NULL,
  require_all INTEGER DEFAULT 0,
  auto_reject_timeout_hours INTEGER DEFAULT 72,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Approval Requests
CREATE TABLE IF NOT EXISTS approval_requests (
  id TEXT PRIMARY KEY,
  approval_workflow_id TEXT NOT NULL,
  requester_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  title TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (approval_workflow_id) REFERENCES approval_workflows(id) ON DELETE CASCADE
);

-- 15. Approval Actions
CREATE TABLE IF NOT EXISTS approval_actions (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  approver_id TEXT NOT NULL,
  action TEXT NOT NULL, -- 'approved' | 'rejected' | 'commented'
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (request_id) REFERENCES approval_requests(id) ON DELETE CASCADE
);

-- 16. RPA Bots
CREATE TABLE IF NOT EXISTS rpa_bots (
  id TEXT PRIMARY KEY,
  bot_name TEXT NOT NULL,
  description TEXT,
  bot_type TEXT DEFAULT 'unattended',
  status TEXT DEFAULT 'idle',
  host_machine TEXT,
  capabilities TEXT,
  last_heartbeat TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 17. RPA Jobs
CREATE TABLE IF NOT EXISTS rpa_jobs (
  id TEXT PRIMARY KEY,
  bot_id TEXT NOT NULL,
  workflow_id TEXT,
  job_name TEXT NOT NULL,
  status TEXT DEFAULT 'queued',
  parameters TEXT,
  result_data TEXT,
  error_details TEXT,
  started_at TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bot_id) REFERENCES rpa_bots(id) ON DELETE CASCADE
);

-- 18. Automation Integrations
CREATE TABLE IF NOT EXISTS automation_integrations (
  id TEXT PRIMARY KEY,
  integration_name TEXT NOT NULL,
  provider TEXT NOT NULL,
  category TEXT DEFAULT 'api',
  auth_type TEXT DEFAULT 'oauth2',
  base_url TEXT,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 19. Integration Connections
CREATE TABLE IF NOT EXISTS integration_connections (
  id TEXT PRIMARY KEY,
  integration_id TEXT NOT NULL,
  connection_name TEXT NOT NULL,
  credentials_encrypted TEXT,
  status TEXT DEFAULT 'connected',
  created_by TEXT NOT NULL,
  last_verified TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (integration_id) REFERENCES automation_integrations(id) ON DELETE CASCADE
);

-- 20. Automation Logs
CREATE TABLE IF NOT EXISTS automation_logs (
  id TEXT PRIMARY KEY,
  execution_id TEXT,
  workflow_id TEXT,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 21. Execution Metrics
CREATE TABLE IF NOT EXISTS execution_metrics (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  total_executions INTEGER DEFAULT 0,
  successful_executions INTEGER DEFAULT 0,
  failed_executions INTEGER DEFAULT 0,
  avg_duration_ms REAL DEFAULT 0.0,
  last_execution_at TEXT,
  recorded_date TEXT NOT NULL DEFAULT (date('now'))
);

-- 22. Process Analytics
CREATE TABLE IF NOT EXISTS process_analytics (
  id TEXT PRIMARY KEY,
  process_name TEXT NOT NULL,
  category TEXT DEFAULT 'workflow',
  total_runs INTEGER DEFAULT 0,
  time_saved_hours REAL DEFAULT 0.0,
  cost_saved_usd REAL DEFAULT 0.0,
  efficiency_score REAL DEFAULT 100.0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 23. Workflow Templates
CREATE TABLE IF NOT EXISTS workflow_templates (
  id TEXT PRIMARY KEY,
  template_name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'business',
  definition_json TEXT NOT NULL,
  icon TEXT,
  usage_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 24. Automation Recommendations
CREATE TABLE IF NOT EXISTS automation_recommendations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact_score REAL DEFAULT 5.0,
  suggested_action TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Enterprise Automation Audit Logs
CREATE TABLE IF NOT EXISTS enterprise_automation_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  changes_json TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

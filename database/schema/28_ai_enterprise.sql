-- =====================================================
-- NexoApps Phase 8D — Autonomous AI Enterprise Schema
-- Version 5.3
-- =====================================================

CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  head_employee_id TEXT,
  budget_allocated REAL DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS digital_employees (
  id TEXT PRIMARY KEY,
  department_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  ai_model TEXT DEFAULT 'gemini-1.5-pro',
  autonomy_level TEXT DEFAULT 'semi_autonomous',
  status TEXT DEFAULT 'active',
  tasks_completed INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS employee_roles (
  id TEXT PRIMARY KEY,
  role_name TEXT NOT NULL,
  description TEXT,
  permissions_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS employee_skills (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  proficiency_level INTEGER DEFAULT 5,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (employee_id) REFERENCES digital_employees(id)
);

CREATE TABLE IF NOT EXISTS employee_assignments (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  project_or_process_id TEXT NOT NULL,
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (employee_id) REFERENCES digital_employees(id)
);

CREATE TABLE IF NOT EXISTS business_processes (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  process_name TEXT NOT NULL,
  description TEXT,
  owner_department_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (owner_department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS process_instances (
  id TEXT PRIMARY KEY,
  process_id TEXT NOT NULL,
  trigger_source TEXT DEFAULT 'automated_event',
  status TEXT DEFAULT 'in_progress',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (process_id) REFERENCES business_processes(id)
);

CREATE TABLE IF NOT EXISTS approval_workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  process_id TEXT NOT NULL,
  step_count INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (process_id) REFERENCES business_processes(id)
);

CREATE TABLE IF NOT EXISTS approval_requests (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL,
  requester_id TEXT NOT NULL,
  approver_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  details TEXT,
  requested_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT,
  FOREIGN KEY (workflow_id) REFERENCES approval_workflows(id)
);

CREATE TABLE IF NOT EXISTS decision_records (
  id TEXT PRIMARY KEY,
  process_instance_id TEXT NOT NULL,
  decider_id TEXT NOT NULL,
  decision_outcome TEXT NOT NULL,
  confidence_score REAL DEFAULT 0.95,
  rationale TEXT,
  decided_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (process_instance_id) REFERENCES process_instances(id)
);

CREATE TABLE IF NOT EXISTS enterprise_tasks (
  id TEXT PRIMARY KEY,
  process_instance_id TEXT NOT NULL,
  assigned_employee_id TEXT,
  task_name TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  priority INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (process_instance_id) REFERENCES process_instances(id)
);

CREATE TABLE IF NOT EXISTS task_dependencies (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  depends_on_task_id TEXT NOT NULL,
  FOREIGN KEY (task_id) REFERENCES enterprise_tasks(id)
);

CREATE TABLE IF NOT EXISTS automation_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'finance',
  config_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS workflow_history (
  id TEXT PRIMARY KEY,
  process_instance_id TEXT NOT NULL,
  step_name TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (process_instance_id) REFERENCES process_instances(id)
);

CREATE TABLE IF NOT EXISTS enterprise_notifications (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS business_rules (
  id TEXT PRIMARY KEY,
  rule_name TEXT NOT NULL,
  condition_expression TEXT NOT NULL,
  action_type TEXT NOT NULL,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS rule_executions (
  id TEXT PRIMARY KEY,
  rule_id TEXT NOT NULL,
  result TEXT DEFAULT 'passed',
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (rule_id) REFERENCES business_rules(id)
);

CREATE TABLE IF NOT EXISTS enterprise_dashboards (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  title TEXT NOT NULL,
  layout_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS organization_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value REAL DEFAULT 0,
  department_id TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS enterprise_audit_logs (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_digital_employees_dept ON digital_employees(department_id);
CREATE INDEX IF NOT EXISTS idx_business_processes_tenant ON business_processes(tenant_id);
CREATE INDEX IF NOT EXISTS idx_process_instances_proc ON process_instances(process_id);
CREATE INDEX IF NOT EXISTS idx_approval_requests_wf ON approval_requests(workflow_id);

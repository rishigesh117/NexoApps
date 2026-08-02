-- =====================================================
-- NexoApps Phase 8E — Autonomous AI Super Platform Schema
-- Version 5.4
-- =====================================================

CREATE TABLE IF NOT EXISTS global_ai_networks (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  network_name TEXT NOT NULL,
  region_code TEXT DEFAULT 'global-us-east',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ai_clusters (
  id TEXT PRIMARY KEY,
  network_id TEXT NOT NULL,
  cluster_name TEXT NOT NULL,
  node_count INTEGER DEFAULT 8,
  region TEXT DEFAULT 'us-east-1',
  status TEXT DEFAULT 'healthy',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (network_id) REFERENCES global_ai_networks(id)
);

CREATE TABLE IF NOT EXISTS cluster_agents (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  node_id TEXT,
  status TEXT DEFAULT 'connected',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (cluster_id) REFERENCES ai_clusters(id)
);

CREATE TABLE IF NOT EXISTS reasoning_sessions (
  id TEXT PRIMARY KEY,
  session_title TEXT NOT NULL,
  goal_definition TEXT NOT NULL,
  strategy TEXT DEFAULT 'tree_of_thought',
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE TABLE IF NOT EXISTS reasoning_steps (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  thought_process TEXT NOT NULL,
  action_chosen TEXT,
  confidence REAL DEFAULT 0.95,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES reasoning_sessions(id)
);

CREATE TABLE IF NOT EXISTS reasoning_results (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  final_solution TEXT NOT NULL,
  score REAL DEFAULT 0.99,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES reasoning_sessions(id)
);

CREATE TABLE IF NOT EXISTS ai_governance_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  category TEXT DEFAULT 'security',
  enforcement_level TEXT DEFAULT 'strict',
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS policy_audits (
  id TEXT PRIMARY KEY,
  policy_id TEXT NOT NULL,
  evaluation_result TEXT DEFAULT 'passed',
  audited_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (policy_id) REFERENCES ai_governance_policies(id)
);

CREATE TABLE IF NOT EXISTS ai_observability (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  trace_id TEXT,
  latency_ms REAL DEFAULT 0,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_events_v2 (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  payload_json TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS resource_allocations (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  cpu_units REAL DEFAULT 16.0,
  memory_gb REAL DEFAULT 64.0,
  gpu_units INTEGER DEFAULT 4,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (cluster_id) REFERENCES ai_clusters(id)
);

CREATE TABLE IF NOT EXISTS execution_strategies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_default INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS global_task_queue (
  id TEXT PRIMARY KEY,
  task_name TEXT NOT NULL,
  target_cluster_id TEXT,
  priority INTEGER DEFAULT 1,
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS distributed_jobs (
  id TEXT PRIMARY KEY,
  job_title TEXT NOT NULL,
  nodes_allocated INTEGER DEFAULT 4,
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS distributed_job_history (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES distributed_jobs(id)
);

CREATE TABLE IF NOT EXISTS ai_optimization_profiles (
  id TEXT PRIMARY KEY,
  profile_name TEXT NOT NULL,
  target_latency_ms INTEGER DEFAULT 100,
  cpu_saver INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS system_recommendations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  impact_score REAL DEFAULT 9.5,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_health_snapshots (
  id TEXT PRIMARY KEY,
  health_score REAL DEFAULT 99.8,
  active_nodes INTEGER DEFAULT 64,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS enterprise_compliance_logs (
  id TEXT PRIMARY KEY,
  framework TEXT DEFAULT 'SOC2_TYPE_II',
  status TEXT DEFAULT 'compliant',
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS release_information (
  id TEXT PRIMARY KEY,
  version_number TEXT NOT NULL DEFAULT '5.4.0',
  release_name TEXT DEFAULT 'Autonomous AI Super Platform',
  is_lts INTEGER DEFAULT 1,
  released_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ai_clusters_network ON ai_clusters(network_id);
CREATE INDEX IF NOT EXISTS idx_reasoning_steps_session ON reasoning_steps(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_observability_trace ON ai_observability(trace_id);

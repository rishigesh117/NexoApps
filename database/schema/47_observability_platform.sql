-- =====================================================
-- NexoApps Phase 12C — Observability Platform & Version 9.3 Release Schema
-- Observability, Centralized Logging, Metrics, Distributed Tracing & Intelligent Ops
-- =====================================================

-- 1. Observability Projects
CREATE TABLE IF NOT EXISTS observability_projects (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  environment TEXT DEFAULT 'production',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Observability Services
CREATE TABLE IF NOT EXISTS observability_services (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_type TEXT DEFAULT 'microservice',
  language TEXT DEFAULT 'nodejs',
  health_status TEXT DEFAULT 'healthy',
  version TEXT DEFAULT '1.0.0',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES observability_projects(id) ON DELETE CASCADE
);

-- 3. Service Instances
CREATE TABLE IF NOT EXISTS service_instances (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  instance_name TEXT NOT NULL,
  host_ip TEXT NOT NULL,
  port INTEGER DEFAULT 8080,
  status TEXT DEFAULT 'online',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_heartbeat TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (service_id) REFERENCES observability_services(id) ON DELETE CASCADE
);

-- 4. Service Dependencies
CREATE TABLE IF NOT EXISTS service_dependencies (
  id TEXT PRIMARY KEY,
  source_service_id TEXT NOT NULL,
  target_service_id TEXT NOT NULL,
  dependency_type TEXT DEFAULT 'http_api',
  health_status TEXT DEFAULT 'healthy',
  latency_ms REAL DEFAULT 12.5,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (source_service_id) REFERENCES observability_services(id) ON DELETE CASCADE,
  FOREIGN KEY (target_service_id) REFERENCES observability_services(id) ON DELETE CASCADE
);

-- 5. Metric Definitions
CREATE TABLE IF NOT EXISTS metric_definitions (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_type TEXT DEFAULT 'gauge', -- gauge, counter, histogram, summary
  unit TEXT DEFAULT 'ms',
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6. Metric Samples
CREATE TABLE IF NOT EXISTS metric_samples (
  id TEXT PRIMARY KEY,
  metric_id TEXT NOT NULL,
  service_id TEXT,
  value REAL NOT NULL,
  tags TEXT, -- JSON key-value tags
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (metric_id) REFERENCES metric_definitions(id) ON DELETE CASCADE
);

-- 7. Metric Aggregations
CREATE TABLE IF NOT EXISTS metric_aggregations (
  id TEXT PRIMARY KEY,
  metric_id TEXT NOT NULL,
  aggregation_period TEXT DEFAULT '1m', -- 1m, 5m, 1h, 1d
  min_val REAL,
  max_val REAL,
  avg_val REAL,
  sum_val REAL,
  count_val INTEGER,
  window_start TEXT NOT NULL,
  window_end TEXT NOT NULL,
  FOREIGN KEY (metric_id) REFERENCES metric_definitions(id) ON DELETE CASCADE
);

-- 8. Log Sources
CREATE TABLE IF NOT EXISTS log_sources (
  id TEXT PRIMARY KEY,
  source_name TEXT NOT NULL,
  source_type TEXT DEFAULT 'application', -- application, container, system, cloud
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 9. Log Streams
CREATE TABLE IF NOT EXISTS log_streams (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL,
  stream_name TEXT NOT NULL,
  retention_days INTEGER DEFAULT 30,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (source_id) REFERENCES log_sources(id) ON DELETE CASCADE
);

-- 10. Log Entries
CREATE TABLE IF NOT EXISTS log_entries (
  id TEXT PRIMARY KEY,
  stream_id TEXT NOT NULL,
  service_id TEXT,
  severity TEXT DEFAULT 'INFO', -- INFO, DEBUG, WARN, ERROR, FATAL
  message TEXT NOT NULL,
  structured_data TEXT, -- JSON data
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (stream_id) REFERENCES log_streams(id) ON DELETE CASCADE
);

-- 11. Trace Services
CREATE TABLE IF NOT EXISTS trace_services (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 12. Trace Spans
CREATE TABLE IF NOT EXISTS trace_spans (
  id TEXT PRIMARY KEY,
  trace_id TEXT NOT NULL,
  span_id TEXT NOT NULL,
  parent_span_id TEXT,
  service_name TEXT NOT NULL,
  operation_name TEXT NOT NULL,
  duration_ms REAL NOT NULL,
  status_code TEXT DEFAULT 'OK', -- OK, ERROR, UNSET
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Trace Events
CREATE TABLE IF NOT EXISTS trace_events (
  id TEXT PRIMARY KEY,
  span_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  attributes TEXT, -- JSON metadata
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Alert Rules
CREATE TABLE IF NOT EXISTS alert_rules (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  name TEXT NOT NULL,
  severity TEXT DEFAULT 'warning', -- warning, critical, emergency
  is_enabled INTEGER DEFAULT 1,
  cooldown_minutes INTEGER DEFAULT 15,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 15. Alert Conditions
CREATE TABLE IF NOT EXISTS alert_conditions (
  id TEXT PRIMARY KEY,
  rule_id TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  operator TEXT DEFAULT '>', -- >, <, >=, <=, ==
  threshold REAL NOT NULL,
  evaluation_window_minutes INTEGER DEFAULT 5,
  FOREIGN KEY (rule_id) REFERENCES alert_rules(id) ON DELETE CASCADE
);

-- 16. Alert Events
CREATE TABLE IF NOT EXISTS alert_events (
  id TEXT PRIMARY KEY,
  rule_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'warning',
  status TEXT DEFAULT 'triggered', -- triggered, acknowledged, resolved
  triggered_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT,
  FOREIGN KEY (rule_id) REFERENCES alert_rules(id) ON DELETE CASCADE
);

-- 17. Incident Records
CREATE TABLE IF NOT EXISTS incident_records (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'SEV2', -- SEV1, SEV2, SEV3, SEV4
  status TEXT DEFAULT 'DETECTED', -- DETECTED, ACKNOWLEDGED, INVESTIGATING, MITIGATING, RESOLVED, CLOSED
  assigned_to TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  resolved_at TEXT
);

-- 18. Incident Events
CREATE TABLE IF NOT EXISTS incident_events (
  id TEXT PRIMARY KEY,
  incident_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- state_change, note_added, alert_linked
  note TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (incident_id) REFERENCES incident_records(id) ON DELETE CASCADE
);

-- 19. Incident Assignments
CREATE TABLE IF NOT EXISTS incident_assignments (
  id TEXT PRIMARY KEY,
  incident_id TEXT NOT NULL,
  assignee_id TEXT NOT NULL,
  role TEXT DEFAULT 'lead_responder',
  assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (incident_id) REFERENCES incident_records(id) ON DELETE CASCADE
);

-- 20. Uptime Checks
CREATE TABLE IF NOT EXISTS uptime_checks (
  id TEXT PRIMARY KEY,
  check_name TEXT NOT NULL,
  target_url TEXT NOT NULL,
  check_interval_seconds INTEGER DEFAULT 60,
  expected_status_code INTEGER DEFAULT 200,
  status TEXT DEFAULT 'passing',
  latency_ms REAL DEFAULT 45.0,
  last_check_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 21. Synthetic Monitors
CREATE TABLE IF NOT EXISTS synthetic_monitors (
  id TEXT PRIMARY KEY,
  monitor_name TEXT NOT NULL,
  script_type TEXT DEFAULT 'http_scenario',
  frequency_minutes INTEGER DEFAULT 5,
  status TEXT DEFAULT 'active',
  success_rate_pct REAL DEFAULT 99.9,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 22. Performance Profiles
CREATE TABLE IF NOT EXISTS performance_profiles (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  cpu_avg_pct REAL DEFAULT 15.4,
  memory_avg_mb REAL DEFAULT 512.0,
  p95_latency_ms REAL DEFAULT 120.0,
  error_rate_pct REAL DEFAULT 0.05,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 23. Observability Dashboards
CREATE TABLE IF NOT EXISTS observability_dashboards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  layout_config TEXT, -- JSON layout metadata
  is_default INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 24. Observability Annotations
CREATE TABLE IF NOT EXISTS observability_annotations (
  id TEXT PRIMARY KEY,
  dashboard_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'deployment', -- deployment, config_change, incident
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Observability Audit Logs
CREATE TABLE IF NOT EXISTS observability_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details TEXT, -- JSON details
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for Frequently Queried Fields
CREATE INDEX IF NOT EXISTS idx_obs_services_project ON observability_services(project_id);
CREATE INDEX IF NOT EXISTS idx_service_instances_svc ON service_instances(service_id);
CREATE INDEX IF NOT EXISTS idx_metric_samples_metric ON metric_samples(metric_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_log_entries_stream ON log_entries(stream_id, severity, timestamp);
CREATE INDEX IF NOT EXISTS idx_trace_spans_trace ON trace_spans(trace_id);
CREATE INDEX IF NOT EXISTS idx_alert_events_rule ON alert_events(rule_id, status);
CREATE INDEX IF NOT EXISTS idx_incident_events_inc ON incident_events(incident_id);
CREATE INDEX IF NOT EXISTS idx_uptime_checks_status ON uptime_checks(status);

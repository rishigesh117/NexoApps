-- =====================================================
-- NexoApps Phase 10C — AI Data Platform & Data Lakehouse Schema
-- Version 7.3
-- =====================================================

CREATE TABLE IF NOT EXISTS data_sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  source_type TEXT NOT NULL, -- postgres, snowflake, kafka, s3, mongodb
  connection_url TEXT NOT NULL,
  status TEXT DEFAULT 'connected', -- connected, disconnected, error
  last_synced_at TEXT DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_connections (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL,
  connection_name TEXT NOT NULL,
  auth_type TEXT DEFAULT 'basic', -- basic, oauth, apiKey, iam
  config TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (source_id) REFERENCES data_sources(id)
);

CREATE TABLE IF NOT EXISTS data_pipelines (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  source_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  schedule_cron TEXT DEFAULT '0 * * * *',
  status TEXT DEFAULT 'active', -- active, paused, failed
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (source_id) REFERENCES data_sources(id)
);

CREATE TABLE IF NOT EXISTS pipeline_runs (
  id TEXT PRIMARY KEY,
  pipeline_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed', -- running, completed, failed
  records_processed INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (pipeline_id) REFERENCES data_pipelines(id)
);

CREATE TABLE IF NOT EXISTS pipeline_schedules (
  id TEXT PRIMARY KEY,
  pipeline_id TEXT NOT NULL,
  cron_expression TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (pipeline_id) REFERENCES data_pipelines(id)
);

CREATE TABLE IF NOT EXISTS pipeline_logs (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (run_id) REFERENCES pipeline_runs(id)
);

CREATE TABLE IF NOT EXISTS data_lakehouses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  storage_location TEXT NOT NULL,
  format TEXT DEFAULT 'iceberg', -- iceberg, delta, hudi
  total_size_gb REAL DEFAULT 0.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_catalog (
  id TEXT PRIMARY KEY,
  lakehouse_id TEXT NOT NULL,
  table_name TEXT NOT NULL,
  schema_definition TEXT NOT NULL,
  record_count INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (lakehouse_id) REFERENCES data_lakehouses(id)
);

CREATE TABLE IF NOT EXISTS data_assets (
  id TEXT PRIMARY KEY,
  catalog_id TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_type TEXT DEFAULT 'table', -- table, view, stream
  owner TEXT DEFAULT 'data-team',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (catalog_id) REFERENCES data_catalog(id)
);

CREATE TABLE IF NOT EXISTS metadata_registry (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  meta_key TEXT NOT NULL,
  meta_value TEXT NOT NULL,
  FOREIGN KEY (asset_id) REFERENCES data_assets(id)
);

CREATE TABLE IF NOT EXISTS data_lineage (
  id TEXT PRIMARY KEY,
  source_asset_id TEXT NOT NULL,
  target_asset_id TEXT NOT NULL,
  transformation_logic TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dataset_versions (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  version_tag TEXT NOT NULL,
  snapshot_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES data_assets(id)
);

CREATE TABLE IF NOT EXISTS data_quality_rules (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  rule_type TEXT NOT NULL, -- null_check, range_check, regex_match
  column_name TEXT NOT NULL,
  threshold REAL DEFAULT 0.99,
  is_active INTEGER DEFAULT 1,
  FOREIGN KEY (asset_id) REFERENCES data_assets(id)
);

CREATE TABLE IF NOT EXISTS data_quality_reports (
  id TEXT PRIMARY KEY,
  rule_id TEXT NOT NULL,
  passed INTEGER DEFAULT 1,
  score REAL DEFAULT 100.0,
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (rule_id) REFERENCES data_quality_rules(id)
);

CREATE TABLE IF NOT EXISTS master_data (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL, -- customer, product, employee
  primary_key TEXT NOT NULL,
  attributes TEXT DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_governance_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  risk_level TEXT DEFAULT 'low', -- low, medium, high
  access_role TEXT NOT NULL,
  retention_days INTEGER DEFAULT 365,
  is_enforced INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS analytics_models (
  id TEXT PRIMARY KEY,
  model_name TEXT NOT NULL,
  query_definition TEXT NOT NULL,
  refresh_interval TEXT DEFAULT 'hourly',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS analytics_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  chart_type TEXT DEFAULT 'bar', -- bar, line, pie, table
  data_payload TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dashboard_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  layout_config TEXT DEFAULT '{}',
  is_default INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS streaming_topics (
  id TEXT PRIMARY KEY,
  topic_name TEXT UNIQUE NOT NULL,
  partitions INTEGER DEFAULT 3,
  replication_factor INTEGER DEFAULT 2,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS stream_processing_jobs (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  job_name TEXT NOT NULL,
  throughput_msg_sec INTEGER DEFAULT 1000,
  status TEXT DEFAULT 'running',
  FOREIGN KEY (topic_id) REFERENCES streaming_topics(id)
);

CREATE TABLE IF NOT EXISTS predictive_models (
  id TEXT PRIMARY KEY,
  model_name TEXT NOT NULL,
  target_column TEXT NOT NULL,
  accuracy_pct REAL DEFAULT 94.5,
  status TEXT DEFAULT 'deployed',
  trained_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS business_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value REAL NOT NULL,
  unit TEXT DEFAULT 'USD',
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_access_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  query_string TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_platform_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =====================================================
-- NexoApps Phase 7C — Enterprise Data Platform Schema
-- Version 3.2
-- =====================================================

CREATE TABLE IF NOT EXISTS data_sources (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  source_type TEXT NOT NULL DEFAULT 'database',
  connection_string TEXT,
  credentials_encrypted TEXT,
  schema_definition TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  last_synced_at TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_connectors (
  id TEXT PRIMARY KEY,
  data_source_id TEXT NOT NULL,
  connector_type TEXT NOT NULL DEFAULT 'jdbc',
  config TEXT,
  auth_method TEXT DEFAULT 'api_key',
  polling_interval_seconds INTEGER DEFAULT 3600,
  is_active INTEGER NOT NULL DEFAULT 1,
  last_health_check TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (data_source_id) REFERENCES data_sources(id)
);

CREATE TABLE IF NOT EXISTS etl_jobs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  source_id TEXT,
  destination_id TEXT,
  transformation_config TEXT,
  schedule_cron TEXT,
  status TEXT NOT NULL DEFAULT 'idle',
  last_run_at TEXT,
  next_run_at TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (source_id) REFERENCES data_sources(id)
);

CREATE TABLE IF NOT EXISTS etl_job_runs (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'running',
  rows_processed INTEGER DEFAULT 0,
  rows_failed INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  duration_ms INTEGER DEFAULT 0,
  FOREIGN KEY (job_id) REFERENCES etl_jobs(id)
);

CREATE TABLE IF NOT EXISTS data_pipelines (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  pipeline_config TEXT,
  stages TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  schedule_cron TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS warehouse_tables (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  table_name TEXT NOT NULL,
  schema_definition TEXT,
  row_count INTEGER DEFAULT 0,
  size_bytes INTEGER DEFAULT 0,
  last_updated_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS warehouse_snapshots (
  id TEXT PRIMARY KEY,
  table_id TEXT NOT NULL,
  snapshot_name TEXT,
  row_count INTEGER DEFAULT 0,
  size_bytes INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (table_id) REFERENCES warehouse_tables(id)
);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL DEFAULT 'table',
  query_config TEXT,
  visualization_config TEXT,
  filters TEXT,
  is_public INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS report_schedules (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  schedule_cron TEXT NOT NULL,
  recipients TEXT,
  format TEXT NOT NULL DEFAULT 'pdf',
  is_active INTEGER DEFAULT 1,
  last_sent_at TEXT,
  next_send_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (report_id) REFERENCES reports(id)
);

CREATE TABLE IF NOT EXISTS report_exports (
  id TEXT PRIMARY KEY,
  report_id TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'pdf',
  file_url TEXT,
  file_size INTEGER DEFAULT 0,
  exported_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (report_id) REFERENCES reports(id)
);

CREATE TABLE IF NOT EXISTS dashboard_templates (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  layout_config TEXT,
  theme TEXT DEFAULT 'dark',
  is_default INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id TEXT PRIMARY KEY,
  dashboard_id TEXT NOT NULL,
  widget_type TEXT NOT NULL DEFAULT 'chart',
  title TEXT,
  data_source TEXT,
  query_config TEXT,
  visualization_config TEXT,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  width INTEGER DEFAULT 4,
  height INTEGER DEFAULT 3,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (dashboard_id) REFERENCES dashboard_templates(id)
);

CREATE TABLE IF NOT EXISTS kpi_metrics (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  metric_type TEXT NOT NULL DEFAULT 'count',
  current_value REAL DEFAULT 0,
  target_value REAL DEFAULT 0,
  unit TEXT DEFAULT '',
  trend TEXT DEFAULT 'flat',
  data_source_id TEXT,
  refresh_interval_seconds INTEGER DEFAULT 300,
  last_refreshed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS analytics_models (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  model_type TEXT NOT NULL DEFAULT 'regression',
  algorithm TEXT DEFAULT 'linear_regression',
  training_config TEXT,
  accuracy REAL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  last_trained_at TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prediction_jobs (
  id TEXT PRIMARY KEY,
  model_id TEXT NOT NULL,
  input_data TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TEXT,
  completed_at TEXT,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (model_id) REFERENCES analytics_models(id)
);

CREATE TABLE IF NOT EXISTS prediction_results (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  prediction_output TEXT,
  confidence REAL DEFAULT 0,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES prediction_jobs(id)
);

CREATE TABLE IF NOT EXISTS executive_dashboards (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  layout_config TEXT,
  kpi_ids TEXT,
  widget_ids TEXT,
  is_default INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_reports (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  report_name TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'compliance',
  data TEXT,
  generated_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS data_quality_logs (
  id TEXT PRIMARY KEY,
  table_id TEXT,
  check_type TEXT NOT NULL DEFAULT 'completeness',
  status TEXT NOT NULL DEFAULT 'passed',
  issues_found INTEGER DEFAULT 0,
  details TEXT,
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dataset_catalog (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  schema_definition TEXT,
  tags TEXT,
  row_count INTEGER DEFAULT 0,
  size_bytes INTEGER DEFAULT 0,
  owner TEXT,
  access_level TEXT DEFAULT 'private',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_data_sources_tenant ON data_sources(tenant_id);
CREATE INDEX IF NOT EXISTS idx_data_sources_status ON data_sources(status);
CREATE INDEX IF NOT EXISTS idx_data_connectors_source ON data_connectors(data_source_id);
CREATE INDEX IF NOT EXISTS idx_etl_jobs_tenant ON etl_jobs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_etl_jobs_status ON etl_jobs(status);
CREATE INDEX IF NOT EXISTS idx_etl_job_runs_job ON etl_job_runs(job_id);
CREATE INDEX IF NOT EXISTS idx_etl_job_runs_status ON etl_job_runs(status);
CREATE INDEX IF NOT EXISTS idx_data_pipelines_tenant ON data_pipelines(tenant_id);
CREATE INDEX IF NOT EXISTS idx_warehouse_tables_tenant ON warehouse_tables(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reports_tenant ON reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_reports_created_by ON reports(created_by);
CREATE INDEX IF NOT EXISTS idx_report_schedules_report ON report_schedules(report_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_templates_tenant ON dashboard_templates(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_widgets_dashboard ON dashboard_widgets(dashboard_id);
CREATE INDEX IF NOT EXISTS idx_kpi_metrics_tenant ON kpi_metrics(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_models_tenant ON analytics_models(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_models_status ON analytics_models(status);
CREATE INDEX IF NOT EXISTS idx_prediction_jobs_model ON prediction_jobs(model_id);
CREATE INDEX IF NOT EXISTS idx_prediction_jobs_status ON prediction_jobs(status);
CREATE INDEX IF NOT EXISTS idx_prediction_results_job ON prediction_results(job_id);
CREATE INDEX IF NOT EXISTS idx_executive_dashboards_tenant ON executive_dashboards(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_tenant ON audit_reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_data_quality_logs_table ON data_quality_logs(table_id);
CREATE INDEX IF NOT EXISTS idx_dataset_catalog_tenant ON dataset_catalog(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dataset_catalog_access ON dataset_catalog(access_level);

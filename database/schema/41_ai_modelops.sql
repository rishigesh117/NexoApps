-- =====================================================
-- NexoApps Phase 11B — AI ModelOps Platform & Version 8.2 Release Schema
-- Version 8.2
-- =====================================================

CREATE TABLE IF NOT EXISTS datasets (
  id TEXT PRIMARY KEY,
  dataset_name TEXT NOT NULL,
  dataset_type TEXT DEFAULT 'tabular',
  num_rows INTEGER DEFAULT 0,
  size_bytes INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dataset_versions (
  id TEXT PRIMARY KEY,
  dataset_id TEXT NOT NULL,
  version_tag TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (dataset_id) REFERENCES datasets(id)
);

CREATE TABLE IF NOT EXISTS dataset_annotations (
  id TEXT PRIMARY KEY,
  version_id TEXT NOT NULL,
  annotation_label TEXT NOT NULL,
  confidence REAL DEFAULT 1.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (version_id) REFERENCES dataset_versions(id)
);

CREATE TABLE IF NOT EXISTS feature_stores (
  id TEXT PRIMARY KEY,
  store_name TEXT NOT NULL,
  online_engine TEXT DEFAULT 'redis',
  offline_engine TEXT DEFAULT 'iceberg',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS feature_groups (
  id TEXT PRIMARY KEY,
  store_id TEXT NOT NULL,
  group_name TEXT NOT NULL,
  entity_key TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (store_id) REFERENCES feature_stores(id)
);

CREATE TABLE IF NOT EXISTS training_jobs (
  id TEXT PRIMARY KEY,
  job_name TEXT NOT NULL,
  framework TEXT DEFAULT 'pytorch',
  dataset_version_id TEXT NOT NULL,
  status TEXT DEFAULT 'created',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (dataset_version_id) REFERENCES dataset_versions(id)
);

CREATE TABLE IF NOT EXISTS training_runs (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  run_number INTEGER NOT NULL,
  status TEXT DEFAULT 'running',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  FOREIGN KEY (job_id) REFERENCES training_jobs(id)
);

CREATE TABLE IF NOT EXISTS training_metrics (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  epoch INTEGER NOT NULL,
  loss REAL NOT NULL,
  accuracy REAL NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (run_id) REFERENCES training_runs(id)
);

CREATE TABLE IF NOT EXISTS experiments (
  id TEXT PRIMARY KEY,
  experiment_name TEXT NOT NULL,
  objective TEXT DEFAULT 'accuracy_maximization',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS experiment_runs (
  id TEXT PRIMARY KEY,
  experiment_id TEXT NOT NULL,
  run_name TEXT NOT NULL,
  metrics_json TEXT DEFAULT '{}',
  parameters_json TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (experiment_id) REFERENCES experiments(id)
);

CREATE TABLE IF NOT EXISTS hyperparameter_trials (
  id TEXT PRIMARY KEY,
  experiment_run_id TEXT NOT NULL,
  trial_number INTEGER NOT NULL,
  hyperparams_json TEXT DEFAULT '{}',
  score REAL NOT NULL,
  status TEXT DEFAULT 'completed',
  FOREIGN KEY (experiment_run_id) REFERENCES experiment_runs(id)
);

CREATE TABLE IF NOT EXISTS model_registry (
  id TEXT PRIMARY KEY,
  model_name TEXT NOT NULL,
  task_type TEXT DEFAULT 'llm_fine_tune',
  framework TEXT DEFAULT 'transformers',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS model_versions (
  id TEXT PRIMARY KEY,
  model_id TEXT NOT NULL,
  version_tag TEXT NOT NULL,
  stage TEXT DEFAULT 'staging',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (model_id) REFERENCES model_registry(id)
);

CREATE TABLE IF NOT EXISTS model_artifacts (
  id TEXT PRIMARY KEY,
  model_version_id TEXT NOT NULL,
  artifact_type TEXT DEFAULT 'weights',
  storage_url TEXT NOT NULL,
  size_bytes INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (model_version_id) REFERENCES model_versions(id)
);

CREATE TABLE IF NOT EXISTS model_deployments (
  id TEXT PRIMARY KEY,
  model_version_id TEXT NOT NULL,
  deployment_name TEXT NOT NULL,
  replica_count INTEGER DEFAULT 2,
  status TEXT DEFAULT 'healthy',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (model_version_id) REFERENCES model_versions(id)
);

CREATE TABLE IF NOT EXISTS deployment_endpoints (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  endpoint_url TEXT NOT NULL,
  auth_token TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES model_deployments(id)
);

CREATE TABLE IF NOT EXISTS prediction_logs (
  id TEXT PRIMARY KEY,
  endpoint_id TEXT NOT NULL,
  latency_ms REAL NOT NULL,
  status_code INTEGER DEFAULT 200,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (endpoint_id) REFERENCES deployment_endpoints(id)
);

CREATE TABLE IF NOT EXISTS model_monitoring (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  requests_per_sec REAL DEFAULT 145.2,
  p99_latency_ms REAL DEFAULT 18.4,
  error_rate_pct REAL DEFAULT 0.001,
  checked_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES model_deployments(id)
);

CREATE TABLE IF NOT EXISTS model_drift_reports (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  concept_drift_score REAL DEFAULT 0.02,
  feature_drift_score REAL DEFAULT 0.01,
  has_drift INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES model_deployments(id)
);

CREATE TABLE IF NOT EXISTS model_performance (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  accuracy REAL DEFAULT 0.984,
  f1_score REAL DEFAULT 0.981,
  evaluated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES model_deployments(id)
);

CREATE TABLE IF NOT EXISTS inference_requests (
  id TEXT PRIMARY KEY,
  endpoint_id TEXT NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (endpoint_id) REFERENCES deployment_endpoints(id)
);

CREATE TABLE IF NOT EXISTS inference_results (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  result_text TEXT,
  confidence REAL DEFAULT 0.99,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (request_id) REFERENCES inference_requests(id)
);

CREATE TABLE IF NOT EXISTS model_recommendations (
  id TEXT PRIMARY KEY,
  deployment_id TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (deployment_id) REFERENCES model_deployments(id)
);

CREATE TABLE IF NOT EXISTS ai_model_dashboards (
  id TEXT PRIMARY KEY,
  dashboard_name TEXT NOT NULL,
  config_json TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS modelops_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

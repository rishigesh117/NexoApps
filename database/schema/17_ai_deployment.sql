-- PostgreSQL Schema Extension: Enterprise AI Deployment, Model Marketplace & Runtime
-- NexoApps Platform - Phase 6C (Version 2.3)

-- AI Models Table
CREATE TABLE IF NOT EXISTS ai_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  task_type VARCHAR(100) NOT NULL, -- 'LLM', 'Computer Vision', 'Audio', 'Tabular'
  framework VARCHAR(100) DEFAULT 'PyTorch',
  description TEXT,
  license VARCHAR(100) DEFAULT 'Apache-2.0',
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Model Versions Table
CREATE TABLE IF NOT EXISTS model_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES ai_models(id) ON DELETE CASCADE,
  version VARCHAR(50) NOT NULL,
  artifact_path TEXT NOT NULL,
  parameters_count VARCHAR(50) DEFAULT '7B',
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Model Deployments Table
CREATE TABLE IF NOT EXISTS model_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES ai_models(id) ON DELETE CASCADE,
  version_id UUID NOT NULL REFERENCES model_versions(id) ON DELETE CASCADE,
  environment VARCHAR(50) DEFAULT 'Production',
  status VARCHAR(50) CHECK (status IN ('RUNNING', 'STOPPED', 'STARTING', 'FAILED')) DEFAULT 'RUNNING',
  replicas INT DEFAULT 2,
  endpoint_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inference Requests Table
CREATE TABLE IF NOT EXISTS inference_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES model_deployments(id) ON DELETE CASCADE,
  prompt_tokens INT DEFAULT 0,
  completion_tokens INT DEFAULT 0,
  latency_ms INT DEFAULT 0,
  status_code INT DEFAULT 200,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Datasets Table
CREATE TABLE IF NOT EXISTS datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) DEFAULT 'Text Classification',
  description TEXT,
  file_format VARCHAR(50) DEFAULT 'JSONL',
  size_mb NUMERIC(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dataset Versions Table
CREATE TABLE IF NOT EXISTS dataset_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset_id UUID NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
  version VARCHAR(50) NOT NULL,
  records_count INT DEFAULT 0,
  download_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experiments Table
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  objective TEXT,
  status VARCHAR(50) DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experiment Runs Table
CREATE TABLE IF NOT EXISTS experiment_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  model_name VARCHAR(255) NOT NULL,
  prompt_variant TEXT NOT NULL,
  accuracy_score NUMERIC(5, 2) DEFAULT 0.00,
  latency_ms INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Model Metrics Table
CREATE TABLE IF NOT EXISTS model_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES ai_models(id) ON DELETE CASCADE,
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC(10, 4) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Endpoint API Keys Table
CREATE TABLE IF NOT EXISTS endpoint_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key_name VARCHAR(100) NOT NULL,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Runtime Telemetry Logs Table
CREATE TABLE IF NOT EXISTS runtime_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name VARCHAR(100) DEFAULT 'Inference Engine',
  cpu_percent NUMERIC(5, 2) DEFAULT 0.00,
  memory_percent NUMERIC(5, 2) DEFAULT 0.00,
  gpu_percent NUMERIC(5, 2) DEFAULT 0.00,
  requests_per_sec INT DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Deployment History Table
CREATE TABLE IF NOT EXISTS deployment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES model_deployments(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ai_models_user ON ai_models(user_id);
CREATE INDEX IF NOT EXISTS idx_deployments_model ON model_deployments(model_id);
CREATE INDEX IF NOT EXISTS idx_inference_deploy ON inference_requests(deployment_id);
CREATE INDEX IF NOT EXISTS idx_datasets_user ON datasets(user_id);
CREATE INDEX IF NOT EXISTS idx_exp_runs ON experiment_runs(experiment_id);

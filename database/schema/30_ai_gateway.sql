-- =====================================================
-- NexoApps Phase 9A — AI Native Application Platform, Universal Model Hub & Enterprise AI Gateway Schema
-- Version 6.0
-- =====================================================

CREATE TABLE IF NOT EXISTS ai_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  provider_type TEXT NOT NULL, -- e.g. openai, anthropic, gemini, xai, mistral, groq, ollama, azure, bedrock, huggingface, together, openrouter, custom
  api_base_url TEXT,
  is_active INTEGER DEFAULT 1,
  health_status TEXT DEFAULT 'healthy',
  config TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS provider_models (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  model_name TEXT NOT NULL,
  model_key TEXT NOT NULL,
  context_window INTEGER DEFAULT 128000,
  max_output_tokens INTEGER DEFAULT 4096,
  input_cost_per_1k REAL DEFAULT 0.0015,
  output_cost_per_1k REAL DEFAULT 0.002,
  supports_vision INTEGER DEFAULT 1,
  supports_audio INTEGER DEFAULT 0,
  supports_function_calling INTEGER DEFAULT 1,
  supports_streaming INTEGER DEFAULT 1,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (provider_id) REFERENCES ai_providers(id)
);

CREATE TABLE IF NOT EXISTS provider_credentials (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  key_name TEXT NOT NULL,
  api_key_encrypted TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (provider_id) REFERENCES ai_providers(id)
);

CREATE TABLE IF NOT EXISTS model_capabilities (
  id TEXT PRIMARY KEY,
  model_id TEXT NOT NULL,
  capability_name TEXT NOT NULL,
  score REAL DEFAULT 0.9,
  metadata TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (model_id) REFERENCES provider_models(id)
);

CREATE TABLE IF NOT EXISTS chat_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'New Conversation',
  provider_id TEXT NOT NULL,
  model_key TEXT NOT NULL,
  system_prompt TEXT,
  temperature REAL DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 2048,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL, -- user, assistant, system, tool
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  cost REAL DEFAULT 0.0,
  latency_ms INTEGER DEFAULT 0,
  multimodal_assets TEXT DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

CREATE TABLE IF NOT EXISTS prompt_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  tags TEXT DEFAULT '[]',
  is_public INTEGER DEFAULT 1,
  author_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prompt_versions (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  version_number INTEGER NOT NULL DEFAULT 1,
  template_content TEXT NOT NULL,
  variables TEXT DEFAULT '[]',
  commit_message TEXT DEFAULT 'Initial release',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (template_id) REFERENCES prompt_templates(id)
);

CREATE TABLE IF NOT EXISTS model_usage_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  provider_id TEXT NOT NULL,
  model_key TEXT NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  estimated_cost REAL DEFAULT 0.0,
  request_duration_ms INTEGER DEFAULT 0,
  status_code INTEGER DEFAULT 200,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS token_usage (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  total_tokens INTEGER DEFAULT 0,
  total_cost REAL DEFAULT 0.0,
  request_count INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS provider_rate_limits (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  requests_per_minute INTEGER DEFAULT 60,
  tokens_per_minute INTEGER DEFAULT 150000,
  concurrent_requests INTEGER DEFAULT 10,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (provider_id) REFERENCES ai_providers(id)
);

CREATE TABLE IF NOT EXISTS provider_health (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  status TEXT DEFAULT 'healthy', -- healthy, degraded, offline
  latency_ms INTEGER DEFAULT 120,
  error_rate REAL DEFAULT 0.0,
  last_checked_at TEXT NOT NULL DEFAULT (datetime('now')),
  details TEXT DEFAULT '{}',
  FOREIGN KEY (provider_id) REFERENCES ai_providers(id)
);

CREATE TABLE IF NOT EXISTS provider_fallbacks (
  id TEXT PRIMARY KEY,
  primary_provider_id TEXT NOT NULL,
  fallback_provider_id TEXT NOT NULL,
  priority INTEGER DEFAULT 1,
  condition_rules TEXT DEFAULT '{}',
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (primary_provider_id) REFERENCES ai_providers(id),
  FOREIGN KEY (fallback_provider_id) REFERENCES ai_providers(id)
);

CREATE TABLE IF NOT EXISTS model_benchmarks (
  id TEXT PRIMARY KEY,
  model_key TEXT NOT NULL,
  benchmark_name TEXT NOT NULL,
  score REAL DEFAULT 0.0,
  evaluated_at TEXT NOT NULL DEFAULT (datetime('now')),
  metadata TEXT DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS multimodal_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  request_type TEXT NOT NULL, -- vision, audio, document, synthesis
  provider_id TEXT NOT NULL,
  model_key TEXT NOT NULL,
  input_payload TEXT NOT NULL,
  output_payload TEXT,
  status TEXT DEFAULT 'completed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS multimodal_assets (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  asset_type TEXT NOT NULL, -- image, audio, video, pdf
  asset_url TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  mime_type TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (request_id) REFERENCES multimodal_requests(id)
);

CREATE TABLE IF NOT EXISTS image_generations (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  provider_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  resolution TEXT DEFAULT '1024x1024',
  style TEXT DEFAULT 'vivid',
  cost REAL DEFAULT 0.04,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS speech_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  provider_id TEXT NOT NULL,
  type TEXT NOT NULL, -- tts, stt
  input_text_or_audio TEXT NOT NULL,
  output_url TEXT,
  duration_sec REAL DEFAULT 0.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS translation_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  provider_id TEXT NOT NULL,
  source_lang TEXT DEFAULT 'auto',
  target_lang TEXT NOT NULL,
  input_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gateway_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  ip_address TEXT,
  request_body TEXT,
  response_status INTEGER DEFAULT 200,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

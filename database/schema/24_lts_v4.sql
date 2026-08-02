-- =====================================================
-- NexoApps Phase 7E — Version 4.0 LTS Release Schema
-- Performance Optimization, Security Audit & LTS Telemetry
-- =====================================================

CREATE TABLE IF NOT EXISTS system_lts_configs (
  id TEXT PRIMARY KEY,
  config_key TEXT NOT NULL UNIQUE,
  config_value TEXT,
  description TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS security_audit_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  event_type TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  actor_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  resource_target TEXT,
  status TEXT DEFAULT 'success',
  details TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS platform_performance_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value REAL DEFAULT 0,
  unit TEXT DEFAULT 'ms',
  module_name TEXT DEFAULT 'system',
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed LTS configuration
INSERT OR IGNORE INTO system_lts_configs (id, config_key, config_value, description) VALUES
  ('lts-1', 'PLATFORM_VERSION', '4.0.0-LTS', 'Official NexoApps Platform Long-Term Support Version'),
  ('lts-2', 'SECURITY_HARDENING_STATUS', 'ENFORCED', 'Strict OWASP, CSP, HMAC, and RBAC security status'),
  ('lts-3', 'PERFORMANCE_OPTIMIZATION_STATUS', 'OPTIMIZED', 'Query indexing, caching, and frontend bundle optimization status');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_security_audit_event ON security_audit_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_tenant ON security_audit_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_security_audit_timestamp ON security_audit_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_name ON platform_performance_metrics(metric_name);

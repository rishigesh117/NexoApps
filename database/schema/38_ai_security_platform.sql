-- =====================================================
-- NexoApps Phase 10D — AI Security Platform & Zero Trust Schema
-- Version 7.4
-- =====================================================

CREATE TABLE IF NOT EXISTS identity_providers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  provider_type TEXT NOT NULL, -- saml, oidc, oauth2, active_directory
  client_id TEXT NOT NULL,
  issuer_url TEXT NOT NULL,
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tenant_id TEXT NOT NULL,
  security_tier TEXT DEFAULT 'enterprise',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS organization_members (
  id TEXT PRIMARY KEY,
  org_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  joined_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (org_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL,
  description TEXT,
  is_system_role INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS permissions (
  id TEXT PRIMARY KEY,
  permission_key TEXT UNIQUE NOT NULL,
  resource_type TEXT NOT NULL,
  action TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id TEXT NOT NULL,
  permission_id TEXT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS access_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  policy_type TEXT DEFAULT 'abac', -- rbac, abac, zero_trust
  conditions TEXT DEFAULT '{}',
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_id TEXT,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  is_mfa_verified INTEGER DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS api_keys (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  key_name TEXT NOT NULL,
  key_hash TEXT UNIQUE NOT NULL,
  permissions TEXT DEFAULT '[]',
  last_used_at TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS service_accounts (
  id TEXT PRIMARY KEY,
  account_name TEXT NOT NULL,
  role_id TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS secret_vault (
  id TEXT PRIMARY KEY,
  secret_name TEXT UNIQUE NOT NULL,
  encrypted_payload TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  created_by TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS secret_versions (
  id TEXT PRIMARY KEY,
  secret_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  encrypted_payload TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (secret_id) REFERENCES secret_vault(id)
);

CREATE TABLE IF NOT EXISTS security_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  category TEXT DEFAULT 'network', -- network, identity, data, endpoint
  enforcement_level TEXT DEFAULT 'strict',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS security_incidents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  severity TEXT DEFAULT 'medium', -- low, medium, high, critical
  status TEXT DEFAULT 'open', -- open, investigating, resolved
  detected_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS threat_intelligence (
  id TEXT PRIMARY KEY,
  indicator TEXT NOT NULL, -- ip, domain, hash
  threat_type TEXT NOT NULL,
  risk_score REAL DEFAULT 85.0,
  detected_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS vulnerability_reports (
  id TEXT PRIMARY KEY,
  cve_id TEXT NOT NULL,
  severity TEXT NOT NULL,
  affected_component TEXT NOT NULL,
  remediation_status TEXT DEFAULT 'open',
  discovered_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS security_scans (
  id TEXT PRIMARY KEY,
  scan_type TEXT DEFAULT 'sast', -- sast, dast, container, secret
  status TEXT DEFAULT 'completed',
  vulnerabilities_found INTEGER DEFAULT 0,
  ran_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS device_inventory (
  id TEXT PRIMARY KEY,
  device_name TEXT NOT NULL,
  os_type TEXT NOT NULL,
  mac_address TEXT UNIQUE NOT NULL,
  is_trusted INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS trusted_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  trusted_until TEXT NOT NULL,
  FOREIGN KEY (device_id) REFERENCES device_inventory(id)
);

CREATE TABLE IF NOT EXISTS mfa_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  mfa_type TEXT NOT NULL, -- totp, fido2, sms
  secret_key TEXT NOT NULL,
  is_verified INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS security_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  payload TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS siem_logs (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  log_message TEXT NOT NULL,
  severity TEXT DEFAULT 'notice',
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS compliance_frameworks (
  id TEXT PRIMARY KEY,
  framework_name TEXT UNIQUE NOT NULL, -- ISO27001, SOC2, GDPR, HIPAA
  version TEXT NOT NULL,
  passing_pct REAL DEFAULT 100.0
);

CREATE TABLE IF NOT EXISTS compliance_assessments (
  id TEXT PRIMARY KEY,
  framework_id TEXT NOT NULL,
  score_pct REAL NOT NULL,
  assessed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (framework_id) REFERENCES compliance_frameworks(id)
);

CREATE TABLE IF NOT EXISTS security_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

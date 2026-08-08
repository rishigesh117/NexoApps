-- =====================================================
-- NexoApps Phase 12D — Enterprise Networking & Edge Infrastructure (Version 9.4)
-- API Gateway, Global Edge Infrastructure, Routing, Load Balancing, DNS, WAF & Security
-- =====================================================

-- 1. API Gateways
CREATE TABLE IF NOT EXISTS api_gateways (
  id TEXT PRIMARY KEY,
  gateway_name TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  listen_port INTEGER DEFAULT 443,
  status TEXT DEFAULT 'active',
  mode TEXT DEFAULT 'reverse_proxy',
  version TEXT DEFAULT '9.4.0',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Gateway Instances
CREATE TABLE IF NOT EXISTS gateway_instances (
  id TEXT PRIMARY KEY,
  gateway_id TEXT NOT NULL,
  instance_name TEXT NOT NULL,
  host_ip TEXT NOT NULL,
  port INTEGER DEFAULT 8443,
  region TEXT DEFAULT 'us-east-1',
  status TEXT DEFAULT 'online',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_heartbeat TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (gateway_id) REFERENCES api_gateways(id) ON DELETE CASCADE
);

-- 3. Gateway Routes
CREATE TABLE IF NOT EXISTS gateway_routes (
  id TEXT PRIMARY KEY,
  gateway_id TEXT NOT NULL,
  route_path TEXT NOT NULL,
  methods TEXT DEFAULT 'GET,POST,PUT,DELETE',
  upstream_id TEXT,
  strip_path INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (gateway_id) REFERENCES api_gateways(id) ON DELETE CASCADE
);

-- 4. Gateway Upstreams
CREATE TABLE IF NOT EXISTS gateway_upstreams (
  id TEXT PRIMARY KEY,
  gateway_id TEXT NOT NULL,
  upstream_name TEXT NOT NULL,
  algorithm TEXT DEFAULT 'round_robin', -- round_robin, least_conn, ip_hash
  health_check_path TEXT DEFAULT '/health',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (gateway_id) REFERENCES api_gateways(id) ON DELETE CASCADE
);

-- 5. Upstream Targets
CREATE TABLE IF NOT EXISTS upstream_targets (
  id TEXT PRIMARY KEY,
  upstream_id TEXT NOT NULL,
  target_host TEXT NOT NULL,
  target_port INTEGER DEFAULT 8080,
  weight INTEGER DEFAULT 100,
  status TEXT DEFAULT 'healthy',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (upstream_id) REFERENCES gateway_upstreams(id) ON DELETE CASCADE
);

-- 6. Load Balancers
CREATE TABLE IF NOT EXISTS load_balancers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'layer_7', -- layer_4, layer_7
  algorithm TEXT DEFAULT 'round_robin',
  virtual_ip TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7. Load Balancer Targets
CREATE TABLE IF NOT EXISTS load_balancer_targets (
  id TEXT PRIMARY KEY,
  load_balancer_id TEXT NOT NULL,
  target_ip TEXT NOT NULL,
  target_port INTEGER DEFAULT 443,
  weight INTEGER DEFAULT 10,
  health_status TEXT DEFAULT 'healthy',
  FOREIGN KEY (load_balancer_id) REFERENCES load_balancers(id) ON DELETE CASCADE
);

-- 8. Traffic Policies
CREATE TABLE IF NOT EXISTS traffic_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  policy_type TEXT DEFAULT 'canary', -- canary, blue_green, mirror
  traffic_split_pct REAL DEFAULT 10.0,
  primary_upstream_id TEXT,
  secondary_upstream_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 9. Rate Limit Policies
CREATE TABLE IF NOT EXISTS rate_limit_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  requests_per_second INTEGER DEFAULT 100,
  burst_limit INTEGER DEFAULT 200,
  scope TEXT DEFAULT 'ip_address', -- ip_address, api_key, tenant
  action TEXT DEFAULT 'reject_429',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 10. API Policies
CREATE TABLE IF NOT EXISTS api_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  policy_type TEXT DEFAULT 'jwt_validation', -- jwt_validation, cors, header_transform, mock_response
  configuration TEXT, -- JSON config
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Network Policies
CREATE TABLE IF NOT EXISTS network_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  description TEXT,
  action TEXT DEFAULT 'allow', -- allow, deny
  cidr_block TEXT DEFAULT '0.0.0.0/0',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 12. Edge Locations
CREATE TABLE IF NOT EXISTS edge_locations (
  id TEXT PRIMARY KEY,
  location_code TEXT NOT NULL, -- e.g. US-EAST-IAD, EU-WEST-FRA
  location_name TEXT NOT NULL,
  region TEXT NOT NULL,
  status TEXT DEFAULT 'operational',
  latency_ms REAL DEFAULT 12.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Edge Nodes
CREATE TABLE IF NOT EXISTS edge_nodes (
  id TEXT PRIMARY KEY,
  edge_location_id TEXT NOT NULL,
  node_name TEXT NOT NULL,
  public_ip TEXT NOT NULL,
  status TEXT DEFAULT 'online',
  requests_per_sec REAL DEFAULT 450.0,
  last_heartbeat TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (edge_location_id) REFERENCES edge_locations(id) ON DELETE CASCADE
);

-- 14. Global Routes
CREATE TABLE IF NOT EXISTS global_routes (
  id TEXT PRIMARY KEY,
  domain_name TEXT NOT NULL,
  routing_strategy TEXT DEFAULT 'latency_based', -- latency_based, geo_dns, failover
  primary_region TEXT DEFAULT 'us-east-1',
  fallback_region TEXT DEFAULT 'us-west-2',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 15. DNS Zones
CREATE TABLE IF NOT EXISTS dns_zones (
  id TEXT PRIMARY KEY,
  zone_name TEXT NOT NULL, -- e.g. nexoapps.internal
  zone_type TEXT DEFAULT 'private', -- private, public
  records_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 16. DNS Records
CREATE TABLE IF NOT EXISTS dns_records (
  id TEXT PRIMARY KEY,
  zone_id TEXT NOT NULL,
  record_name TEXT NOT NULL,
  record_type TEXT DEFAULT 'A', -- A, AAAA, CNAME, TXT, MX
  record_value TEXT NOT NULL,
  ttl INTEGER DEFAULT 300,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (zone_id) REFERENCES dns_zones(id) ON DELETE CASCADE
);

-- 17. SSL Certificates
CREATE TABLE IF NOT EXISTS ssl_certificates (
  id TEXT PRIMARY KEY,
  domain_name TEXT NOT NULL,
  issuer TEXT DEFAULT 'NexoApps Managed CA',
  status TEXT DEFAULT 'valid', -- valid, expiring_soon, expired
  valid_from TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 18. Certificate Bindings
CREATE TABLE IF NOT EXISTS certificate_bindings (
  id TEXT PRIMARY KEY,
  certificate_id TEXT NOT NULL,
  gateway_id TEXT NOT NULL,
  port INTEGER DEFAULT 443,
  bound_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (certificate_id) REFERENCES ssl_certificates(id) ON DELETE CASCADE,
  FOREIGN KEY (gateway_id) REFERENCES api_gateways(id) ON DELETE CASCADE
);

-- 19. WAF Policies
CREATE TABLE IF NOT EXISTS waf_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  mode TEXT DEFAULT 'prevention', -- prevention, detection
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 20. WAF Rules
CREATE TABLE IF NOT EXISTS waf_rules (
  id TEXT PRIMARY KEY,
  waf_policy_id TEXT NOT NULL,
  rule_name TEXT NOT NULL,
  category TEXT DEFAULT 'sqli', -- sqli, xss, rce, bot_control
  action TEXT DEFAULT 'block_403',
  is_enabled INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (waf_policy_id) REFERENCES waf_policies(id) ON DELETE CASCADE
);

-- 21. Firewall Policies
CREATE TABLE IF NOT EXISTS firewall_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  direction TEXT DEFAULT 'inbound', -- inbound, outbound
  protocol TEXT DEFAULT 'tcp',
  source_cidr TEXT DEFAULT '0.0.0.0/0',
  destination_port INTEGER DEFAULT 443,
  action TEXT DEFAULT 'allow',
  priority INTEGER DEFAULT 100,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 22. Network Health
CREATE TABLE IF NOT EXISTS network_health (
  id TEXT PRIMARY KEY,
  component_name TEXT NOT NULL,
  component_type TEXT DEFAULT 'gateway',
  status TEXT DEFAULT 'healthy',
  packet_loss_pct REAL DEFAULT 0.0,
  latency_p95_ms REAL DEFAULT 14.5,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 23. Gateway Metrics
CREATE TABLE IF NOT EXISTS gateway_metrics (
  id TEXT PRIMARY KEY,
  gateway_id TEXT NOT NULL,
  requests_per_sec REAL DEFAULT 1200.0,
  latency_p95_ms REAL DEFAULT 18.2,
  error_5xx_pct REAL DEFAULT 0.01,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (gateway_id) REFERENCES api_gateways(id) ON DELETE CASCADE
);

-- 24. Traffic Statistics
CREATE TABLE IF NOT EXISTS traffic_statistics (
  id TEXT PRIMARY KEY,
  region TEXT NOT NULL,
  bytes_in INTEGER DEFAULT 104857600,
  bytes_out INTEGER DEFAULT 524288000,
  total_requests INTEGER DEFAULT 150000,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Networking Audit Logs
CREATE TABLE IF NOT EXISTS networking_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for Frequently Queried Fields
CREATE INDEX IF NOT EXISTS idx_gateway_routes_gw ON gateway_routes(gateway_id, route_path);
CREATE INDEX IF NOT EXISTS idx_upstream_targets_up ON upstream_targets(upstream_id);
CREATE INDEX IF NOT EXISTS idx_edge_nodes_loc ON edge_nodes(edge_location_id);
CREATE INDEX IF NOT EXISTS idx_dns_records_zone ON dns_records(zone_id, record_name);
CREATE INDEX IF NOT EXISTS idx_waf_rules_policy ON waf_rules(waf_policy_id);
CREATE INDEX IF NOT EXISTS idx_gateway_metrics_gw ON gateway_metrics(gateway_id, timestamp);

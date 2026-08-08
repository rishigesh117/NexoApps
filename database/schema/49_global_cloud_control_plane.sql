-- =====================================================
-- NexoApps Phase 12E — Global Cloud Control Plane (Version 9.5)
-- Multi-Region Infrastructure, Global Service Placement, Edge Workloads, DR & Cost Governance
-- =====================================================

-- 1. Cloud Providers
CREATE TABLE IF NOT EXISTS cloud_providers (
  id TEXT PRIMARY KEY,
  provider_name TEXT NOT NULL, -- e.g. AWS, GCP, Azure, On-Prem
  provider_type TEXT NOT NULL DEFAULT 'public_cloud',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Cloud Accounts
CREATE TABLE IF NOT EXISTS cloud_accounts (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_id_number TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  status TEXT DEFAULT 'connected',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (provider_id) REFERENCES cloud_providers(id) ON DELETE CASCADE
);

-- 3. Cloud Regions
CREATE TABLE IF NOT EXISTS cloud_regions (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  region_code TEXT NOT NULL, -- e.g. us-east-1, eu-central-1
  region_name TEXT NOT NULL,
  location_lat REAL DEFAULT 0.0,
  location_lng REAL DEFAULT 0.0,
  status TEXT DEFAULT 'operational',
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (provider_id) REFERENCES cloud_providers(id) ON DELETE CASCADE
);

-- 4. Cloud Zones
CREATE TABLE IF NOT EXISTS cloud_zones (
  id TEXT PRIMARY KEY,
  region_id TEXT NOT NULL,
  zone_code TEXT NOT NULL, -- e.g. us-east-1a
  zone_name TEXT NOT NULL,
  status TEXT DEFAULT 'available',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id) ON DELETE CASCADE
);

-- 5. Resource Types
CREATE TABLE IF NOT EXISTS resource_types (
  id TEXT PRIMARY KEY,
  type_name TEXT NOT NULL, -- compute, database, storage, k8s_cluster, serverless
  category TEXT DEFAULT 'infrastructure',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6. Cloud Resources
CREATE TABLE IF NOT EXISTS cloud_resources (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  region_id TEXT NOT NULL,
  resource_type_id TEXT NOT NULL,
  resource_name TEXT NOT NULL,
  provider_resource_id TEXT NOT NULL,
  status TEXT DEFAULT 'running',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (account_id) REFERENCES cloud_accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id) ON DELETE CASCADE,
  FOREIGN KEY (resource_type_id) REFERENCES resource_types(id) ON DELETE CASCADE
);

-- 7. Resource Instances
CREATE TABLE IF NOT EXISTS resource_instances (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL,
  instance_type TEXT DEFAULT 't3.xlarge',
  cpu_cores INTEGER DEFAULT 4,
  memory_gb INTEGER DEFAULT 16,
  private_ip TEXT,
  public_ip TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (resource_id) REFERENCES cloud_resources(id) ON DELETE CASCADE
);

-- 8. Region Capacity
CREATE TABLE IF NOT EXISTS region_capacity (
  id TEXT PRIMARY KEY,
  region_id TEXT NOT NULL,
  total_cpu_cores INTEGER DEFAULT 1000,
  used_cpu_cores INTEGER DEFAULT 450,
  total_memory_gb INTEGER DEFAULT 4000,
  used_memory_gb INTEGER DEFAULT 1800,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id) ON DELETE CASCADE
);

-- 9. Region Health
CREATE TABLE IF NOT EXISTS region_health (
  id TEXT PRIMARY KEY,
  region_id TEXT NOT NULL,
  status TEXT DEFAULT 'healthy',
  latency_p95_ms REAL DEFAULT 12.5,
  error_rate_pct REAL DEFAULT 0.0,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id) ON DELETE CASCADE
);

-- 10. Global Service Registry
CREATE TABLE IF NOT EXISTS global_service_registry (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_type TEXT DEFAULT 'microservice',
  version TEXT DEFAULT '9.5.0',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Service Region Bindings
CREATE TABLE IF NOT EXISTS service_region_bindings (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  region_id TEXT NOT NULL,
  replica_count INTEGER DEFAULT 3,
  routing_weight INTEGER DEFAULT 100,
  status TEXT DEFAULT 'deployed',
  bound_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (service_id) REFERENCES global_service_registry(id) ON DELETE CASCADE,
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id) ON DELETE CASCADE
);

-- 12. Global Traffic Rules
CREATE TABLE IF NOT EXISTS global_traffic_rules (
  id TEXT PRIMARY KEY,
  rule_name TEXT NOT NULL,
  routing_mode TEXT DEFAULT 'geo_latency', -- geo_latency, weighted, failover
  primary_region_id TEXT NOT NULL,
  secondary_region_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Region Failover Policies
CREATE TABLE IF NOT EXISTS region_failover_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  primary_region_id TEXT NOT NULL,
  failover_region_id TEXT NOT NULL,
  health_threshold_pct REAL DEFAULT 90.0,
  auto_failover INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Edge Workloads
CREATE TABLE IF NOT EXISTS edge_workloads (
  id TEXT PRIMARY KEY,
  workload_name TEXT NOT NULL,
  container_image TEXT NOT NULL,
  target_scope TEXT DEFAULT 'all_edge_pops',
  replicas_per_pop INTEGER DEFAULT 2,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 15. Edge Deployments
CREATE TABLE IF NOT EXISTS edge_deployments (
  id TEXT PRIMARY KEY,
  workload_id TEXT NOT NULL,
  edge_location_code TEXT NOT NULL,
  deployed_status TEXT DEFAULT 'running',
  deployed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workload_id) REFERENCES edge_workloads(id) ON DELETE CASCADE
);

-- 16. Infrastructure Stacks
CREATE TABLE IF NOT EXISTS infrastructure_stacks (
  id TEXT PRIMARY KEY,
  stack_name TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  template_type TEXT DEFAULT 'terraform', -- terraform, cloudformation, pulumi, helm
  status TEXT DEFAULT 'deployed',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 17. Infrastructure Resources
CREATE TABLE IF NOT EXISTS infrastructure_resources (
  id TEXT PRIMARY KEY,
  stack_id TEXT NOT NULL,
  resource_name TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  FOREIGN KEY (stack_id) REFERENCES infrastructure_stacks(id) ON DELETE CASCADE
);

-- 18. Provisioning Jobs
CREATE TABLE IF NOT EXISTS provisioning_jobs (
  id TEXT PRIMARY KEY,
  stack_id TEXT NOT NULL,
  action TEXT NOT NULL, -- apply, destroy, update
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (stack_id) REFERENCES infrastructure_stacks(id) ON DELETE CASCADE
);

-- 19. Provisioning Logs
CREATE TABLE IF NOT EXISTS provisioning_logs (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES provisioning_jobs(id) ON DELETE CASCADE
);

-- 20. Cloud Cost Profiles
CREATE TABLE IF NOT EXISTS cloud_cost_profiles (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  monthly_budget_usd REAL DEFAULT 5000.0,
  current_spend_usd REAL DEFAULT 3420.50,
  forecast_spend_usd REAL DEFAULT 4850.00,
  currency TEXT DEFAULT 'USD',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (account_id) REFERENCES cloud_accounts(id) ON DELETE CASCADE
);

-- 21. Resource Cost Usage
CREATE TABLE IF NOT EXISTS resource_cost_usage (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL,
  daily_cost_usd REAL DEFAULT 42.50,
  recorded_date TEXT NOT NULL DEFAULT (date('now')),
  FOREIGN KEY (resource_id) REFERENCES cloud_resources(id) ON DELETE CASCADE
);

-- 22. Disaster Recovery Plans
CREATE TABLE IF NOT EXISTS disaster_recovery_plans (
  id TEXT PRIMARY KEY,
  plan_name TEXT NOT NULL,
  primary_region_id TEXT NOT NULL,
  dr_region_id TEXT NOT NULL,
  rpo_seconds INTEGER DEFAULT 60,
  rto_minutes INTEGER DEFAULT 15,
  status TEXT DEFAULT 'ready',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 23. Disaster Recovery Executions
CREATE TABLE IF NOT EXISTS disaster_recovery_executions (
  id TEXT PRIMARY KEY,
  plan_id TEXT NOT NULL,
  execution_type TEXT DEFAULT 'drill', -- drill, real_failover
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (plan_id) REFERENCES disaster_recovery_plans(id) ON DELETE CASCADE
);

-- 24. Infrastructure Recommendations
CREATE TABLE IF NOT EXISTS infrastructure_recommendations (
  id TEXT PRIMARY KEY,
  category TEXT DEFAULT 'cost_optimization', -- cost_optimization, capacity, security, performance
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  potential_savings_usd REAL DEFAULT 0.0,
  confidence_pct REAL DEFAULT 95.0,
  is_dismissed INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Cloud Control Plane Audit Logs
CREATE TABLE IF NOT EXISTS cloud_control_plane_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for Frequently Queried Fields
CREATE INDEX IF NOT EXISTS idx_cloud_resources_account ON cloud_resources(account_id);
CREATE INDEX IF NOT EXISTS idx_cloud_resources_region ON cloud_resources(region_id);
CREATE INDEX IF NOT EXISTS idx_service_region_bindings_service ON service_region_bindings(service_id);
CREATE INDEX IF NOT EXISTS idx_provisioning_jobs_stack ON provisioning_jobs(stack_id);
CREATE INDEX IF NOT EXISTS idx_resource_cost_usage_date ON resource_cost_usage(recorded_date);

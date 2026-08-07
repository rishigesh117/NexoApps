-- =====================================================
-- NexoApps Phase 10B — AI Cloud Infrastructure Platform Schema
-- Version 7.2
-- =====================================================

CREATE TABLE IF NOT EXISTS cloud_tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'enterprise', -- starter, pro, enterprise
  status TEXT DEFAULT 'active', -- active, suspended, provisioning
  max_vcpus INTEGER DEFAULT 128,
  max_ram_gb INTEGER DEFAULT 512,
  max_storage_tb INTEGER DEFAULT 50,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tenant_users (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- owner, admin, engineer, viewer
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS tenant_settings (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS tenant_billing (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  billing_account_id TEXT NOT NULL,
  monthly_budget REAL DEFAULT 5000.00,
  current_spend REAL DEFAULT 1240.50,
  currency TEXT DEFAULT 'USD',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS cloud_regions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL, -- us-east-1, eu-west-1, ap-south-1
  location TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS availability_zones (
  id TEXT PRIMARY KEY,
  region_id TEXT NOT NULL,
  zone_code TEXT NOT NULL, -- us-east-1a, us-east-1b
  status TEXT DEFAULT 'available',
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id)
);

CREATE TABLE IF NOT EXISTS virtual_networks (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  region_id TEXT NOT NULL,
  name TEXT NOT NULL,
  cidr_block TEXT NOT NULL, -- 10.0.0.0/16
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id),
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id)
);

CREATE TABLE IF NOT EXISTS subnets (
  id TEXT PRIMARY KEY,
  vnet_id TEXT NOT NULL,
  zone_id TEXT NOT NULL,
  name TEXT NOT NULL,
  cidr_block TEXT NOT NULL, -- 10.0.1.0/24
  is_public INTEGER DEFAULT 0,
  FOREIGN KEY (vnet_id) REFERENCES virtual_networks(id),
  FOREIGN KEY (zone_id) REFERENCES availability_zones(id)
);

CREATE TABLE IF NOT EXISTS firewall_rules (
  id TEXT PRIMARY KEY,
  vnet_id TEXT NOT NULL,
  rule_name TEXT NOT NULL,
  direction TEXT DEFAULT 'inbound', -- inbound, outbound
  protocol TEXT DEFAULT 'tcp', -- tcp, udp, icmp, all
  port_range TEXT DEFAULT '80,443',
  source_cidr TEXT DEFAULT '0.0.0.0/0',
  action TEXT DEFAULT 'allow', -- allow, deny
  FOREIGN KEY (vnet_id) REFERENCES virtual_networks(id)
);

CREATE TABLE IF NOT EXISTS load_balancers (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  vnet_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'application', -- application, network
  dns_name TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id),
  FOREIGN KEY (vnet_id) REFERENCES virtual_networks(id)
);

CREATE TABLE IF NOT EXISTS compute_clusters (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  region_id TEXT NOT NULL,
  cluster_name TEXT NOT NULL,
  cluster_type TEXT DEFAULT 'kubernetes', -- kubernetes, slurm, ray_ai
  node_count INTEGER DEFAULT 8,
  gpu_count INTEGER DEFAULT 16,
  status TEXT DEFAULT 'ready',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id),
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id)
);

CREATE TABLE IF NOT EXISTS virtual_machines (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  cluster_id TEXT,
  subnet_id TEXT NOT NULL,
  name TEXT NOT NULL,
  instance_type TEXT NOT NULL DEFAULT 'ai.g5.4xlarge',
  vcpus INTEGER DEFAULT 16,
  ram_gb INTEGER DEFAULT 64,
  gpus INTEGER DEFAULT 1,
  os_image TEXT DEFAULT 'ubuntu-22.04-cuda12',
  private_ip TEXT,
  public_ip TEXT,
  status TEXT DEFAULT 'running', -- running, stopped, terminated
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id),
  FOREIGN KEY (subnet_id) REFERENCES subnets(id)
);

CREATE TABLE IF NOT EXISTS storage_volumes (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  vm_id TEXT,
  name TEXT NOT NULL,
  size_gb INTEGER NOT NULL DEFAULT 500,
  volume_type TEXT DEFAULT 'nvme_ssd', -- nvme_ssd, block_hdd, high_iops
  status TEXT DEFAULT 'attached',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS storage_buckets (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  region_id TEXT NOT NULL,
  bucket_name TEXT UNIQUE NOT NULL,
  access_level TEXT DEFAULT 'private', -- private, public_read
  storage_class TEXT DEFAULT 'standard', -- standard, glacier, warm
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS object_storage (
  id TEXT PRIMARY KEY,
  bucket_id TEXT NOT NULL,
  object_key TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  content_type TEXT DEFAULT 'application/octet-stream',
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bucket_id) REFERENCES storage_buckets(id)
);

CREATE TABLE IF NOT EXISTS network_interfaces (
  id TEXT PRIMARY KEY,
  vm_id TEXT NOT NULL,
  subnet_id TEXT NOT NULL,
  mac_address TEXT UNIQUE NOT NULL,
  ip_address TEXT NOT NULL,
  FOREIGN KEY (vm_id) REFERENCES virtual_machines(id),
  FOREIGN KEY (subnet_id) REFERENCES subnets(id)
);

CREATE TABLE IF NOT EXISTS resource_groups (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS resource_tags (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL,
  tag_key TEXT NOT NULL,
  tag_value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS resource_allocations (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  resource_type TEXT NOT NULL, -- compute, gpu, storage, network
  allocated_units REAL NOT NULL,
  unit_name TEXT DEFAULT 'vCPU',
  allocated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (tenant_id) REFERENCES cloud_tenants(id)
);

CREATE TABLE IF NOT EXISTS infrastructure_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  template_type TEXT DEFAULT 'terraform', -- terraform, cloudformation, pulumi
  content TEXT NOT NULL,
  version TEXT DEFAULT '1.0.0',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cloud_services (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'operational', -- operational, degraded, maintenance
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS service_health (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  latency_ms INTEGER DEFAULT 12,
  error_rate_pct REAL DEFAULT 0.01,
  checked_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (service_id) REFERENCES cloud_services(id)
);

CREATE TABLE IF NOT EXISTS infrastructure_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  event_type TEXT NOT NULL,
  severity TEXT DEFAULT 'info', -- info, warning, critical
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS capacity_plans (
  id TEXT PRIMARY KEY,
  region_id TEXT NOT NULL,
  predicted_growth_pct REAL DEFAULT 25.0,
  recommended_vcpus INTEGER DEFAULT 500,
  recommended_gpus INTEGER DEFAULT 64,
  planned_for TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (region_id) REFERENCES cloud_regions(id)
);

CREATE TABLE IF NOT EXISTS cloud_audit_logs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_target TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

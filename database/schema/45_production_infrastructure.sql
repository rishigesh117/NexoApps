-- =====================================================
-- NexoApps Phase 12A — Production Infrastructure & Version 9.1 Release Schema
-- Version 9.1 Production Infrastructure & Performance
-- =====================================================

-- 1. Cache Clusters
CREATE TABLE IF NOT EXISTS cache_clusters (
  id TEXT PRIMARY KEY,
  cluster_name TEXT NOT NULL,
  cluster_type TEXT DEFAULT 'redis_cluster',
  status TEXT DEFAULT 'healthy',
  nodes_count INTEGER DEFAULT 3,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Cache Nodes
CREATE TABLE IF NOT EXISTS cache_nodes (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  node_name TEXT NOT NULL,
  host_ip TEXT NOT NULL,
  port INTEGER DEFAULT 6379,
  role TEXT DEFAULT 'master',
  status TEXT DEFAULT 'online',
  FOREIGN KEY (cluster_id) REFERENCES cache_clusters(id) ON DELETE CASCADE
);

-- 3. Message Queues
CREATE TABLE IF NOT EXISTS message_queues (
  id TEXT PRIMARY KEY,
  queue_name TEXT NOT NULL,
  queue_type TEXT DEFAULT 'rabbitmq',
  messages_count INTEGER DEFAULT 0,
  consumers_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Queue Topics
CREATE TABLE IF NOT EXISTS queue_topics (
  id TEXT PRIMARY KEY,
  queue_id TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (queue_id) REFERENCES message_queues(id) ON DELETE CASCADE
);

-- 5. Queue Consumers
CREATE TABLE IF NOT EXISTS queue_consumers (
  id TEXT PRIMARY KEY,
  queue_id TEXT NOT NULL,
  consumer_name TEXT NOT NULL,
  status TEXT DEFAULT 'listening',
  FOREIGN KEY (queue_id) REFERENCES message_queues(id) ON DELETE CASCADE
);

-- 6. Background Jobs
CREATE TABLE IF NOT EXISTS background_jobs (
  id TEXT PRIMARY KEY,
  job_name TEXT NOT NULL,
  job_type TEXT DEFAULT 'async_task',
  status TEXT DEFAULT 'queued',
  payload_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7. Job Schedules
CREATE TABLE IF NOT EXISTS job_schedules (
  id TEXT PRIMARY KEY,
  schedule_name TEXT NOT NULL,
  cron_expression TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 8. Job Executions
CREATE TABLE IF NOT EXISTS job_executions (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  execution_status TEXT DEFAULT 'running',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (job_id) REFERENCES background_jobs(id) ON DELETE CASCADE
);

-- 9. Distributed Locks
CREATE TABLE IF NOT EXISTS distributed_locks (
  id TEXT PRIMARY KEY,
  lock_key TEXT UNIQUE NOT NULL,
  owner_id TEXT NOT NULL,
  acquired_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- 10. Storage Providers
CREATE TABLE IF NOT EXISTS storage_providers (
  id TEXT PRIMARY KEY,
  provider_name TEXT NOT NULL,
  provider_type TEXT DEFAULT 's3_compatible',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Storage Buckets
CREATE TABLE IF NOT EXISTS storage_buckets (
  id TEXT PRIMARY KEY,
  provider_id TEXT NOT NULL,
  bucket_name TEXT NOT NULL,
  region TEXT DEFAULT 'us-east-1',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (provider_id) REFERENCES storage_providers(id) ON DELETE CASCADE
);

-- 12. Storage Objects
CREATE TABLE IF NOT EXISTS storage_objects (
  id TEXT PRIMARY KEY,
  bucket_id TEXT NOT NULL,
  object_key TEXT NOT NULL,
  size_bytes INTEGER DEFAULT 0,
  content_type TEXT DEFAULT 'application/octet-stream',
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bucket_id) REFERENCES storage_buckets(id) ON DELETE CASCADE
);

-- 13. CDN Configurations
CREATE TABLE IF NOT EXISTS cdn_configurations (
  id TEXT PRIMARY KEY,
  domain_name TEXT NOT NULL,
  origin_url TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Performance Metrics
CREATE TABLE IF NOT EXISTS performance_metrics (
  id TEXT PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value REAL NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 15. Resource Monitors
CREATE TABLE IF NOT EXISTS resource_monitors (
  id TEXT PRIMARY KEY,
  resource_id TEXT NOT NULL,
  cpu_usage_pct REAL DEFAULT 0,
  memory_usage_pct REAL DEFAULT 0,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 16. System Alerts
CREATE TABLE IF NOT EXISTS system_alerts (
  id TEXT PRIMARY KEY,
  alert_title TEXT NOT NULL,
  severity TEXT DEFAULT 'warning',
  message TEXT NOT NULL,
  is_resolved INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 17. Health Checks
CREATE TABLE IF NOT EXISTS health_checks (
  id TEXT PRIMARY KEY,
  endpoint_name TEXT NOT NULL,
  status_code INTEGER DEFAULT 200,
  response_time_ms REAL DEFAULT 0,
  status TEXT DEFAULT 'healthy',
  checked_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 18. Service Discovery
CREATE TABLE IF NOT EXISTS service_discovery (
  id TEXT PRIMARY KEY,
  service_name TEXT NOT NULL,
  instance_ip TEXT NOT NULL,
  port INTEGER NOT NULL,
  status TEXT DEFAULT 'online'
);

-- 19. Load Distribution
CREATE TABLE IF NOT EXISTS load_distribution (
  id TEXT PRIMARY KEY,
  service_id TEXT NOT NULL,
  target_ip TEXT NOT NULL,
  weight INTEGER DEFAULT 1,
  FOREIGN KEY (service_id) REFERENCES service_discovery(id) ON DELETE CASCADE
);

-- 20. Autoscaling Policies
CREATE TABLE IF NOT EXISTS autoscaling_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  min_replicas INTEGER DEFAULT 2,
  max_replicas INTEGER DEFAULT 20,
  cpu_threshold_pct REAL DEFAULT 80.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 21. Performance Profiles
CREATE TABLE IF NOT EXISTS performance_profiles (
  id TEXT PRIMARY KEY,
  profile_name TEXT NOT NULL,
  p95_latency_ms REAL DEFAULT 0,
  p99_latency_ms REAL DEFAULT 0,
  throughput_rps REAL DEFAULT 0,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 22. Traffic Statistics
CREATE TABLE IF NOT EXISTS traffic_statistics (
  id TEXT PRIMARY KEY,
  total_requests INTEGER DEFAULT 0,
  bandwidth_gb REAL DEFAULT 0,
  recorded_date TEXT NOT NULL
);

-- 23. Maintenance Logs
CREATE TABLE IF NOT EXISTS maintenance_logs (
  id TEXT PRIMARY KEY,
  maintenance_title TEXT NOT NULL,
  details TEXT,
  performed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 24. Infrastructure Snapshots
CREATE TABLE IF NOT EXISTS infrastructure_snapshots (
  id TEXT PRIMARY KEY,
  snapshot_name TEXT NOT NULL,
  size_gb REAL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Production Audit Logs
CREATE TABLE IF NOT EXISTS production_audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

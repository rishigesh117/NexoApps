-- =====================================================
-- NexoApps Phase 12B — Database Infrastructure & Version 9.2 Release Schema
-- Version 9.2 Database Infrastructure, Distributed Storage & High Availability
-- =====================================================

-- 1. Database Clusters
CREATE TABLE IF NOT EXISTS database_clusters (
  id TEXT PRIMARY KEY,
  cluster_name TEXT NOT NULL,
  engine_type TEXT DEFAULT 'postgresql',
  version TEXT DEFAULT '16.2',
  status TEXT DEFAULT 'healthy',
  nodes_count INTEGER DEFAULT 3,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Database Nodes
CREATE TABLE IF NOT EXISTS database_nodes (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  node_name TEXT NOT NULL,
  host_ip TEXT NOT NULL,
  port INTEGER DEFAULT 5432,
  role TEXT DEFAULT 'primary',
  status TEXT DEFAULT 'online',
  FOREIGN KEY (cluster_id) REFERENCES database_clusters(id) ON DELETE CASCADE
);

-- 3. Database Instances
CREATE TABLE IF NOT EXISTS database_instances (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  instance_name TEXT NOT NULL,
  database_name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (cluster_id) REFERENCES database_clusters(id) ON DELETE CASCADE
);

-- 4. Replication Groups
CREATE TABLE IF NOT EXISTS replication_groups (
  id TEXT PRIMARY KEY,
  group_name TEXT NOT NULL,
  primary_node_id TEXT NOT NULL,
  replication_mode TEXT DEFAULT 'streaming_async',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5. Replication Status
CREATE TABLE IF NOT EXISTS replication_status (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL,
  replica_node_id TEXT NOT NULL,
  replication_lag_ms REAL DEFAULT 0,
  status TEXT DEFAULT 'in_sync',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (group_id) REFERENCES replication_groups(id) ON DELETE CASCADE
);

-- 6. Failover Events
CREATE TABLE IF NOT EXISTS failover_events (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  old_primary_id TEXT NOT NULL,
  new_primary_id TEXT NOT NULL,
  failover_reason TEXT NOT NULL,
  triggered_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (cluster_id) REFERENCES database_clusters(id) ON DELETE CASCADE
);

-- 7. Backup Policies
CREATE TABLE IF NOT EXISTS backup_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  backup_type TEXT DEFAULT 'full_daily_pitr',
  retention_days INTEGER DEFAULT 30,
  schedule_cron TEXT DEFAULT '0 2 * * *',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 8. Backup Jobs
CREATE TABLE IF NOT EXISTS backup_jobs (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  policy_id TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  size_bytes INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (cluster_id) REFERENCES database_clusters(id) ON DELETE CASCADE
);

-- 9. Backup Archives
CREATE TABLE IF NOT EXISTS backup_archives (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  archive_key TEXT NOT NULL,
  storage_location TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES backup_jobs(id) ON DELETE CASCADE
);

-- 10. Restore Jobs
CREATE TABLE IF NOT EXISTS restore_jobs (
  id TEXT PRIMARY KEY,
  archive_id TEXT NOT NULL,
  target_cluster_id TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  restored_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Restore Points (PITR)
CREATE TABLE IF NOT EXISTS restore_points (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  point_in_time TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 12. Disaster Recovery Sites
CREATE TABLE IF NOT EXISTS disaster_recovery_sites (
  id TEXT PRIMARY KEY,
  site_name TEXT NOT NULL,
  region TEXT NOT NULL,
  status TEXT DEFAULT 'standby',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Storage Clusters
CREATE TABLE IF NOT EXISTS storage_clusters (
  id TEXT PRIMARY KEY,
  cluster_name TEXT NOT NULL,
  storage_type TEXT DEFAULT 'distributed_ceph',
  total_capacity_gb REAL DEFAULT 10000.0,
  used_capacity_gb REAL DEFAULT 1200.0,
  status TEXT DEFAULT 'healthy',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Storage Nodes
CREATE TABLE IF NOT EXISTS storage_nodes (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  node_name TEXT NOT NULL,
  capacity_gb REAL DEFAULT 2500.0,
  status TEXT DEFAULT 'online',
  FOREIGN KEY (cluster_id) REFERENCES storage_clusters(id) ON DELETE CASCADE
);

-- 15. Storage Replication
CREATE TABLE IF NOT EXISTS storage_replication (
  id TEXT PRIMARY KEY,
  source_cluster_id TEXT NOT NULL,
  target_cluster_id TEXT NOT NULL,
  replication_lag_sec REAL DEFAULT 0,
  status TEXT DEFAULT 'synced'
);

-- 16. Storage Lifecycle Rules
CREATE TABLE IF NOT EXISTS storage_lifecycle_rules (
  id TEXT PRIMARY KEY,
  rule_name TEXT NOT NULL,
  transition_days INTEGER DEFAULT 90,
  action_type TEXT DEFAULT 'archive_to_cold_storage',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 17. Database Connections
CREATE TABLE IF NOT EXISTS database_connections (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  active_connections INTEGER DEFAULT 45,
  max_connections INTEGER DEFAULT 500,
  idle_connections INTEGER DEFAULT 15,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 18. Query Statistics
CREATE TABLE IF NOT EXISTS query_statistics (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  query_hash TEXT NOT NULL,
  query_text TEXT NOT NULL,
  calls_count INTEGER DEFAULT 0,
  total_exec_time_ms REAL DEFAULT 0,
  mean_exec_time_ms REAL DEFAULT 0
);

-- 19. Query Execution Logs
CREATE TABLE IF NOT EXISTS query_execution_logs (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  query_text TEXT NOT NULL,
  execution_time_ms REAL NOT NULL,
  logged_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 20. Database Health
CREATE TABLE IF NOT EXISTS database_health (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  cpu_utilization_pct REAL DEFAULT 0,
  memory_utilization_pct REAL DEFAULT 0,
  disk_utilization_pct REAL DEFAULT 0,
  health_score INTEGER DEFAULT 100,
  recorded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 21. Capacity Forecasts
CREATE TABLE IF NOT EXISTS capacity_forecasts (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  forecast_days INTEGER DEFAULT 90,
  predicted_growth_gb REAL DEFAULT 45.0,
  forecasted_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 22. Retention Policies
CREATE TABLE IF NOT EXISTS retention_policies (
  id TEXT PRIMARY KEY,
  policy_name TEXT NOT NULL,
  retention_period_days INTEGER DEFAULT 365,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 23. Database Alerts
CREATE TABLE IF NOT EXISTS database_alerts (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  alert_title TEXT NOT NULL,
  severity TEXT DEFAULT 'warning',
  message TEXT NOT NULL,
  is_resolved INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 24. Recovery Audit Logs
CREATE TABLE IF NOT EXISTS recovery_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  performed_by TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 25. Database Platform Audit Logs
CREATE TABLE IF NOT EXISTS database_platform_audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

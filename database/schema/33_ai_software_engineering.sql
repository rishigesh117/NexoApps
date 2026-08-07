-- =====================================================
-- NexoApps Phase 9D — Autonomous AI Software Engineering Platform Schema
-- Version 6.3
-- =====================================================

CREATE TABLE IF NOT EXISTS software_projects (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  tech_stack TEXT DEFAULT 'Next.js, Node.js, Express, TypeScript, SQLite',
  architecture_pattern TEXT DEFAULT 'microservices',
  status TEXT DEFAULT 'active', -- active, archived, generating
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS project_repositories (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  repo_name TEXT NOT NULL,
  default_branch TEXT DEFAULT 'main',
  is_private INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS repository_branches (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  branch_name TEXT NOT NULL,
  head_commit_hash TEXT,
  is_protected INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES project_repositories(id)
);

CREATE TABLE IF NOT EXISTS repository_commits (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  commit_hash TEXT UNIQUE NOT NULL,
  author_name TEXT NOT NULL,
  commit_message TEXT NOT NULL,
  committed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES project_repositories(id)
);

CREATE TABLE IF NOT EXISTS source_files (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  language TEXT DEFAULT 'typescript',
  content TEXT,
  line_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS code_generations (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  generated_code TEXT,
  target_file_path TEXT,
  status TEXT DEFAULT 'completed',
  generated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS code_reviews (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  target_branch TEXT DEFAULT 'main',
  status TEXT DEFAULT 'approved',
  quality_score REAL DEFAULT 95.0,
  summary TEXT,
  reviewed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS pull_requests (
  id TEXT PRIMARY KEY,
  repo_id TEXT NOT NULL,
  pr_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  source_branch TEXT NOT NULL,
  target_branch TEXT DEFAULT 'main',
  status TEXT DEFAULT 'open', -- open, merged, closed
  author_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (repo_id) REFERENCES project_repositories(id)
);

CREATE TABLE IF NOT EXISTS code_quality_reports (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  maintainability_index REAL DEFAULT 92.5,
  cognitive_complexity INTEGER DEFAULT 14,
  duplicate_code_pct REAL DEFAULT 1.2,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS security_scans (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  vulnerabilities_found INTEGER DEFAULT 0,
  severity_breakdown TEXT DEFAULT '{"high": 0, "medium": 0, "low": 0}',
  status TEXT DEFAULT 'passed',
  scanned_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS dependency_graphs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  graph_json TEXT DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS architecture_designs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  pattern_type TEXT DEFAULT 'microservices',
  diagram_mermaid TEXT,
  components_json TEXT DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS database_designs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  schema_sql TEXT,
  er_diagram TEXT,
  tables_count INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS api_specifications (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  openapi_spec TEXT,
  endpoints_count INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS test_suites (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  suite_name TEXT NOT NULL,
  suite_type TEXT DEFAULT 'unit', -- unit, integration, e2e, security
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS test_cases (
  id TEXT PRIMARY KEY,
  suite_id TEXT NOT NULL,
  test_name TEXT NOT NULL,
  assertion_code TEXT,
  is_passing INTEGER DEFAULT 1,
  FOREIGN KEY (suite_id) REFERENCES test_suites(id)
);

CREATE TABLE IF NOT EXISTS test_executions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  passed_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  executed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS bug_reports (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS bug_fixes (
  id TEXT PRIMARY KEY,
  bug_id TEXT NOT NULL,
  fix_patch TEXT,
  applied_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bug_id) REFERENCES bug_reports(id)
);

CREATE TABLE IF NOT EXISTS documentation_projects (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  readme_md TEXT,
  api_docs_md TEXT,
  architecture_docs_md TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS release_pipelines (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  pipeline_name TEXT NOT NULL,
  status TEXT DEFAULT 'success',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS deployment_histories (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  environment TEXT DEFAULT 'production',
  version_tag TEXT DEFAULT 'v1.0.0',
  deployed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS engineering_metrics (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  code_coverage_pct REAL DEFAULT 94.0,
  technical_debt_hours REAL DEFAULT 2.5,
  velocity_score REAL DEFAULT 98.0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

CREATE TABLE IF NOT EXISTS developer_activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  project_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sdlc_audit_logs (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  phase_event TEXT NOT NULL,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_id) REFERENCES software_projects(id)
);

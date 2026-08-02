-- =====================================================
-- NexoApps Phase 8C — AI Knowledge Cloud & Enterprise RAG Platform Schema
-- Version 5.2
-- =====================================================

CREATE TABLE IF NOT EXISTS knowledge_bases (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  vector_dimension INTEGER DEFAULT 1536,
  embedding_model TEXT DEFAULT 'text-embedding-3-large',
  status TEXT DEFAULT 'active',
  created_by TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS knowledge_documents (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  title TEXT NOT NULL,
  file_path TEXT,
  file_type TEXT DEFAULT 'pdf',
  file_size_bytes INTEGER DEFAULT 0,
  chunk_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'indexed',
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id)
);

CREATE TABLE IF NOT EXISTS document_chunks (
  id TEXT PRIMARY KEY,
  document_id TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content_text TEXT NOT NULL,
  token_count INTEGER DEFAULT 0,
  vector_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (document_id) REFERENCES knowledge_documents(id)
);

CREATE TABLE IF NOT EXISTS embedding_vectors (
  id TEXT PRIMARY KEY,
  chunk_id TEXT NOT NULL,
  vector_data TEXT NOT NULL,
  dimensions INTEGER DEFAULT 1536,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (chunk_id) REFERENCES document_chunks(id)
);

CREATE TABLE IF NOT EXISTS vector_indexes (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  index_name TEXT NOT NULL,
  index_type TEXT DEFAULT 'hnsw',
  metric TEXT DEFAULT 'cosine',
  vector_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'ready',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id)
);

CREATE TABLE IF NOT EXISTS knowledge_collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  document_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS knowledge_permissions (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  role TEXT DEFAULT 'viewer',
  granted_to TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id)
);

CREATE TABLE IF NOT EXISTS knowledge_connectors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  connector_type TEXT DEFAULT 'confluence',
  status TEXT DEFAULT 'connected',
  config TEXT,
  last_sync_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS connector_sync_jobs (
  id TEXT PRIMARY KEY,
  connector_id TEXT NOT NULL,
  documents_synced INTEGER DEFAULT 0,
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (connector_id) REFERENCES knowledge_connectors(id)
);

CREATE TABLE IF NOT EXISTS semantic_search_logs (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  query_text TEXT NOT NULL,
  top_k INTEGER DEFAULT 5,
  latency_ms INTEGER DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id)
);

CREATE TABLE IF NOT EXISTS rag_sessions (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  session_name TEXT NOT NULL,
  model_name TEXT DEFAULT 'gemini-1.5-pro',
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id)
);

CREATE TABLE IF NOT EXISTS rag_conversations (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  retrieved_context TEXT,
  response_text TEXT NOT NULL,
  citations TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES rag_sessions(id)
);

CREATE TABLE IF NOT EXISTS conversation_memory (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  memory_key TEXT NOT NULL,
  memory_value TEXT,
  importance_score REAL DEFAULT 5.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES rag_sessions(id)
);

CREATE TABLE IF NOT EXISTS memory_snapshots (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  snapshot_name TEXT NOT NULL,
  state_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES rag_sessions(id)
);

CREATE TABLE IF NOT EXISTS knowledge_feedback (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  comments TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES rag_conversations(id)
);

CREATE TABLE IF NOT EXISTS knowledge_versions (
  id TEXT PRIMARY KEY,
  document_id TEXT NOT NULL,
  version_number INTEGER DEFAULT 1,
  change_summary TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (document_id) REFERENCES knowledge_documents(id)
);

CREATE TABLE IF NOT EXISTS document_processing_jobs (
  id TEXT PRIMARY KEY,
  document_id TEXT NOT NULL,
  stage TEXT DEFAULT 'embedding',
  status TEXT DEFAULT 'completed',
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT,
  FOREIGN KEY (document_id) REFERENCES knowledge_documents(id)
);

CREATE TABLE IF NOT EXISTS document_processing_logs (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  log_level TEXT DEFAULT 'info',
  message TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES document_processing_jobs(id)
);

CREATE TABLE IF NOT EXISTS knowledge_statistics (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  total_documents INTEGER DEFAULT 0,
  total_chunks INTEGER DEFAULT 0,
  total_queries_today INTEGER DEFAULT 0,
  avg_search_latency_ms REAL DEFAULT 0,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id)
);

CREATE TABLE IF NOT EXISTS knowledge_audit_logs (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_bases_tenant ON knowledge_bases(tenant_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_documents_kb ON knowledge_documents(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_doc ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_vector_indexes_kb ON vector_indexes(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_rag_sessions_kb ON rag_sessions(knowledge_base_id);

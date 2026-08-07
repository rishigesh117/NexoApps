-- =====================================================
-- NexoApps Phase 11D — AI Collaboration Platform & Version 8.4 Release Schema
-- Version 8.4
-- =====================================================

-- 1. Workspaces
CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  workspace_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  owner_id TEXT NOT NULL,
  is_private INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Workspace Members
CREATE TABLE IF NOT EXISTS workspace_members (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'member',
  joined_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT DEFAULT 'active',
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 3. Workspace Roles
CREATE TABLE IF NOT EXISTS workspace_roles (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  role_name TEXT NOT NULL,
  permissions TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 4. Team Channels
CREATE TABLE IF NOT EXISTS team_channels (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  channel_type TEXT DEFAULT 'public',
  topic TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 5. Channel Messages
CREATE TABLE IF NOT EXISTS channel_messages (
  id TEXT PRIMARY KEY,
  channel_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  attachments TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (channel_id) REFERENCES team_channels(id) ON DELETE CASCADE
);

-- 6. Message Threads
CREATE TABLE IF NOT EXISTS message_threads (
  id TEXT PRIMARY KEY,
  parent_message_id TEXT NOT NULL,
  sender_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (parent_message_id) REFERENCES channel_messages(id) ON DELETE CASCADE
);

-- 7. Direct Messages
CREATE TABLE IF NOT EXISTS direct_messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  recipient_id TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 8. Meeting Rooms
CREATE TABLE IF NOT EXISTS meeting_rooms (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  room_name TEXT NOT NULL,
  room_code TEXT UNIQUE NOT NULL,
  host_id TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 9. Meeting Sessions
CREATE TABLE IF NOT EXISTS meeting_sessions (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  session_title TEXT NOT NULL,
  scheduled_start TEXT,
  scheduled_end TEXT,
  actual_start TEXT,
  actual_end TEXT,
  status TEXT DEFAULT 'scheduled',
  recording_url TEXT,
  transcript_text TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (room_id) REFERENCES meeting_rooms(id) ON DELETE CASCADE
);

-- 10. Meeting Participants
CREATE TABLE IF NOT EXISTS meeting_participants (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'attendee',
  joined_at TEXT,
  left_at TEXT,
  FOREIGN KEY (session_id) REFERENCES meeting_sessions(id) ON DELETE CASCADE
);

-- 11. Knowledge Bases
CREATE TABLE IF NOT EXISTS knowledge_bases (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 12. Knowledge Articles
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id TEXT PRIMARY KEY,
  knowledge_base_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  views_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (knowledge_base_id) REFERENCES knowledge_bases(id) ON DELETE CASCADE
);

-- 13. Document Libraries
CREATE TABLE IF NOT EXISTS document_libraries (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  library_name TEXT NOT NULL,
  description TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 14. Document Versions
CREATE TABLE IF NOT EXISTS document_versions (
  id TEXT PRIMARY KEY,
  document_id TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  uploaded_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 15. Shared Documents
CREATE TABLE IF NOT EXISTS shared_documents (
  id TEXT PRIMARY KEY,
  library_id TEXT NOT NULL,
  title TEXT NOT NULL,
  file_type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  current_version_id TEXT,
  permissions TEXT DEFAULT 'view',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (library_id) REFERENCES document_libraries(id) ON DELETE CASCADE
);

-- 16. Whiteboards
CREATE TABLE IF NOT EXISTS whiteboards (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  board_name TEXT NOT NULL,
  created_by TEXT NOT NULL,
  is_public INTEGER DEFAULT 0,
  canvas_data TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 17. Whiteboard Objects
CREATE TABLE IF NOT EXISTS whiteboard_objects (
  id TEXT PRIMARY KEY,
  whiteboard_id TEXT NOT NULL,
  object_type TEXT NOT NULL,
  position_x REAL NOT NULL,
  position_y REAL NOT NULL,
  width REAL,
  height REAL,
  properties_json TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (whiteboard_id) REFERENCES whiteboards(id) ON DELETE CASCADE
);

-- 18. Project Spaces
CREATE TABLE IF NOT EXISTS project_spaces (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  lead_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 19. Project Tasks
CREATE TABLE IF NOT EXISTS project_tasks (
  id TEXT PRIMARY KEY,
  project_space_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assignee_id TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'todo',
  due_date TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_space_id) REFERENCES project_spaces(id) ON DELETE CASCADE
);

-- 20. Project Milestones
CREATE TABLE IF NOT EXISTS project_milestones (
  id TEXT PRIMARY KEY,
  project_space_id TEXT NOT NULL,
  milestone_name TEXT NOT NULL,
  due_date TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (project_space_id) REFERENCES project_spaces(id) ON DELETE CASCADE
);

-- 21. Activity Feeds
CREATE TABLE IF NOT EXISTS activity_feeds (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 22. Team Notifications
CREATE TABLE IF NOT EXISTS team_notifications (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  notification_type TEXT DEFAULT 'info',
  is_read INTEGER DEFAULT 0,
  link_url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 23. Collaboration Analytics
CREATE TABLE IF NOT EXISTS collaboration_analytics (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  active_users_daily INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  meetings_held INTEGER DEFAULT 0,
  docs_created INTEGER DEFAULT 0,
  recorded_date TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

-- 24. Knowledge Recommendations
CREATE TABLE IF NOT EXISTS knowledge_recommendations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  article_id TEXT NOT NULL,
  relevance_score REAL NOT NULL,
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (article_id) REFERENCES knowledge_articles(id) ON DELETE CASCADE
);

-- 25. Collaboration Audit Logs
CREATE TABLE IF NOT EXISTS collaboration_audit_logs (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

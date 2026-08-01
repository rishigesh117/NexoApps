-- PostgreSQL Schema Foundation: Suggestions & Contact Messages
-- NexoApps Platform

CREATE TYPE suggestion_status AS ENUM ('Pending', 'Reviewed', 'Implemented', 'Closed');

CREATE TABLE IF NOT EXISTS suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  app_id UUID REFERENCES apps(id) ON DELETE SET NULL,
  status suggestion_status DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_suggestions_status ON suggestions(status);

-- PostgreSQL Schema Foundation: Download & View Analytics
-- NexoApps Platform

CREATE TABLE IF NOT EXISTS app_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- 'VIEW', 'DOWNLOAD', 'CLICK_EXTERNAL'
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_analytics_app_id ON app_analytics(app_id);
CREATE INDEX idx_analytics_event_type ON app_analytics(event_type);

-- PostgreSQL Schema Foundation: Downloads History & Tracking
-- NexoApps Platform

CREATE TYPE download_status AS ENUM (
  'Queued',
  'Preparing',
  'Downloading',
  'Completed',
  'Cancelled',
  'Failed'
);

CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  app_id VARCHAR(100) NOT NULL,
  app_slug VARCHAR(150) NOT NULL,
  app_title VARCHAR(150) NOT NULL,
  version VARCHAR(30) NOT NULL,
  file_size VARCHAR(50),
  download_token VARCHAR(255) UNIQUE,
  device_info VARCHAR(255),
  browser VARCHAR(100),
  os VARCHAR(100),
  ip_address VARCHAR(45),
  status download_status DEFAULT 'Queued',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_app_slug ON downloads(app_slug);
CREATE INDEX idx_downloads_token ON downloads(download_token);

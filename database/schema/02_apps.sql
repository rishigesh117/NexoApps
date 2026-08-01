-- PostgreSQL Schema Foundation: Applications Metadata
-- NexoApps Platform

CREATE TYPE app_category AS ENUM (
  'Android Apps',
  'AI Apps',
  'Web Apps',
  'Desktop Applications',
  'College Projects',
  'Future Products'
);

CREATE TYPE app_status AS ENUM (
  'Published',
  'Beta',
  'Coming Soon',
  'Maintenance'
);

CREATE TABLE IF NOT EXISTS apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category app_category NOT NULL,
  platforms VARCHAR(100)[] NOT NULL, -- e.g. ARRAY['Android', 'Web']
  version VARCHAR(30) DEFAULT '1.0.0',
  icon_url TEXT NOT NULL,
  banner_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  download_url TEXT,
  external_link TEXT,
  file_size VARCHAR(50),
  rating DECIMAL(3, 2) DEFAULT 5.00,
  total_reviews INT DEFAULT 0,
  downloads_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status app_status DEFAULT 'Published',
  tags VARCHAR(50)[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_apps_slug ON apps(slug);
CREATE INDEX idx_apps_category ON apps(category);
CREATE INDEX idx_apps_featured ON apps(is_featured);

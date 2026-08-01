-- PostgreSQL Schema Extension: AI Platform Intelligence & Enterprise Analytics
-- NexoApps Platform - Phase 5A

-- Search History Table
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  query VARCHAR(255) NOT NULL,
  category_filter VARCHAR(100),
  result_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Popular Searches Table
CREATE TABLE IF NOT EXISTS popular_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query VARCHAR(255) UNIQUE NOT NULL,
  search_count INT DEFAULT 1,
  last_searched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Daily Platform Analytics Table
CREATE TABLE IF NOT EXISTS analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  dau INT DEFAULT 0,
  total_downloads INT DEFAULT 0,
  new_users INT DEFAULT 0,
  active_developers INT DEFAULT 0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Monthly Platform Analytics Table
CREATE TABLE IF NOT EXISTS analytics_monthly (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month VARCHAR(7) UNIQUE NOT NULL, -- Format: YYYY-MM
  mau INT DEFAULT 0,
  total_downloads INT DEFAULT 0,
  active_developers INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recommendation Cache Table
CREATE TABLE IF NOT EXISTS recommendation_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recommendations JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Interests & Preferences Table
CREATE TABLE IF NOT EXISTS user_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  preferred_categories JSONB DEFAULT '[]'::jsonb,
  interacted_app_ids JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- App Views & Engagement Table
CREATE TABLE IF NOT EXISTS app_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Category Statistics Table
CREATE TABLE IF NOT EXISTS category_statistics (
  category VARCHAR(100) PRIMARY KEY,
  app_count INT DEFAULT 0,
  total_downloads INT DEFAULT 0,
  avg_rating DECIMAL(3,2) DEFAULT 0.0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Developer Daily Statistics Table
CREATE TABLE IF NOT EXISTS developer_statistics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id VARCHAR(255) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  installs INT DEFAULT 0,
  views INT DEFAULT 0,
  rating_avg DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_dev_date UNIQUE (developer_id, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_search_history_query ON search_history(query);
CREATE INDEX IF NOT EXISTS idx_popular_searches_count ON popular_searches(search_count DESC);
CREATE INDEX IF NOT EXISTS idx_app_views_app_id ON app_views(app_id);
CREATE INDEX IF NOT EXISTS idx_dev_stats_date ON developer_statistics_daily(developer_id, date);

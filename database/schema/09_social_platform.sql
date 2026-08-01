-- Database Schema Extension: Community Platform, Social Discovery & Notification Ecosystem
-- NexoApps Platform - Phase 4D

-- Table: User Following (User follows Developer Studio)
CREATE TABLE IF NOT EXISTS user_following (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  developer_id VARCHAR(255) NOT NULL,
  followed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_developer_follow UNIQUE(user_id, developer_id)
);

-- Table: Custom Collections (User App Playlists & Categories)
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  visibility VARCHAR(50) DEFAULT 'Public', -- 'Public' | 'Private' | 'Unlisted'
  cover_image TEXT,
  category VARCHAR(100) DEFAULT 'Favorites',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Collection Items (Apps inside custom collection)
CREATE TABLE IF NOT EXISTS collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id VARCHAR(255) NOT NULL,
  app_id VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_collection_app UNIQUE(collection_id, app_id)
);

-- Table: Platform User Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- 'developer_published', 'app_updated', 'wishlist_updated', 'review_reply', 'app_featured', 'security_alert', 'download_completed', 'developer_followed'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(255),
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: Daily App Analytics & Trending Score Engine
CREATE TABLE IF NOT EXISTS daily_app_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(255) NOT NULL,
  downloads INT DEFAULT 0,
  favorites INT DEFAULT 0,
  reviews INT DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  views INT DEFAULT 0,
  trending_score DECIMAL(10,2) DEFAULT 0.0,
  date DATE DEFAULT CURRENT_DATE
);

-- Indexes for Social Discovery & Community
CREATE INDEX IF NOT EXISTS idx_user_following_user_id ON user_following(user_id);
CREATE INDEX IF NOT EXISTS idx_user_following_dev_id ON user_following(developer_id);
CREATE INDEX IF NOT EXISTS idx_collections_user_id ON collections(user_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_coll_id ON collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_daily_app_stats_app_id ON daily_app_statistics(app_id);
CREATE INDEX IF NOT EXISTS idx_daily_app_stats_trending ON daily_app_statistics(trending_score DESC);

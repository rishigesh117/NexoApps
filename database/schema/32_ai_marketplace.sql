-- =====================================================
-- NexoApps Phase 9C — AI Marketplace, Agent Ecosystem & Enterprise Extension Platform Schema
-- Version 6.2
-- =====================================================

CREATE TABLE IF NOT EXISTS marketplace_publishers (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  publisher_name TEXT NOT NULL,
  publisher_slug TEXT UNIQUE NOT NULL,
  website_url TEXT,
  support_email TEXT,
  bio TEXT,
  verification_status TEXT DEFAULT 'verified', -- pending, verified, rejected
  revenue_share_pct REAL DEFAULT 85.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS marketplace_items (
  id TEXT PRIMARY KEY,
  publisher_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  full_description TEXT,
  item_type TEXT NOT NULL, -- agent, plugin, workflow, dataset, template, extension
  category TEXT DEFAULT 'General',
  pricing_model TEXT DEFAULT 'free', -- free, freemium, paid, subscription
  price_usd REAL DEFAULT 0.0,
  icon_url TEXT,
  banner_url TEXT,
  version TEXT DEFAULT '1.0.0',
  download_count INTEGER DEFAULT 0,
  rating_avg REAL DEFAULT 5.0,
  rating_count INTEGER DEFAULT 1,
  is_published INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (publisher_id) REFERENCES marketplace_publishers(id)
);

CREATE TABLE IF NOT EXISTS marketplace_categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'Tag',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS marketplace_versions (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  version_number TEXT NOT NULL,
  changelog TEXT,
  package_url TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  checksum TEXT,
  released_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  review_text TEXT,
  is_approved INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_ratings (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating_score INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_downloads (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  version_number TEXT,
  ip_address TEXT,
  downloaded_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_purchases (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  amount_paid REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'completed',
  license_key TEXT,
  purchased_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_subscriptions (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  plan_tier TEXT DEFAULT 'monthly',
  status TEXT DEFAULT 'active',
  renews_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS publisher_verifications (
  id TEXT PRIMARY KEY,
  publisher_id TEXT NOT NULL,
  tax_id TEXT,
  identity_verified INTEGER DEFAULT 1,
  domain_verified INTEGER DEFAULT 1,
  verified_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (publisher_id) REFERENCES marketplace_publishers(id)
);

CREATE TABLE IF NOT EXISTS marketplace_assets (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_url TEXT NOT NULL,
  asset_type TEXT DEFAULT 'document',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_screenshots (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 1,
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_tags (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  tag_name TEXT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_collections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_url TEXT,
  is_featured INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS marketplace_featured (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  collection_id TEXT,
  featured_position INTEGER DEFAULT 1,
  start_date TEXT NOT NULL DEFAULT (datetime('now')),
  end_date TEXT,
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS marketplace_license_keys (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  license_key TEXT UNIQUE NOT NULL,
  license_type TEXT DEFAULT 'standard', -- standard, premium, enterprise
  max_activations INTEGER DEFAULT 5,
  activation_count INTEGER DEFAULT 1,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (item_id) REFERENCES marketplace_items(id)
);

CREATE TABLE IF NOT EXISTS plugin_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  plugin_key TEXT UNIQUE NOT NULL,
  description TEXT,
  version TEXT DEFAULT '1.0.0',
  entrypoint_file TEXT DEFAULT 'index.js',
  is_official INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS plugin_installations (
  id TEXT PRIMARY KEY,
  plugin_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  installed_version TEXT DEFAULT '1.0.0',
  installed_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (plugin_id) REFERENCES plugin_registry(id)
);

CREATE TABLE IF NOT EXISTS plugin_permissions (
  id TEXT PRIMARY KEY,
  plugin_id TEXT NOT NULL,
  permission_name TEXT NOT NULL, -- network_access, storage_access, gateway_routing
  FOREIGN KEY (plugin_id) REFERENCES plugin_registry(id)
);

CREATE TABLE IF NOT EXISTS plugin_updates (
  id TEXT PRIMARY KEY,
  plugin_id TEXT NOT NULL,
  target_version TEXT NOT NULL,
  update_notes TEXT,
  released_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (plugin_id) REFERENCES plugin_registry(id)
);

CREATE TABLE IF NOT EXISTS extension_packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  package_id TEXT UNIQUE NOT NULL,
  sdk_version TEXT DEFAULT '6.2.0',
  author TEXT,
  manifest_json TEXT DEFAULT '{}',
  is_verified INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS extension_versions (
  id TEXT PRIMARY KEY,
  extension_id TEXT NOT NULL,
  version_str TEXT NOT NULL,
  download_url TEXT NOT NULL,
  released_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (extension_id) REFERENCES extension_packages(id)
);

CREATE TABLE IF NOT EXISTS extension_dependencies (
  id TEXT PRIMARY KEY,
  extension_id TEXT NOT NULL,
  dependency_name TEXT NOT NULL,
  min_version TEXT,
  FOREIGN KEY (extension_id) REFERENCES extension_packages(id)
);

CREATE TABLE IF NOT EXISTS marketplace_activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  item_id TEXT,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS marketplace_statistics (
  id TEXT PRIMARY KEY,
  period_date TEXT UNIQUE NOT NULL,
  total_downloads INTEGER DEFAULT 0,
  total_revenue_usd REAL DEFAULT 0.0,
  active_publishers INTEGER DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

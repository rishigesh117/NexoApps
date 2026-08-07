-- =====================================================
-- NexoApps Phase 10A — AI Commerce Platform & Digital Marketplace Schema
-- Version 7.1
-- =====================================================

CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'ShoppingBag',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id TEXT,
  product_type TEXT NOT NULL DEFAULT 'digital_app', -- digital_app, ai_model, api_subscription, dataset, license
  status TEXT DEFAULT 'published', -- draft, published, archived
  icon_url TEXT,
  banner_url TEXT,
  download_url TEXT,
  features TEXT DEFAULT '[]',
  rating REAL DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES product_categories(id)
);

CREATE TABLE IF NOT EXISTS product_pricing (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  pricing_model TEXT NOT NULL DEFAULT 'one_time', -- one_time, recurring, usage_based, free
  price REAL NOT NULL DEFAULT 0.0,
  currency TEXT DEFAULT 'USD',
  billing_interval TEXT, -- monthly, yearly
  usage_unit TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price REAL NOT NULL DEFAULT 0.0,
  currency TEXT DEFAULT 'USD',
  billing_cycle TEXT NOT NULL DEFAULT 'monthly', -- monthly, yearly
  tier TEXT DEFAULT 'pro', -- free, pro, enterprise
  features TEXT DEFAULT '[]',
  max_api_calls INTEGER DEFAULT 10000,
  max_storage_gb INTEGER DEFAULT 10,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, expired, past_due
  current_period_start TEXT NOT NULL,
  current_period_end TEXT NOT NULL,
  cancel_at_period_end INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

CREATE TABLE IF NOT EXISTS subscription_history (
  id TEXT PRIMARY KEY,
  subscription_id TEXT NOT NULL,
  action TEXT NOT NULL, -- created, upgraded, downgraded, canceled, renewed
  old_plan_id TEXT,
  new_plan_id TEXT,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed', -- pending, completed, refunded, failed
  total_amount REAL NOT NULL DEFAULT 0.0,
  currency TEXT DEFAULT 'USD',
  tax_amount REAL DEFAULT 0.0,
  discount_amount REAL DEFAULT 0.0,
  coupon_code TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price REAL NOT NULL,
  total_price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payment_gateways (
  id TEXT PRIMARY KEY,
  gateway_name TEXT NOT NULL, -- stripe, paypal, razorpay, crypto
  is_enabled INTEGER DEFAULT 1,
  config TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  gateway_id TEXT,
  payment_method TEXT NOT NULL, -- credit_card, paypal, crypto
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'succeeded', -- pending, succeeded, failed, refunded
  transaction_ref TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS payment_transactions (
  id TEXT PRIMARY KEY,
  payment_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- charge.succeeded, refund.created
  raw_payload TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (payment_id) REFERENCES payments(id)
);

CREATE TABLE IF NOT EXISTS licenses (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  license_key TEXT UNIQUE NOT NULL,
  license_type TEXT DEFAULT 'personal', -- personal, commercial, enterprise
  max_activations INTEGER DEFAULT 1,
  current_activations INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, revoked, expired
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS license_keys (
  id TEXT PRIMARY KEY,
  license_id TEXT NOT NULL,
  activation_code TEXT UNIQUE NOT NULL,
  device_id TEXT,
  activated_at TEXT,
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

CREATE TABLE IF NOT EXISTS invoice_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company_details TEXT DEFAULT '{}',
  footer_text TEXT,
  is_default INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  tax_amount REAL DEFAULT 0.0,
  status TEXT DEFAULT 'paid', -- draft, sent, paid, void
  due_date TEXT,
  paid_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS refund_requests (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  amount REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS coupon_codes (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percentage', -- percentage, fixed
  discount_value REAL NOT NULL,
  max_uses INTEGER DEFAULT 100,
  used_count INTEGER DEFAULT 0,
  expires_at TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS discount_campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  banner_message TEXT,
  discount_percentage REAL NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS shopping_cart (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS affiliate_programs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  commission_rate REAL DEFAULT 15.0, -- percentage
  cookie_days INTEGER DEFAULT 30,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS affiliate_commissions (
  id TEXT PRIMARY KEY,
  affiliate_user_id TEXT NOT NULL,
  order_id TEXT NOT NULL,
  commission_amount REAL NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, paid
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS seller_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  store_name TEXT NOT NULL,
  store_slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  payout_details TEXT DEFAULT '{}',
  status TEXT DEFAULT 'approved', -- pending, approved, suspended
  rating REAL DEFAULT 0.0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS seller_payouts (
  id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT DEFAULT 'completed', -- pending, processing, completed
  payout_method TEXT DEFAULT 'bank_transfer',
  processed_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (seller_id) REFERENCES seller_accounts(id)
);

CREATE TABLE IF NOT EXISTS commerce_audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

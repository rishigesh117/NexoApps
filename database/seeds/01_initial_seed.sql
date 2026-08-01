-- Initial Seed Data: NexoApps Platform
-- Featured First Application: Batlytics – Cricket Scoring App

INSERT INTO apps (
  slug,
  title,
  tagline,
  description,
  category,
  platforms,
  version,
  icon_url,
  banner_url,
  screenshots,
  features,
  download_url,
  file_size,
  rating,
  total_reviews,
  downloads_count,
  is_featured,
  status,
  tags
) VALUES (
  'batlytics-cricket-scoring',
  'Batlytics',
  'Real-Time Cricket Scoring & Analytics Engine',
  'Batlytics is a modern, high-precision cricket scoring and analytics application designed for teams, leagues, and enthusiasts. Track ball-by-ball commentary, player statistics, worm graphs, run rate comparison charts, and generate instant PDF match summaries.',
  'Android Apps',
  ARRAY['Android'],
  '1.0.0-beta',
  '/assets/apps/batlytics-icon.png',
  '/assets/apps/batlytics-banner.png',
  ARRAY['/assets/apps/batlytics-shot1.png', '/assets/apps/batlytics-shot2.png', '/assets/apps/batlytics-shot3.png'],
  ARRAY[
    'Ball-by-Ball Live Scoring & Express Entry',
    'Deep Player Stats & Strike Rate Analytics',
    'Interactive Worm, Manhattan, and Run Rate Graphs',
    'Offline Match Storage with Automatic Cloud Sync',
    'Match Summary PDF Generator & Instant Social Sharing'
  ],
  '/downloads/batlytics-v1.0.0.apk',
  '24.5 MB',
  4.9,
  128,
  1540,
  TRUE,
  'Published',
  ARRAY['Cricket', 'Sports', 'Analytics', 'Scoring', 'Android App']
);

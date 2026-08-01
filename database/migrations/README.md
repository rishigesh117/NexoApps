# Database Migrations Architecture - NexoApps

This directory is designated for timestamped SQL migration scripts to track schema evolution over time.

## Directory Structure
- `/schema`: Full baseline SQL DDL definitions.
- `/migrations`: Sequential schema patches (e.g., `001_add_user_oauth.sql`, `002_add_app_categories.sql`).
- `/seeds`: Mock or initialization datasets.

## Migration Naming Convention
`YYYYMMDD_HHMMSS_<description>.sql`
Example: `20260727_214000_create_initial_tables.sql`

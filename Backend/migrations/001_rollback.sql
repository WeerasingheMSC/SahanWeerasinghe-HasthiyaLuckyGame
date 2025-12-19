-- Rollback script for migration 001
-- Purpose: Drop all tables and views created in initial setup

USE Lucky_4;

-- Drop views
DROP VIEW IF EXISTS leaderboard_view;

-- Drop tables
DROP TABLE IF EXISTS games;

-- Optionally drop the database (uncomment if needed)
-- DROP DATABASE IF EXISTS Lucky_4;

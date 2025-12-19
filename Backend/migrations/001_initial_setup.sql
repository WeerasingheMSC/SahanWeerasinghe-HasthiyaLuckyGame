-- Migration: Create Lucky_4 database and games table
-- Version: 1.0
-- Date: 2025-12-19
-- Description: Initial database setup for Hasthiya Lucky 4 game

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS Lucky_4 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE Lucky_4;

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(50) NOT NULL,
  player_numbers JSON DEFAULT NULL COMMENT 'Array of 4 player-selected numbers (0-9)',
  lucky_numbers JSON DEFAULT NULL COMMENT 'Array of 4 system-generated lucky numbers (0-9)',
  matches INT DEFAULT 0 COMMENT 'Number of matching positions',
  score INT DEFAULT 0 COMMENT 'Score earned (0, 10, 50, 200, or 1000)',
  status ENUM('active', 'completed') DEFAULT 'active' COMMENT 'Game status',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  played_at TIMESTAMP NULL DEFAULT NULL,
  
  -- Indexes for performance
  INDEX idx_player_name (player_name),
  INDEX idx_status (status),
  INDEX idx_score (score DESC),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_played_at (played_at DESC),
  
  -- Composite indexes for common queries
  INDEX idx_status_score (status, score DESC),
  INDEX idx_player_status (player_name, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create a view for leaderboard
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT 
  player_name,
  COUNT(*) as total_games,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_games,
  SUM(score) as total_score,
  MAX(score) as highest_score,
  AVG(score) as avg_score,
  ROUND(AVG(matches), 2) as avg_matches,
  SUM(CASE WHEN matches = 4 THEN 1 ELSE 0 END) as jackpots,
  MAX(played_at) as last_played,
  MIN(created_at) as first_game
FROM games
WHERE status = 'completed'
GROUP BY player_name
ORDER BY total_score DESC, completed_games DESC;

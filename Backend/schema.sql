-- Create database schema for Hasthiya Lucky 4 game

-- Drop table if exists (for development)
DROP TABLE IF EXISTS games;

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(50) NOT NULL,
  player_email VARCHAR(255) NOT NULL,
  player_numbers JSON DEFAULT NULL,
  lucky_numbers JSON DEFAULT NULL,
  matches INT DEFAULT 0,
  score INT DEFAULT 0,
  status ENUM('active', 'completed') DEFAULT 'active',
  is_played BOOLEAN AS (status = 'completed') STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  played_at TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY unique_email (player_email),
  INDEX idx_player_name (player_name),
  INDEX idx_player_email (player_email),
  INDEX idx_status (status),
  INDEX idx_is_played (is_played),
  INDEX idx_score (score),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample data for testing (optional)
INSERT INTO games (player_name, player_email, player_numbers, lucky_numbers, matches, score, status, created_at, played_at) 
VALUES 
  ('Alice', 'alice@example.com', '[1,2,3,4]', '[2,5,8,3]', 0, 82, 'completed', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
  ('Bob', 'bob@example.com', '[2,5,8,3]', '[2,5,8,3]', 4, 100, 'completed', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
  ('Charlie', 'charlie@example.com', '[1,4,7,2]', '[2,5,8,3]', 0, 84, 'completed', NOW(), NOW());

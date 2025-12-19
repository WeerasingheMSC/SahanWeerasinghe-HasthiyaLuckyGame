-- Create database schema for Hasthiya Lucky 4 game

-- Drop table if exists (for development)
DROP TABLE IF EXISTS games;

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(50) NOT NULL,
  player_numbers JSON DEFAULT NULL,
  lucky_numbers JSON DEFAULT NULL,
  matches INT DEFAULT 0,
  score INT DEFAULT 0,
  status ENUM('active', 'completed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  played_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_player_name (player_name),
  INDEX idx_status (status),
  INDEX idx_score (score),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample data for testing (optional)
INSERT INTO games (player_name, player_numbers, lucky_numbers, matches, score, status, created_at, played_at) 
VALUES 
  ('Alice', '[1,2,3,4]', '[1,2,5,6]', 2, 50, 'completed', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
  ('Bob', '[5,6,7,8]', '[5,6,7,8]', 4, 1000, 'completed', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
  ('Charlie', '[0,1,2,3]', '[0,1,2,9]', 3, 200, 'completed', NOW(), NOW());

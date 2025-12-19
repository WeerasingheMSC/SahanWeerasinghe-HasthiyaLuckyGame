-- Drop table if exists 
DROP TABLE IF EXISTS game_results;

-- Create game_results table
CREATE TABLE IF NOT EXISTS game_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  generated_numbers JSON,
  score INT DEFAULT 0,
  is_played BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample data for testing
INSERT INTO game_results (email, generated_numbers, score, is_played, created_at) 
VALUES 
  ('Ushan@example.com', '[1,2,3,4]', 82, TRUE, NOW() - INTERVAL 2 DAY),
  ('Sahan@example.com', '[2,5,8,3]', 100, TRUE, NOW() - INTERVAL 1 DAY),
  ('Charith@example.com', '[1,4,7,2]', 84, TRUE, NOW());

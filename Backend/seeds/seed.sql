-- Seed data for Lucky_4 database
-- Purpose: Provide test data for development and demonstration

USE Lucky_4;

-- Clear existing data (for fresh seed)
TRUNCATE TABLE games;

-- Insert sample game sessions with various outcomes
INSERT INTO games (player_name, player_numbers, lucky_numbers, matches, score, status, created_at, played_at) 
VALUES 
  -- Jackpot winner
  ('Emma Watson', '[5,6,7,8]', '[5,6,7,8]', 4, 1000, 'completed', 
   NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
  
  -- High scorer (3 matches)
  ('John Doe', '[0,1,2,3]', '[0,1,2,9]', 3, 200, 'completed', 
   NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY),
  
  ('Alice Smith', '[4,5,6,7]', '[4,5,6,1]', 3, 200, 'completed', 
   NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
  
  -- Medium scorer (2 matches)
  ('Bob Johnson', '[1,2,3,4]', '[1,2,5,6]', 2, 50, 'completed', 
   NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
  
  ('Charlie Brown', '[8,9,0,1]', '[8,9,5,5]', 2, 50, 'completed', 
   NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
  
  -- Low scorer (1 match)
  ('Diana Prince', '[2,3,4,5]', '[2,7,8,9]', 1, 10, 'completed', 
   NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
  
  ('Eve Martinez', '[6,7,8,9]', '[6,1,2,3]', 1, 10, 'completed', 
   NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
  
  -- No matches
  ('Frank Miller', '[0,0,0,0]', '[9,9,9,9]', 0, 0, 'completed', 
   NOW() - INTERVAL 12 HOUR, NOW() - INTERVAL 12 HOUR),
  
  -- Active games (not yet played)
  ('Grace Lee', NULL, NULL, 0, 0, 'active', NOW(), NULL),
  ('Henry Kim', NULL, NULL, 0, 0, 'active', NOW(), NULL),
  
  -- Multiple games by same player
  ('Emma Watson', '[1,1,1,1]', '[1,2,3,4]', 1, 10, 'completed', 
   NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
  
  ('Emma Watson', '[9,8,7,6]', '[9,8,7,6]', 4, 1000, 'completed', 
   NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
  
  ('John Doe', '[5,5,5,5]', '[5,6,7,8]', 1, 10, 'completed', 
   NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY);

-- Verify seed data
SELECT 
  COUNT(*) as total_games,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active
FROM games;

-- Show leaderboard
SELECT * FROM leaderboard_view LIMIT 5;

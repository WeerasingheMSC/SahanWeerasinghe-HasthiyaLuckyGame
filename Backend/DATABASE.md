# Database Setup - Hasthiya Lucky 4

## Overview
MySQL database configuration for the Hasthiya Lucky 4 game. This setup includes table schemas, indexes, views, and seed data for development.

## Database Structure

### Database: `Lucky_4`
- Character Set: `utf8mb4`
- Collation: `utf8mb4_unicode_ci`

### Table: `games`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT (PK, Auto-increment) | Unique game identifier |
| `player_name` | VARCHAR(50) | Player's name |
| `player_numbers` | JSON | Array of 4 player-selected numbers (0-9) |
| `lucky_numbers` | JSON | Array of 4 system-generated lucky numbers (0-9) |
| `matches` | INT | Number of matching positions (0-4) |
| `score` | INT | Points earned (0, 10, 50, 200, or 1000) |
| `status` | ENUM('active', 'completed') | Game status |
| `created_at` | TIMESTAMP | Game creation time |
| `played_at` | TIMESTAMP | Game completion time |

### Indexes
- `idx_player_name` - Player name lookup
- `idx_status` - Filter by status
- `idx_score` - Sort by score (DESC)
- `idx_created_at` - Sort by creation date (DESC)
- `idx_played_at` - Sort by play date (DESC)
- `idx_status_score` - Composite for leaderboard queries
- `idx_player_status` - Player's game history

### View: `leaderboard_view`
Aggregates player statistics:
- Total games, completed games
- Total score, highest score, average score
- Average matches, jackpots count
- Last played, first game dates

## Setup Instructions

### 1. Initial Setup (Migration)
Run the migration script to create database and tables:
```bash
mysql -u root -p < Backend/migrations/001_initial_setup.sql
```

Or connect to MySQL and run:
```bash
mysql -u root -p
source Backend/migrations/001_initial_setup.sql
```

### 2. Load Seed Data (Optional)
Populate database with test data:
```bash
mysql -u root -p Lucky_4 < Backend/seeds/seed.sql
```

### 3. Configure Environment
Ensure your `.env` file has correct database credentials:
```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=YourPassword
DB_NAME=Lucky_4
DB_PORT=3306
```

### 4. Test Connection
Run the test endpoint:
```bash
curl http://localhost:3000/api/test-db
```

## Migration Scripts

### Available Migrations
- `001_initial_setup.sql` - Creates database, tables, and views
- `001_rollback.sql` - Rolls back initial setup

### Running Migrations
```bash
# Apply migration
mysql -u root -p < Backend/migrations/001_initial_setup.sql

# Rollback migration
mysql -u root -p < Backend/migrations/001_rollback.sql
```

## Seed Data

The seed file includes:
- 1 Jackpot winner (4 matches, 1000 points)
- 2 High scorers (3 matches, 200 points each)
- 2 Medium scorers (2 matches, 50 points each)
- 2 Low scorers (1 match, 10 points each)
- 1 No match (0 points)
- 2 Active games (not yet played)
- Multiple games by same players (for testing)

## Database Queries

### Check Game Statistics
```sql
SELECT 
  COUNT(*) as total_games,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active
FROM games;
```

### View Leaderboard
```sql
SELECT * FROM leaderboard_view LIMIT 10;
```

### Player Statistics
```sql
SELECT * FROM leaderboard_view WHERE player_name = 'Emma Watson';
```

## Performance Optimization

### Indexes
All frequently queried columns are indexed:
- Player lookups: `idx_player_name`
- Status filters: `idx_status`
- Score sorting: `idx_score`
- Date sorting: `idx_created_at`, `idx_played_at`
- Composite queries: `idx_status_score`, `idx_player_status`

### JSON Storage
Player and lucky numbers are stored as JSON arrays for:
- Flexible schema
- Easy array operations
- Native MySQL JSON functions support

### View Performance
The `leaderboard_view` is a materialized query that can be:
- Queried directly for leaderboard display
- Filtered and sorted efficiently
- Cached by the application layer

## Backup and Restore

### Backup Database
```bash
mysqldump -u root -p Lucky_4 > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
mysql -u root -p Lucky_4 < backup_20251219.sql
```

## Troubleshooting

### Connection Issues
1. Verify MySQL is running: `mysql.server status`
2. Check credentials in `.env`
3. Test connection: `mysql -u root -p`

### Permission Issues
```sql
GRANT ALL PRIVILEGES ON Lucky_4.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

### Reset Database
```bash
mysql -u root -p < Backend/migrations/001_rollback.sql
mysql -u root -p < Backend/migrations/001_initial_setup.sql
mysql -u root -p Lucky_4 < Backend/seeds/seed.sql
```

## Schema Compliance

✅ MySQL database with proper schema
✅ Supports game state (active/completed)
✅ Stores player and lucky numbers as JSON
✅ Tracks matches and scores
✅ Pagination-ready with indexes
✅ Leaderboard view for efficient queries
✅ Sample data for testing

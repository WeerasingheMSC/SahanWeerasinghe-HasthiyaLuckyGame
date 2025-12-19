# Backend API - Hasthiya Lucky 4

## Structure

```
Backend/
├── controllers/        # Request handlers
├── models/            # Database queries
├── routes/            # API endpoints
├── middleware/        # Custom middleware
├── utils/             # Helper functions
├── db.js              # Database connection
├── server.js          # Main server file
└── schema.sql         # Database schema
```

## API Endpoints

### Game Routes
- `POST /api/games` - Create a new game session
- `GET /api/games` - Get all games (with pagination)
- `GET /api/games/:id` - Get a specific game
- `POST /api/games/:id/play` - Play a game round
- `DELETE /api/games/:id` - Delete a game

### Leaderboard Routes
- `GET /api/leaderboard` - Get leaderboard (with pagination)
- `GET /api/players/:playerId/stats` - Get player statistics

### Utility Routes
- `GET /api/test-db` - Test database connection
- `GET /health` - Health check

## Setup Database

Run the schema.sql file in MySQL:
```bash
mysql -u root -p Lucky_4 < schema.sql
```

## Testing Endpoints

### Create a game:
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"playerName": "John"}'
```

### Play a game:
```bash
curl -X POST http://localhost:3000/api/games/1/play \
  -H "Content-Type: application/json" \
  -d '{"playerNumbers": [1,2,3,4]}'
```

### Get leaderboard:
```bash
curl http://localhost:3000/api/leaderboard?page=1&limit=10
```

## Game Logic

- Players choose 4 numbers (0-9)
- System generates 4 random lucky numbers
- Matches are counted based on position
- Scoring:
  - 0 matches: 0 points
  - 1 match: 10 points
  - 2 matches: 50 points
  - 3 matches: 200 points
  - 4 matches: 1000 points (Jackpot!)

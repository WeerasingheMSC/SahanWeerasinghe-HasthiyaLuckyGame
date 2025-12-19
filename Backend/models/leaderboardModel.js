import db from '../db.js';

// Get leaderboard (individual game results sorted by score)
export const getLeaderboard = async (limit, offset) => {
  const countQuery = `
    SELECT COUNT(*) as total 
    FROM games 
    WHERE status = 'completed'
  `;
  const [countResult] = await db.query(countQuery);
  const total = countResult[0].total;

  const query = `
    SELECT 
      id,
      player_name,
      player_email,
      score,
      played_at
    FROM games
    WHERE status = 'completed'
    ORDER BY score DESC, played_at DESC
    LIMIT ? OFFSET ?
  `;
  const [leaderboard] = await db.query(query, [limit, offset]);

  return { leaderboard, total };
};

// Get player statistics
export const getPlayerStats = async (playerName) => {
  const query = `
    SELECT 
      player_name,
      COUNT(*) as total_games,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_games,
      SUM(score) as total_score,
      MAX(score) as highest_score,
      AVG(score) as avg_score,
      AVG(matches) as avg_matches,
      SUM(CASE WHEN matches = 4 THEN 1 ELSE 0 END) as jackpots,
      MAX(played_at) as last_played,
      MIN(created_at) as first_game
    FROM games
    WHERE player_name = ?
    GROUP BY player_name
  `;
  const [stats] = await db.query(query, [playerName]);
  return stats[0] || null;
};

import db from '../db.js';

// Get leaderboard (top players by total score)
export const getLeaderboard = async (limit, offset) => {
  const countQuery = `
    SELECT COUNT(DISTINCT player_name) as total 
    FROM games 
    WHERE status = 'completed'
  `;
  const [countResult] = await db.query(countQuery);
  const total = countResult[0].total;

  const query = `
    SELECT 
      player_name,
      COUNT(*) as games_played,
      SUM(score) as total_score,
      MAX(score) as highest_score,
      AVG(matches) as avg_matches,
      MAX(played_at) as last_played
    FROM games
    WHERE status = 'completed'
    GROUP BY player_name
    ORDER BY total_score DESC, games_played DESC
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

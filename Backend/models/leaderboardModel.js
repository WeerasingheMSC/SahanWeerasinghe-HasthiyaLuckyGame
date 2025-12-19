import db from '../db.js';

// Get leaderboard (individual game results sorted by score)
export const getLeaderboard = async (limit, offset) => {
  const countQuery = `
    SELECT COUNT(*) as total 
    FROM game_results 
    WHERE is_played = TRUE
  `;
  const [countResult] = await db.query(countQuery);
  const total = countResult[0].total;

  const query = `
    SELECT 
      id,
      email,
      score,
      created_at
    FROM game_results
    WHERE is_played = TRUE
    ORDER BY score DESC, created_at DESC
    LIMIT ? OFFSET ?
  `;
  const [leaderboard] = await db.query(query, [limit, offset]);

  return { leaderboard, total };
};


import db from '../db.js';

// Create a new game
export const createGame = async (playerEmail) => {
  // Check if email already exists with is_played = true
  const checkQuery = `
    SELECT id, is_played FROM game_results 
    WHERE email = ? AND is_played = TRUE
    LIMIT 1
  `;
  const [existing] = await db.query(checkQuery, [playerEmail]);
  
  if (existing.length > 0) {
    throw new Error('Game already played with this email');
  }
  
  const query = `
    INSERT INTO game_results (email, is_played, created_at)
    VALUES (?, FALSE, NOW())
  `;
  const [result] = await db.query(query, [playerEmail]);
  return {
    id: result.insertId,
    email: playerEmail
  };
};

// Get all games with pagination
export const getAllGames = async (limit, offset) => {
  const countQuery = 'SELECT COUNT(*) as total FROM game_results';
  const [countResult] = await db.query(countQuery);
  const total = countResult[0].total;

  const query = `
    SELECT 
      id,
      email,
      generated_numbers,
      score,
      is_played,
      created_at
    FROM game_results
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const [games] = await db.query(query, [limit, offset]);

  return { games, total };
};

// Get a game by ID
export const getGameById = async (gameId) => {
  const query = `
    SELECT 
      id,
      email,
      generated_numbers,
      score,
      is_played,
      created_at
    FROM game_results
    WHERE id = ?
  `;
  const [games] = await db.query(query, [gameId]);
  return games[0] || null;
};

// Play a game (update with results)
export const playGame = async (gameId, generatedNumbers, score) => {
  const query = `
    UPDATE game_results
    SET 
      generated_numbers = ?,
      score = ?,
      is_played = TRUE
    WHERE id = ?
  `;
  const generatedNumbersStr = JSON.stringify(generatedNumbers);
  
  const [result] = await db.query(query, [
    generatedNumbersStr,
    score,
    gameId
  ]);
  
  return result.affectedRows > 0;
};

// Delete a game
export const deleteGame = async (gameId) => {
  const query = 'DELETE FROM games WHERE id = ?';
  const [result] = await db.query(query, [gameId]);
  return result.affectedRows > 0;
};

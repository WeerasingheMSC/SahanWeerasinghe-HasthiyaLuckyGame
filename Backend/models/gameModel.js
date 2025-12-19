import db from '../db.js';

// Create a new game
export const createGame = async (playerName, playerEmail) => {
  // Check if email already exists with completed status
  const checkQuery = `
    SELECT id, status FROM games 
    WHERE player_email = ? AND status = 'completed'
    LIMIT 1
  `;
  const [existing] = await db.query(checkQuery, [playerEmail]);
  
  if (existing.length > 0) {
    throw new Error('Game already played with this email');
  }
  
  const query = `
    INSERT INTO games (player_name, player_email, status, created_at)
    VALUES (?, ?, 'active', NOW())
  `;
  const [result] = await db.query(query, [playerName, playerEmail]);
  return result.insertId;
};

// Get all games with pagination
export const getAllGames = async (limit, offset) => {
  const countQuery = 'SELECT COUNT(*) as total FROM games';
  const [countResult] = await db.query(countQuery);
  const total = countResult[0].total;

  const query = `
    SELECT 
      id,
      player_name,
      player_email,
      player_numbers,
      lucky_numbers,
      matches,
      score,
      status,
      created_at,
      played_at
    FROM games
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
      player_name,
      player_email,
      player_numbers,
      lucky_numbers,
      matches,
      score,
      status,
      created_at,
      played_at
    FROM games
    WHERE id = ?
  `;
  const [games] = await db.query(query, [gameId]);
  return games[0] || null;
};

// Play a game (update with results)
export const playGame = async (gameId, playerNumbers, luckyNumbers, matches, score) => {
  const query = `
    UPDATE games
    SET 
      player_numbers = ?,
      lucky_numbers = ?,
      matches = ?,
      score = ?,
      status = 'completed',
      played_at = NOW()
    WHERE id = ?
  `;
  const playerNumbersStr = JSON.stringify(playerNumbers);
  const luckyNumbersStr = JSON.stringify(luckyNumbers);
  
  const [result] = await db.query(query, [
    playerNumbersStr,
    luckyNumbersStr,
    matches,
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

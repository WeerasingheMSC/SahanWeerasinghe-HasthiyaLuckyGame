import express from 'express';
import {
  createGame,
  getGameById,
  getAllGames,
  playGame,
  deleteGame
} from '../controllers/gameController.js';

const router = express.Router();

// Create a new game session
router.post('/games', createGame);

// Get all games with pagination
router.get('/games', getAllGames);

// Get a specific game by ID
router.get('/games/:id', getGameById);

// Play a game round
router.post('/games/:id/play', playGame);

// Delete a game
router.delete('/games/:id', deleteGame);

export default router;

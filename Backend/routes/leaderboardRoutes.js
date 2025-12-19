import express from 'express';
import {
  getLeaderboard,
  getPlayerStats
} from '../controllers/leaderboardController.js';

const router = express.Router();

// Get leaderboard with pagination
router.get('/leaderboard', getLeaderboard);

// Get player statistics
router.get('/players/:playerId/stats', getPlayerStats);

export default router;

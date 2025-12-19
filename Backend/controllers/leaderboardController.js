import * as LeaderboardModel from '../models/leaderboardModel.js';

// Get leaderboard with pagination
export const getLeaderboard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await LeaderboardModel.getLeaderboard(limit, offset);

    res.json({
      success: true,
      data: result.leaderboard,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard',
      error: error.message
    });
  }
};

// Get player statistics
export const getPlayerStats = async (req, res) => {
  try {
    const { playerId } = req.params;

    const stats = await LeaderboardModel.getPlayerStats(playerId);

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch player stats',
      error: error.message
    });
  }
};

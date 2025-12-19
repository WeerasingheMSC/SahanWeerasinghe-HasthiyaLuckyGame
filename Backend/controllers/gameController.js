import * as GameModel from '../models/gameModel.js';
import { generateLuckyNumbers } from '../utils/gameLogic.js';

// Create a new game session
export const createGame = async (req, res) => {
  try {
    const { playerName } = req.body;

    if (!playerName || playerName.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Player name is required'
      });
    }

    const gameId = await GameModel.createGame(playerName);

    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      data: {
        gameId,
        playerName,
        status: 'created'
      }
    });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create game',
      error: error.message
    });
  }
};

// Get all games with pagination
export const getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await GameModel.getAllGames(limit, offset);

    res.json({
      success: true,
      data: result.games,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games',
      error: error.message
    });
  }
};

// Get a specific game by ID
export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await GameModel.getGameById(id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    res.json({
      success: true,
      data: game
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch game',
      error: error.message
    });
  }
};

// Play a game round
export const playGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerNumbers } = req.body;

    // Validate player numbers
    if (!playerNumbers || !Array.isArray(playerNumbers) || playerNumbers.length !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Please provide exactly 4 numbers'
      });
    }

    // Validate each number is between 0-9
    const isValid = playerNumbers.every(num => 
      Number.isInteger(num) && num >= 0 && num <= 9
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'All numbers must be integers between 0 and 9'
      });
    }

    // Check if game exists
    const game = await GameModel.getGameById(id);
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    // Generate lucky numbers
    const luckyNumbers = generateLuckyNumbers();

    // Calculate matches
    const matches = playerNumbers.filter((num, index) => 
      num === luckyNumbers[index]
    ).length;

    // Calculate score based on matches
    const scoreMap = { 0: 0, 1: 10, 2: 50, 3: 200, 4: 1000 };
    const score = scoreMap[matches];

    // Save game result
    const result = await GameModel.playGame(id, playerNumbers, luckyNumbers, matches, score);

    res.json({
      success: true,
      message: 'Game played successfully',
      data: {
        playerNumbers,
        luckyNumbers,
        matches,
        score,
        result: matches === 4 ? 'Jackpot!' : matches >= 2 ? 'Winner!' : 'Try Again'
      }
    });
  } catch (error) {
    console.error('Error playing game:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to play game',
      error: error.message
    });
  }
};

// Delete a game
export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await GameModel.deleteGame(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }

    res.json({
      success: true,
      message: 'Game deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete game',
      error: error.message
    });
  }
};

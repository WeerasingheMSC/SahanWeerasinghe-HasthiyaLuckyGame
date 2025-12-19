import * as GameModel from '../models/gameModel.js';
import { getHiddenNumbers } from '../config/gameConfig.js';
import { calculateScore } from '../logic/gameEngine.js';

// Create a new game session
export const createGame = async (req, res) => {
  try {
    const { playerEmail } = req.body;

    if (!playerEmail || playerEmail.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Email address is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(playerEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    const game = await GameModel.createGame(playerEmail);

    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      data: {
        id: game.id,
        email: game.email
      }
    });
  } catch (error) {
    console.error('Error creating game:', error);
    
    // Check if it's a duplicate email error
    if (error.message === 'Game already played with this email') {
      return res.status(400).json({
        success: false,
        error: 'Game already played with this email'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create game',
      message: error.message
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
    const { generatedNumbers } = req.body;

    // Validate generated numbers
    if (!generatedNumbers || !Array.isArray(generatedNumbers) || generatedNumbers.length !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Please provide exactly 4 numbers'
      });
    }

    // Validate each number is between 1-10
    const isValid = generatedNumbers.every(num => 
      Number.isInteger(num) && num >= 1 && num <= 10
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'All numbers must be integers between 1 and 10'
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

    // Get hidden numbers from config
    const hiddenNumbers = getHiddenNumbers();

    // Calculate score using the formula
    const score = calculateScore(generatedNumbers, hiddenNumbers);

    // Save game result
    const result = await GameModel.playGame(id, generatedNumbers, score);

    res.json({
      success: true,
      message: 'Game played successfully',
      data: {
        generatedNumbers,
        score
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

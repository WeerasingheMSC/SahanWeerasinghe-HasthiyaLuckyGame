import { GAME_STATUS } from '../config/gameConfig.js';
import { generateLuckyNumbers } from './numberGenerator.js';
import { calculateGameResult } from './gameEngine.js';
import { validatePlayerNumbers, validateGamePlayability } from './gameValidator.js';

/**
 * Game State Manager - Manages game lifecycle and state transitions
 */

class GameState {
  constructor(gameData) {
    this.id = gameData.id;
    this.playerName = gameData.player_name || gameData.playerName;
    this.playerNumbers = gameData.player_numbers || gameData.playerNumbers || null;
    this.luckyNumbers = gameData.lucky_numbers || gameData.luckyNumbers || null;
    this.matches = gameData.matches || 0;
    this.score = gameData.score || 0;
    this.status = gameData.status || GAME_STATUS.ACTIVE;
    this.createdAt = gameData.created_at || gameData.createdAt || new Date();
    this.playedAt = gameData.played_at || gameData.playedAt || null;
  }

  /**
   * Check if game is active
   */
  isActive() {
    return this.status === GAME_STATUS.ACTIVE;
  }

  /**
   * Check if game is completed
   */
  isCompleted() {
    return this.status === GAME_STATUS.COMPLETED;
  }

  /**
   * Check if game can be played
   */
  canPlay() {
    return this.isActive();
  }

  /**
   * Convert to plain object
   */
  toObject() {
    return {
      id: this.id,
      playerName: this.playerName,
      playerNumbers: this.playerNumbers,
      luckyNumbers: this.luckyNumbers,
      matches: this.matches,
      score: this.score,
      status: this.status,
      createdAt: this.createdAt,
      playedAt: this.playedAt
    };
  }
}

/**
 * Create a new game state
 * @param {string} playerName - Player's name
 * @returns {object} Initial game state
 */
export const createGameState = (playerName) => {
  return {
    playerName,
    playerNumbers: null,
    luckyNumbers: null,
    matches: 0,
    score: 0,
    status: GAME_STATUS.ACTIVE,
    createdAt: new Date(),
    playedAt: null
  };
};

/**
 * Play a game and update state
 * @param {object} currentState - Current game state
 * @param {number[]} playerNumbers - Player's selected numbers
 * @returns {object} Updated game state with result
 */
export const playGame = (currentState, playerNumbers) => {
  // Validate game can be played
  const playabilityValidation = validateGamePlayability(currentState);
  if (!playabilityValidation.isValid) {
    throw new Error(playabilityValidation.error);
  }

  // Validate player numbers
  const numbersValidation = validatePlayerNumbers(playerNumbers);
  if (!numbersValidation.isValid) {
    throw new Error(numbersValidation.error);
  }

  // Generate lucky numbers
  const luckyNumbers = generateLuckyNumbers();

  // Calculate result
  const result = calculateGameResult(playerNumbers, luckyNumbers);

  // Update state
  return {
    ...currentState,
    playerNumbers,
    luckyNumbers,
    matches: result.matches,
    score: result.score,
    status: GAME_STATUS.COMPLETED,
    playedAt: new Date(),
    result
  };
};

/**
 * Complete a game (mark as completed)
 * @param {object} currentState - Current game state
 * @returns {object} Updated game state
 */
export const completeGame = (currentState) => {
  return {
    ...currentState,
    status: GAME_STATUS.COMPLETED,
    playedAt: currentState.playedAt || new Date()
  };
};

/**
 * Cancel a game
 * @param {object} currentState - Current game state
 * @returns {object} Updated game state
 */
export const cancelGame = (currentState) => {
  return {
    ...currentState,
    status: GAME_STATUS.CANCELLED
  };
};

/**
 * Get game state summary
 * @param {object} gameState - Game state
 * @returns {object} Game summary
 */
export const getGameSummary = (gameState) => {
  return {
    id: gameState.id,
    playerName: gameState.playerName,
    status: gameState.status,
    score: gameState.score,
    matches: gameState.matches,
    isCompleted: gameState.status === GAME_STATUS.COMPLETED,
    hasPlayed: gameState.playerNumbers !== null
  };
};

/**
 * Transition game state based on action
 * @param {object} currentState - Current state
 * @param {string} action - Action to perform
 * @param {object} payload - Action payload
 * @returns {object} New state
 */
export const transitionState = (currentState, action, payload = {}) => {
  switch (action) {
    case 'PLAY':
      return playGame(currentState, payload.playerNumbers);
    
    case 'COMPLETE':
      return completeGame(currentState);
    
    case 'CANCEL':
      return cancelGame(currentState);
    
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

/**
 * Validate state transition
 * @param {object} currentState - Current state
 * @param {string} action - Proposed action
 * @returns {object} Validation result
 */
export const validateStateTransition = (currentState, action) => {
  const validTransitions = {
    [GAME_STATUS.ACTIVE]: ['PLAY', 'CANCEL'],
    [GAME_STATUS.COMPLETED]: [],
    [GAME_STATUS.CANCELLED]: []
  };

  const allowedActions = validTransitions[currentState.status] || [];

  if (!allowedActions.includes(action)) {
    return {
      isValid: false,
      error: `Cannot perform ${action} on game with status ${currentState.status}`
    };
  }

  return { isValid: true, error: null };
};

/**
 * Create game state manager instance
 * @param {object} gameData - Initial game data
 * @returns {GameState} Game state instance
 */
export const createGameStateManager = (gameData) => {
  return new GameState(gameData);
};

export { GameState };

export default {
  GameState,
  createGameState,
  playGame,
  completeGame,
  cancelGame,
  getGameSummary,
  transitionState,
  validateStateTransition,
  createGameStateManager
};

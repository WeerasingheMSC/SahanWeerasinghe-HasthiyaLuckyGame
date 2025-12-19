import { 
  NUMBER_CONFIG, 
  VALIDATION_MESSAGES, 
  GAME_STATUS,
  ERROR_CODES 
} from '../config/gameConfig.js';

/**
 * Game Validator - Validation rules for Lucky 4 game
 */

/**
 * Validate player name
 * @param {string} playerName - Player's name
 * @returns {object} Validation result { isValid, error }
 */
export const validatePlayerName = (playerName) => {
  if (!playerName || typeof playerName !== 'string') {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_PLAYER_NAME,
      code: ERROR_CODES.VALIDATION_ERROR
    };
  }
  
  const trimmedName = playerName.trim();
  
  if (trimmedName.length === 0) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_PLAYER_NAME,
      code: ERROR_CODES.VALIDATION_ERROR
    };
  }
  
  if (trimmedName.length > 50) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.PLAYER_NAME_TOO_LONG,
      code: ERROR_CODES.VALIDATION_ERROR
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate player numbers
 * @param {number[]} numbers - Array of player's selected numbers
 * @returns {object} Validation result { isValid, error }
 */
export const validatePlayerNumbers = (numbers) => {
  // Check if array
  if (!Array.isArray(numbers)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_NUMBER_TYPE,
      code: ERROR_CODES.VALIDATION_ERROR
    };
  }
  
  // Check count
  if (numbers.length !== NUMBER_CONFIG.NUMBERS_PER_GAME) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_NUMBER_COUNT,
      code: ERROR_CODES.VALIDATION_ERROR
    };
  }
  
  // Check each number
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    
    // Check if integer
    if (!Number.isInteger(num)) {
      return {
        isValid: false,
        error: VALIDATION_MESSAGES.INVALID_NUMBER_TYPE,
        code: ERROR_CODES.VALIDATION_ERROR
      };
    }
    
    // Check range
    if (num < NUMBER_CONFIG.MIN_VALUE || num > NUMBER_CONFIG.MAX_VALUE) {
      return {
        isValid: false,
        error: VALIDATION_MESSAGES.INVALID_NUMBER_RANGE,
        code: ERROR_CODES.VALIDATION_ERROR
      };
    }
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate game status
 * @param {string} status - Game status
 * @returns {object} Validation result { isValid, error }
 */
export const validateGameStatus = (status) => {
  const validStatuses = Object.values(GAME_STATUS);
  
  if (!validStatuses.includes(status)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_GAME_STATUS,
      code: ERROR_CODES.VALIDATION_ERROR
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate if game can be played
 * @param {object} game - Game object
 * @returns {object} Validation result { isValid, error }
 */
export const validateGamePlayability = (game) => {
  if (!game) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.GAME_NOT_FOUND,
      code: ERROR_CODES.GAME_NOT_FOUND
    };
  }
  
  if (game.status === GAME_STATUS.COMPLETED) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.GAME_ALREADY_PLAYED,
      code: ERROR_CODES.GAME_ALREADY_PLAYED
    };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate pagination parameters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {object} Validation result { isValid, error, sanitized }
 */
export const validatePagination = (page, limit) => {
  const sanitizedPage = Math.max(1, parseInt(page) || 1);
  const sanitizedLimit = Math.max(1, Math.min(100, parseInt(limit) || 10));
  
  return {
    isValid: true,
    error: null,
    sanitized: {
      page: sanitizedPage,
      limit: sanitizedLimit,
      offset: (sanitizedPage - 1) * sanitizedLimit
    }
  };
};

/**
 * Validate complete game creation request
 * @param {object} data - Request data { playerName }
 * @returns {object} Validation result
 */
export const validateGameCreation = (data) => {
  const { playerName } = data;
  
  const nameValidation = validatePlayerName(playerName);
  if (!nameValidation.isValid) {
    return nameValidation;
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate complete game play request
 * @param {object} data - Request data { playerNumbers }
 * @param {object} game - Existing game object
 * @returns {object} Validation result
 */
export const validateGamePlay = (data, game) => {
  const { playerNumbers } = data;
  
  // Validate game exists and is playable
  const playabilityValidation = validateGamePlayability(game);
  if (!playabilityValidation.isValid) {
    return playabilityValidation;
  }
  
  // Validate player numbers
  const numbersValidation = validatePlayerNumbers(playerNumbers);
  if (!numbersValidation.isValid) {
    return numbersValidation;
  }
  
  return { isValid: true, error: null };
};

/**
 * Sanitize player name (trim, remove special chars)
 * @param {string} playerName - Raw player name
 * @returns {string} Sanitized player name
 */
export const sanitizePlayerName = (playerName) => {
  if (typeof playerName !== 'string') {
    return '';
  }
  
  return playerName.trim().substring(0, 50);
};

/**
 * Sanitize and validate numbers array
 * @param {any} numbers - Raw numbers input
 * @returns {number[]|null} Sanitized numbers or null if invalid
 */
export const sanitizeNumbers = (numbers) => {
  if (!Array.isArray(numbers)) {
    return null;
  }
  
  const sanitized = numbers
    .map(n => parseInt(n))
    .filter(n => !isNaN(n))
    .slice(0, NUMBER_CONFIG.NUMBERS_PER_GAME);
  
  if (sanitized.length !== NUMBER_CONFIG.NUMBERS_PER_GAME) {
    return null;
  }
  
  return sanitized;
};

/**
 * Create validation error response
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @returns {object} Error response object
 */
export const createValidationError = (message, code = ERROR_CODES.VALIDATION_ERROR) => {
  return {
    success: false,
    error: message,
    code
  };
};

export default {
  validatePlayerName,
  validatePlayerNumbers,
  validateGameStatus,
  validateGamePlayability,
  validatePagination,
  validateGameCreation,
  validateGamePlay,
  sanitizePlayerName,
  sanitizeNumbers,
  createValidationError
};

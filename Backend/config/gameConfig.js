// Game Configuration and Constants for Lucky 4 Game

// Game name and version
export const GAME_INFO = {
  name: 'Hasthiya Lucky 4',
  version: '1.0.0',
  description: 'A number matching game where players match 4 numbers to win prizes'
};

// Number constraints
export const NUMBER_CONFIG = {
  MIN_VALUE: 1,
  MAX_VALUE: 10,
  NUMBERS_PER_GAME: 4,
  TOTAL_POSSIBLE_NUMBERS: 10 // 1-10
};

// Hidden Numbers - Fixed numbers for the game (loaded from .env)
export const getHiddenNumbers = () => {
  const hiddenStr = process.env.HIDDEN_NUMBERS || '2,5,8,3';
  const numbers = hiddenStr.split(',').map(n => parseInt(n.trim()));
  
  // Validate hidden numbers
  if (numbers.length !== NUMBER_CONFIG.NUMBERS_PER_GAME) {
    throw new Error(`HIDDEN_NUMBERS must contain exactly ${NUMBER_CONFIG.NUMBERS_PER_GAME} numbers`);
  }
  
  const isValid = numbers.every(n => 
    Number.isInteger(n) && n >= NUMBER_CONFIG.MIN_VALUE && n <= NUMBER_CONFIG.MAX_VALUE
  );
  
  if (!isValid) {
    throw new Error(`All HIDDEN_NUMBERS must be integers between ${NUMBER_CONFIG.MIN_VALUE} and ${NUMBER_CONFIG.MAX_VALUE}`);
  }
  
  return numbers;
};

// Score mapping based on number of matches (Legacy - kept for prize tiers)
// Note: Actual scoring now uses formula: Score = 100 - (Σ|Hidden_i - Generated_i|) × 2
export const SCORE_MAP = {
  0: 0,      // No matches - No prize
  1: 10,     // 1 match - Small prize
  2: 50,     // 2 matches - Medium prize
  3: 200,    // 3 matches - Large prize
  4: 1000    // 4 matches - Jackpot!
};

// Prize tier names
export const PRIZE_TIERS = {
  0: 'No Prize',
  1: 'Small Prize',
  2: 'Medium Prize',
  3: 'Large Prize',
  4: 'Jackpot!'
};

// Game status
export const GAME_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Validation messages
export const VALIDATION_MESSAGES = {
  INVALID_NUMBER_COUNT: `Must provide exactly ${NUMBER_CONFIG.NUMBERS_PER_GAME} numbers`,
  INVALID_NUMBER_RANGE: `All numbers must be between ${NUMBER_CONFIG.MIN_VALUE} and ${NUMBER_CONFIG.MAX_VALUE}`,
  INVALID_NUMBER_TYPE: 'All numbers must be integers',
  INVALID_PLAYER_NAME: 'Player name is required and must be a non-empty string',
  PLAYER_NAME_TOO_LONG: 'Player name must be 50 characters or less',
  GAME_NOT_FOUND: 'Game session not found',
  GAME_ALREADY_PLAYED: 'This game has already been played',
  INVALID_GAME_STATUS: 'Invalid game status'
};

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  GAME_NOT_FOUND: 'GAME_NOT_FOUND',
  GAME_ALREADY_PLAYED: 'GAME_ALREADY_PLAYED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR'
};

// Probability information (for display purposes)
export const PROBABILITY_INFO = {
  JACKPOT: 1 / 10000,           // 0.01% - All 4 numbers match
  THREE_MATCHES: 36 / 10000,    // 0.36% - 3 numbers match
  TWO_MATCHES: 486 / 10000,     // 4.86% - 2 numbers match
  ONE_MATCH: 2916 / 10000,      // 29.16% - 1 number matches
  NO_MATCH: 6561 / 10000        // 65.61% - No matches
};

// Game rules text
export const GAME_RULES = {
  title: 'How to Play Lucky 4',
  rules: [
    `Select ${NUMBER_CONFIG.NUMBERS_PER_GAME} numbers between ${NUMBER_CONFIG.MIN_VALUE} and ${NUMBER_CONFIG.MAX_VALUE}`,
    'The system will generate 4 random lucky numbers',
    'Numbers must match in the exact same position to count',
    'The more positions that match, the higher your score',
    'Matching all 4 numbers wins the JACKPOT!'
  ],
  scoring: [
    `${PRIZE_TIERS[0]}: ${SCORE_MAP[0]} points`,
    `${PRIZE_TIERS[1]}: ${SCORE_MAP[1]} points`,
    `${PRIZE_TIERS[2]}: ${SCORE_MAP[2]} points`,
    `${PRIZE_TIERS[3]}: ${SCORE_MAP[3]} points`,
    `${PRIZE_TIERS[4]}: ${SCORE_MAP[4]} points`
  ]
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1
};

// Leaderboard configuration
export const LEADERBOARD_CONFIG = {
  DEFAULT_TOP_PLAYERS: 10,
  MAX_TOP_PLAYERS: 50
};

// Export all constants as a single object for convenience
export default {
  GAME_INFO,
  NUMBER_CONFIG,
  SCORE_MAP,
  PRIZE_TIERS,
  GAME_STATUS,
  VALIDATION_MESSAGES,
  ERROR_CODES,
  PROBABILITY_INFO,
  GAME_RULES,
  PAGINATION,
  LEADERBOARD_CONFIG
};

import { SCORE_MAP, PRIZE_TIERS, NUMBER_CONFIG } from '../config/gameConfig.js';

/**
 * Game Engine - Core matching and scoring logic for Lucky 4
 */

/**
 * Count how many numbers match in the correct positions
 * @param {number[]} playerNumbers - Player's selected numbers
 * @param {number[]} luckyNumbers - System-generated lucky numbers
 * @returns {number} Number of matches (0-4)
 */
export const countMatches = (playerNumbers, luckyNumbers) => {
  if (!Array.isArray(playerNumbers) || !Array.isArray(luckyNumbers)) {
    throw new Error('Both playerNumbers and luckyNumbers must be arrays');
  }
  
  if (playerNumbers.length !== luckyNumbers.length) {
    throw new Error('Player numbers and lucky numbers must have the same length');
  }
  
  return playerNumbers.filter((num, index) => num === luckyNumbers[index]).length;
};

/**
 * Calculate score based on number of matches
 * @param {number} matches - Number of matching positions
 * @returns {number} Score points
 */
export const calculateScore = (matches) => {
  if (!Number.isInteger(matches) || matches < 0 || matches > NUMBER_CONFIG.NUMBERS_PER_GAME) {
    throw new Error(`Matches must be an integer between 0 and ${NUMBER_CONFIG.NUMBERS_PER_GAME}`);
  }
  
  return SCORE_MAP[matches] || 0;
};

/**
 * Get prize tier name based on matches
 * @param {number} matches - Number of matching positions
 * @returns {string} Prize tier name
 */
export const getPrizeTier = (matches) => {
  return PRIZE_TIERS[matches] || PRIZE_TIERS[0];
};

/**
 * Determine if player won jackpot
 * @param {number} matches - Number of matching positions
 * @returns {boolean} True if jackpot (all 4 matches)
 */
export const isJackpot = (matches) => {
  return matches === NUMBER_CONFIG.NUMBERS_PER_GAME;
};

/**
 * Determine if player won any prize
 * @param {number} matches - Number of matching positions
 * @returns {boolean} True if at least 1 match
 */
export const isWinner = (matches) => {
  return matches > 0;
};

/**
 * Get detailed match information for each position
 * @param {number[]} playerNumbers - Player's selected numbers
 * @param {number[]} luckyNumbers - System-generated lucky numbers
 * @returns {object[]} Array of match details per position
 */
export const getMatchDetails = (playerNumbers, luckyNumbers) => {
  return playerNumbers.map((playerNum, index) => ({
    position: index,
    playerNumber: playerNum,
    luckyNumber: luckyNumbers[index],
    isMatch: playerNum === luckyNumbers[index]
  }));
};

/**
 * Calculate comprehensive game result
 * @param {number[]} playerNumbers - Player's selected numbers
 * @param {number[]} luckyNumbers - System-generated lucky numbers
 * @returns {object} Complete game result object
 */
export const calculateGameResult = (playerNumbers, luckyNumbers) => {
  const matches = countMatches(playerNumbers, luckyNumbers);
  const score = calculateScore(matches);
  const prizeTier = getPrizeTier(matches);
  const jackpot = isJackpot(matches);
  const winner = isWinner(matches);
  const matchDetails = getMatchDetails(playerNumbers, luckyNumbers);
  
  return {
    playerNumbers,
    luckyNumbers,
    matches,
    score,
    prizeTier,
    isJackpot: jackpot,
    isWinner: winner,
    matchDetails,
    message: getResultMessage(matches)
  };
};

/**
 * Get result message based on matches
 * @param {number} matches - Number of matching positions
 * @returns {string} Result message
 */
export const getResultMessage = (matches) => {
  const messages = {
    0: 'Better luck next time!',
    1: 'You got one! Keep trying!',
    2: 'Two matches! You\'re getting closer!',
    3: 'Amazing! Three matches!',
    4: '🎉 JACKPOT! All four numbers matched! 🎉'
  };
  
  return messages[matches] || messages[0];
};

/**
 * Get win probability information
 * @returns {object} Probability information for each outcome
 */
export const getWinProbabilities = () => {
  const total = Math.pow(NUMBER_CONFIG.TOTAL_POSSIBLE_NUMBERS, NUMBER_CONFIG.NUMBERS_PER_GAME);
  
  return {
    jackpot: {
      probability: 1 / total,
      percentage: ((1 / total) * 100).toFixed(2) + '%',
      odds: `1 in ${total}`
    },
    threeMatches: {
      probability: 36 / total,
      percentage: ((36 / total) * 100).toFixed(2) + '%',
      odds: `36 in ${total}`
    },
    twoMatches: {
      probability: 486 / total,
      percentage: ((486 / total) * 100).toFixed(2) + '%',
      odds: `486 in ${total}`
    },
    oneMatch: {
      probability: 2916 / total,
      percentage: ((2916 / total) * 100).toFixed(2) + '%',
      odds: `2916 in ${total}`
    },
    noMatch: {
      probability: 6561 / total,
      percentage: ((6561 / total) * 100).toFixed(2) + '%',
      odds: `6561 in ${total}`
    }
  };
};

/**
 * Analyze player performance over multiple games
 * @param {object[]} games - Array of game results
 * @returns {object} Performance statistics
 */
export const analyzePerformance = (games) => {
  if (!Array.isArray(games) || games.length === 0) {
    return {
      totalGames: 0,
      totalScore: 0,
      averageScore: 0,
      averageMatches: 0,
      jackpots: 0,
      wins: 0,
      losses: 0
    };
  }
  
  const stats = games.reduce((acc, game) => {
    acc.totalScore += game.score || 0;
    acc.totalMatches += game.matches || 0;
    if (game.matches === 4) acc.jackpots++;
    if (game.matches > 0) acc.wins++;
    else acc.losses++;
    return acc;
  }, { totalScore: 0, totalMatches: 0, jackpots: 0, wins: 0, losses: 0 });
  
  return {
    totalGames: games.length,
    totalScore: stats.totalScore,
    averageScore: (stats.totalScore / games.length).toFixed(2),
    averageMatches: (stats.totalMatches / games.length).toFixed(2),
    jackpots: stats.jackpots,
    wins: stats.wins,
    losses: stats.losses,
    winRate: ((stats.wins / games.length) * 100).toFixed(2) + '%'
  };
};

export default {
  countMatches,
  calculateScore,
  getPrizeTier,
  isJackpot,
  isWinner,
  getMatchDetails,
  calculateGameResult,
  getResultMessage,
  getWinProbabilities,
  analyzePerformance
};

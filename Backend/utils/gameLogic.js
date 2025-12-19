/**
 * Game Logic Utilities
 * This module re-exports the main game logic functions for convenience
 * The actual implementation is in the /logic directory
 */

import { generateLuckyNumbers as genNumbers } from '../logic/numberGenerator.js';
import { calculateScore as calcScore, countMatches as count } from '../logic/gameEngine.js';

// Generate 4 random lucky numbers (0-9)
export const generateLuckyNumbers = () => {
  return genNumbers();
};

// Calculate score based on matches
export const calculateScore = (matches) => {
  return calcScore(matches);
};

// Count matching numbers in correct positions
export const countMatches = (playerNumbers, luckyNumbers) => {
  return count(playerNumbers, luckyNumbers);
};

import { NUMBER_CONFIG } from '../config/gameConfig.js';

/**
 * Number Generator for Lucky 4 Game
 * Provides various methods to generate random numbers for the game
 */

/**
 * Generate a single random number between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const getRandomNumber = (min = NUMBER_CONFIG.MIN_VALUE, max = NUMBER_CONFIG.MAX_VALUE) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate an array of random lucky numbers for the game
 * @param {number} count - Number of lucky numbers to generate (default: 4)
 * @returns {number[]} Array of random numbers
 */
export const generateLuckyNumbers = (count = NUMBER_CONFIG.NUMBERS_PER_GAME) => {
  return Array.from({ length: count }, () => 
    getRandomNumber(NUMBER_CONFIG.MIN_VALUE, NUMBER_CONFIG.MAX_VALUE)
  );
};

/**
 * Generate unique random numbers (no duplicates)
 * @param {number} count - Number of unique numbers to generate
 * @returns {number[]} Array of unique random numbers
 */
export const generateUniqueLuckyNumbers = (count = NUMBER_CONFIG.NUMBERS_PER_GAME) => {
  const maxPossible = NUMBER_CONFIG.MAX_VALUE - NUMBER_CONFIG.MIN_VALUE + 1;
  
  if (count > maxPossible) {
    throw new Error(`Cannot generate ${count} unique numbers from range ${NUMBER_CONFIG.MIN_VALUE}-${NUMBER_CONFIG.MAX_VALUE}`);
  }
  
  const numbers = new Set();
  
  while (numbers.size < count) {
    numbers.add(getRandomNumber(NUMBER_CONFIG.MIN_VALUE, NUMBER_CONFIG.MAX_VALUE));
  }
  
  return Array.from(numbers);
};

/**
 * Generate weighted random numbers based on probability distribution
 * (More realistic distribution that can be configured)
 * @param {number} count - Number of numbers to generate
 * @param {number[]} weights - Optional weight array for each number (0-9)
 * @returns {number[]} Array of weighted random numbers
 */
export const generateWeightedNumbers = (count = NUMBER_CONFIG.NUMBERS_PER_GAME, weights = null) => {
  // Default: equal weights for all numbers
  const defaultWeights = Array(NUMBER_CONFIG.TOTAL_POSSIBLE_NUMBERS).fill(1);
  const numberWeights = weights || defaultWeights;
  
  if (numberWeights.length !== NUMBER_CONFIG.TOTAL_POSSIBLE_NUMBERS) {
    throw new Error(`Weights array must have exactly ${NUMBER_CONFIG.TOTAL_POSSIBLE_NUMBERS} elements`);
  }
  
  const result = [];
  const totalWeight = numberWeights.reduce((sum, w) => sum + w, 0);
  
  for (let i = 0; i < count; i++) {
    const random = Math.random() * totalWeight;
    let cumulative = 0;
    
    for (let num = 0; num < numberWeights.length; num++) {
      cumulative += numberWeights[num];
      if (random <= cumulative) {
        result.push(num);
        break;
      }
    }
  }
  
  return result;
};

/**
 * Generate numbers with a seed for reproducibility (testing purposes)
 * @param {number} seed - Seed value for pseudo-random generation
 * @param {number} count - Number of numbers to generate
 * @returns {number[]} Array of seeded random numbers
 */
export const generateSeededNumbers = (seed, count = NUMBER_CONFIG.NUMBERS_PER_GAME) => {
  const seededRandom = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  
  return Array.from({ length: count }, () => 
    Math.floor(seededRandom() * (NUMBER_CONFIG.MAX_VALUE - NUMBER_CONFIG.MIN_VALUE + 1)) + NUMBER_CONFIG.MIN_VALUE
  );
};

/**
 * Validate if a number is within the valid range
 * @param {number} num - Number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidNumber = (num) => {
  return (
    Number.isInteger(num) && 
    num >= NUMBER_CONFIG.MIN_VALUE && 
    num <= NUMBER_CONFIG.MAX_VALUE
  );
};

/**
 * Validate if an array of numbers is valid for the game
 * @param {number[]} numbers - Array of numbers to validate
 * @returns {boolean} True if all numbers are valid
 */
export const isValidNumberArray = (numbers) => {
  return (
    Array.isArray(numbers) &&
    numbers.length === NUMBER_CONFIG.NUMBERS_PER_GAME &&
    numbers.every(isValidNumber)
  );
};

export default {
  getRandomNumber,
  generateLuckyNumbers,
  generateUniqueLuckyNumbers,
  generateWeightedNumbers,
  generateSeededNumbers,
  isValidNumber,
  isValidNumberArray
};

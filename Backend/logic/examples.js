/**
 * Game Logic Examples and Test Cases
 * Demonstrates how to use the Lucky 4 game logic modules
 */

import { generateLuckyNumbers, generateUniqueLuckyNumbers } from './numberGenerator.js';
import { calculateGameResult, analyzePerformance, getWinProbabilities } from './gameEngine.js';
import { validatePlayerNumbers, validatePlayerName } from './gameValidator.js';
import { createGameState, playGame } from './gameStateManager.js';

// ======================
// Example 1: Generate Lucky Numbers
// ======================
console.log('=== Example 1: Generate Lucky Numbers ===');
const luckyNumbers1 = generateLuckyNumbers();
console.log('Random lucky numbers:', luckyNumbers1);

const uniqueNumbers = generateUniqueLuckyNumbers();
console.log('Unique lucky numbers (no duplicates):', uniqueNumbers);

// ======================
// Example 2: Calculate Game Result
// ======================
console.log('\n=== Example 2: Calculate Game Result ===');
const playerNumbers = [5, 6, 7, 8];
const luckyNumbers = [5, 6, 9, 1];

const result = calculateGameResult(playerNumbers, luckyNumbers);
console.log('Player numbers:', result.playerNumbers);
console.log('Lucky numbers:', result.luckyNumbers);
console.log('Matches:', result.matches);
console.log('Score:', result.score);
console.log('Prize tier:', result.prizeTier);
console.log('Is winner:', result.isWinner);
console.log('Is jackpot:', result.isJackpot);
console.log('Message:', result.message);
console.log('Match details:', result.matchDetails);

// ======================
// Example 3: Validate Player Input
// ======================
console.log('\n=== Example 3: Validate Player Input ===');

// Valid input
const validNumbers = [1, 2, 3, 4];
const validation1 = validatePlayerNumbers(validNumbers);
console.log('Valid numbers [1,2,3,4]:', validation1);

// Invalid input - wrong count
const invalidNumbers1 = [1, 2, 3];
const validation2 = validatePlayerNumbers(invalidNumbers1);
console.log('Invalid numbers [1,2,3]:', validation2);

// Invalid input - out of range
const invalidNumbers2 = [1, 2, 3, 10];
const validation3 = validatePlayerNumbers(invalidNumbers2);
console.log('Invalid numbers [1,2,3,10]:', validation3);

// Validate player name
const nameValidation1 = validatePlayerName('John Doe');
console.log('Valid name "John Doe":', nameValidation1);

const nameValidation2 = validatePlayerName('');
console.log('Invalid name (empty):', nameValidation2);

// ======================
// Example 4: Game State Management
// ======================
console.log('\n=== Example 4: Game State Management ===');

// Create initial game state
const initialState = createGameState('Alice');
console.log('Initial state:', initialState);

// Play the game
try {
  const playerChoices = [3, 7, 2, 9];
  const updatedState = playGame(initialState, playerChoices);
  console.log('After playing:');
  console.log('  Status:', updatedState.status);
  console.log('  Score:', updatedState.score);
  console.log('  Matches:', updatedState.matches);
  console.log('  Result:', updatedState.result.message);
} catch (error) {
  console.log('Error:', error.message);
}

// ======================
// Example 5: Analyze Performance
// ======================
console.log('\n=== Example 5: Analyze Performance ===');

const gameHistory = [
  { matches: 2, score: 50 },
  { matches: 1, score: 10 },
  { matches: 4, score: 1000 },
  { matches: 0, score: 0 },
  { matches: 3, score: 200 }
];

const stats = analyzePerformance(gameHistory);
console.log('Performance statistics:');
console.log('  Total games:', stats.totalGames);
console.log('  Total score:', stats.totalScore);
console.log('  Average score:', stats.averageScore);
console.log('  Average matches:', stats.averageMatches);
console.log('  Jackpots:', stats.jackpots);
console.log('  Wins:', stats.wins);
console.log('  Losses:', stats.losses);
console.log('  Win rate:', stats.winRate);

// ======================
// Example 6: Win Probabilities
// ======================
console.log('\n=== Example 6: Win Probabilities ===');

const probabilities = getWinProbabilities();
console.log('Jackpot probability:', probabilities.jackpot);
console.log('Three matches probability:', probabilities.threeMatches);
console.log('Two matches probability:', probabilities.twoMatches);
console.log('One match probability:', probabilities.oneMatch);
console.log('No match probability:', probabilities.noMatch);

// ======================
// Example 7: Simulate Multiple Games
// ======================
console.log('\n=== Example 7: Simulate Multiple Games ===');

const simulateGames = (count) => {
  const results = [];
  
  for (let i = 0; i < count; i++) {
    const player = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ];
    const lucky = generateLuckyNumbers();
    const result = calculateGameResult(player, lucky);
    results.push(result);
  }
  
  return results;
};

const simulatedGames = simulateGames(10);
console.log('Simulated 10 games:');
simulatedGames.forEach((game, index) => {
  console.log(`  Game ${index + 1}: ${game.matches} matches, ${game.score} points - ${game.message}`);
});

const simulationStats = analyzePerformance(simulatedGames);
console.log('\nSimulation statistics:', simulationStats);

// ======================
// Example 8: Edge Cases
// ======================
console.log('\n=== Example 8: Edge Cases ===');

// Perfect match (jackpot)
const jackpotResult = calculateGameResult([0, 0, 0, 0], [0, 0, 0, 0]);
console.log('Jackpot scenario:', {
  matches: jackpotResult.matches,
  score: jackpotResult.score,
  isJackpot: jackpotResult.isJackpot
});

// No match
const noMatchResult = calculateGameResult([0, 1, 2, 3], [9, 8, 7, 6]);
console.log('No match scenario:', {
  matches: noMatchResult.matches,
  score: noMatchResult.score,
  isWinner: noMatchResult.isWinner
});

// Export for use in other modules
export {
  simulateGames
};

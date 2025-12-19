# Game Logic - Hasthiya Lucky 4

## Overview
Complete game logic implementation for the Lucky 4 number matching game. This module provides all the core game mechanics, validation, and state management.

## Architecture

```
Backend/
├── config/
│   └── gameConfig.js          # Game constants and configuration
├── logic/
│   ├── numberGenerator.js      # Random number generation
│   ├── gameEngine.js           # Matching and scoring engine
│   ├── gameValidator.js        # Input validation
│   ├── gameStateManager.js     # State management
│   └── examples.js             # Usage examples
└── utils/
    └── gameLogic.js            # Convenience re-exports
```

## Core Modules

### 1. Game Configuration (`config/gameConfig.js`)

Central configuration for all game constants:

```javascript
import { NUMBER_CONFIG, SCORE_MAP, GAME_RULES } from './config/gameConfig.js';

// Number constraints
NUMBER_CONFIG.MIN_VALUE        // 0
NUMBER_CONFIG.MAX_VALUE        // 9
NUMBER_CONFIG.NUMBERS_PER_GAME // 4

// Scoring system
SCORE_MAP[0] // 0 points
SCORE_MAP[1] // 10 points
SCORE_MAP[2] // 50 points
SCORE_MAP[3] // 200 points
SCORE_MAP[4] // 1000 points (Jackpot!)
```

**Features:**
- Game information and versioning
- Number constraints (0-9, 4 numbers)
- Score mapping (0, 10, 50, 200, 1000)
- Prize tier names
- Game status enum
- Validation messages
- Error codes
- Probability information
- Game rules text
- Pagination defaults

### 2. Number Generator (`logic/numberGenerator.js`)

Random number generation for the game:

```javascript
import { generateLuckyNumbers, generateUniqueLuckyNumbers } from './logic/numberGenerator.js';

// Generate 4 random numbers (can have duplicates)
const luckyNumbers = generateLuckyNumbers();
// Example: [3, 7, 3, 9]

// Generate 4 unique numbers (no duplicates)
const uniqueNumbers = generateUniqueLuckyNumbers();
// Example: [2, 5, 8, 1]
```

**Functions:**
- `getRandomNumber(min, max)` - Single random number
- `generateLuckyNumbers(count)` - Array of random numbers
- `generateUniqueLuckyNumbers(count)` - Unique numbers only
- `generateWeightedNumbers(count, weights)` - Weighted distribution
- `generateSeededNumbers(seed, count)` - Reproducible for testing
- `isValidNumber(num)` - Validate single number
- `isValidNumberArray(numbers)` - Validate array

### 3. Game Engine (`logic/gameEngine.js`)

Core matching and scoring logic:

```javascript
import { calculateGameResult, countMatches, calculateScore } from './logic/gameEngine.js';

const playerNumbers = [5, 6, 7, 8];
const luckyNumbers = [5, 6, 9, 1];

// Get complete game result
const result = calculateGameResult(playerNumbers, luckyNumbers);
console.log(result);
// {
//   playerNumbers: [5, 6, 7, 8],
//   luckyNumbers: [5, 6, 9, 1],
//   matches: 2,
//   score: 50,
//   prizeTier: 'Medium Prize',
//   isJackpot: false,
//   isWinner: true,
//   matchDetails: [...],
//   message: "Two matches! You're getting closer!"
// }
```

**Functions:**
- `countMatches(player, lucky)` - Count position matches
- `calculateScore(matches)` - Convert matches to score
- `getPrizeTier(matches)` - Get prize tier name
- `isJackpot(matches)` - Check if jackpot (4 matches)
- `isWinner(matches)` - Check if won (1+ matches)
- `getMatchDetails(player, lucky)` - Detailed match info
- `calculateGameResult(player, lucky)` - Complete result
- `getResultMessage(matches)` - Get result message
- `getWinProbabilities()` - Probability information
- `analyzePerformance(games)` - Multi-game statistics

### 4. Game Validator (`logic/gameValidator.js`)

Input validation and sanitization:

```javascript
import { validatePlayerNumbers, validatePlayerName } from './logic/gameValidator.js';

// Validate player numbers
const validation = validatePlayerNumbers([1, 2, 3, 4]);
// { isValid: true, error: null }

// Validate player name
const nameValidation = validatePlayerName('John Doe');
// { isValid: true, error: null }

// Invalid input
const invalid = validatePlayerNumbers([1, 2, 3, 10]);
// { isValid: false, error: 'All numbers must be between 0 and 9', code: 'VALIDATION_ERROR' }
```

**Functions:**
- `validatePlayerName(name)` - Validate player name
- `validatePlayerNumbers(numbers)` - Validate number array
- `validateGameStatus(status)` - Validate status enum
- `validateGamePlayability(game)` - Check if game can be played
- `validatePagination(page, limit)` - Validate & sanitize pagination
- `validateGameCreation(data)` - Validate creation request
- `validateGamePlay(data, game)` - Validate play request
- `sanitizePlayerName(name)` - Clean player name
- `sanitizeNumbers(numbers)` - Clean number array
- `createValidationError(msg, code)` - Create error object

### 5. Game State Manager (`logic/gameStateManager.js`)

Manage game lifecycle and state transitions:

```javascript
import { createGameState, playGame } from './logic/gameStateManager.js';

// Create initial state
const initialState = createGameState('Alice');
// { playerName: 'Alice', status: 'active', ... }

// Play the game
const updatedState = playGame(initialState, [3, 7, 2, 9]);
// {
//   playerName: 'Alice',
//   playerNumbers: [3, 7, 2, 9],
//   luckyNumbers: [3, 5, 2, 8],
//   matches: 2,
//   score: 50,
//   status: 'completed',
//   result: { ... }
// }
```

**Functions:**
- `createGameState(playerName)` - Create initial state
- `playGame(state, numbers)` - Play and update state
- `completeGame(state)` - Mark as completed
- `cancelGame(state)` - Cancel game
- `getGameSummary(state)` - Get summary
- `transitionState(state, action, payload)` - State transitions
- `validateStateTransition(state, action)` - Validate transition

**GameState Class:**
- `isActive()` - Check if active
- `isCompleted()` - Check if completed
- `canPlay()` - Check if playable
- `toObject()` - Convert to plain object

## Game Rules

### Number Selection
- Players select 4 numbers
- Each number must be 0-9 (inclusive)
- Duplicates are allowed
- Order matters (position-based matching)

### Matching Logic
- Numbers must match in the same position
- Example:
  - Player: [5, 6, 7, 8]
  - Lucky:  [5, 6, 9, 1]
  - Matches: 2 (positions 0 and 1)

### Scoring System
| Matches | Points | Prize Tier |
|---------|--------|------------|
| 0 | 0 | No Prize |
| 1 | 10 | Small Prize |
| 2 | 50 | Medium Prize |
| 3 | 200 | Large Prize |
| 4 | 1000 | Jackpot! |

### Probabilities
- Jackpot (4 matches): 0.01% (1 in 10,000)
- 3 matches: 0.36% (36 in 10,000)
- 2 matches: 4.86% (486 in 10,000)
- 1 match: 29.16% (2,916 in 10,000)
- No match: 65.61% (6,561 in 10,000)

## Usage Examples

### Example 1: Complete Game Flow
```javascript
import { createGameState, playGame } from './logic/gameStateManager.js';
import { validatePlayerNumbers } from './logic/gameValidator.js';

// 1. Create game
const game = createGameState('John');

// 2. Validate player input
const playerNumbers = [3, 7, 2, 9];
const validation = validatePlayerNumbers(playerNumbers);

if (validation.isValid) {
  // 3. Play game
  const result = playGame(game, playerNumbers);
  
  // 4. Display result
  console.log(`Score: ${result.score}`);
  console.log(`Message: ${result.result.message}`);
}
```

### Example 2: Analyze Player Performance
```javascript
import { analyzePerformance } from './logic/gameEngine.js';

const games = [
  { matches: 2, score: 50 },
  { matches: 1, score: 10 },
  { matches: 4, score: 1000 },
  { matches: 0, score: 0 }
];

const stats = analyzePerformance(games);
// {
//   totalGames: 4,
//   totalScore: 1060,
//   averageScore: "265.00",
//   averageMatches: "1.75",
//   jackpots: 1,
//   wins: 3,
//   losses: 1,
//   winRate: "75.00%"
// }
```

### Example 3: Validate and Sanitize Input
```javascript
import { validatePlayerNumbers, sanitizeNumbers } from './logic/gameValidator.js';

// Sanitize user input
const rawInput = ['1', '2', '3', '4'];
const sanitized = sanitizeNumbers(rawInput);
// [1, 2, 3, 4]

// Validate
const validation = validatePlayerNumbers(sanitized);
if (validation.isValid) {
  // Proceed with game
}
```

## Testing

Run the examples file to see all functions in action:

```bash
node Backend/logic/examples.js
```

This will demonstrate:
1. Number generation
2. Game result calculation
3. Input validation
4. State management
5. Performance analysis
6. Probability calculations
7. Game simulation
8. Edge cases

## Integration with API

The game logic is integrated into the API through controllers:

```javascript
// In controllers/gameController.js
import { generateLuckyNumbers } from '../logic/numberGenerator.js';
import { calculateGameResult } from '../logic/gameEngine.js';
import { validatePlayerNumbers } from '../logic/gameValidator.js';

export const playGame = async (req, res) => {
  const { playerNumbers } = req.body;
  
  // Validate
  const validation = validatePlayerNumbers(playerNumbers);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }
  
  // Generate lucky numbers
  const luckyNumbers = generateLuckyNumbers();
  
  // Calculate result
  const result = calculateGameResult(playerNumbers, luckyNumbers);
  
  // Return result
  res.json(result);
};
```

## Error Handling

All validation functions return standardized error objects:

```javascript
{
  isValid: false,
  error: "Error message",
  code: "ERROR_CODE"
}
```

Error codes:
- `VALIDATION_ERROR` - Invalid input
- `GAME_NOT_FOUND` - Game doesn't exist
- `GAME_ALREADY_PLAYED` - Game already completed
- `DATABASE_ERROR` - Database operation failed
- `INTERNAL_ERROR` - Server error

## Best Practices

1. **Always validate input** before processing
2. **Use validation functions** instead of manual checks
3. **Handle errors gracefully** with appropriate messages
4. **Use state manager** for game lifecycle
5. **Sanitize user input** before storing
6. **Log important actions** for debugging
7. **Test edge cases** (jackpot, no match, invalid input)

## Extension Points

The game logic is modular and can be extended:

1. **Custom scoring**: Modify `SCORE_MAP` in config
2. **Different number ranges**: Change `NUMBER_CONFIG`
3. **Weighted generation**: Use `generateWeightedNumbers()`
4. **Custom validations**: Add to `gameValidator.js`
5. **New state transitions**: Extend `gameStateManager.js`

## Performance Considerations

- Number generation: O(1)
- Match counting: O(n) where n = 4
- Validation: O(n) where n = number count
- State updates: O(1)

All operations are highly efficient and suitable for real-time gameplay.

// Generate 4 random lucky numbers (0-9)
export const generateLuckyNumbers = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
};

// Calculate score based on matches
export const calculateScore = (matches) => {
  const scoreMap = {
    0: 0,
    1: 10,
    2: 50,
    3: 200,
    4: 1000
  };
  return scoreMap[matches] || 0;
};

// Count matching numbers in correct positions
export const countMatches = (playerNumbers, luckyNumbers) => {
  return playerNumbers.filter((num, index) => num === luckyNumbers[index]).length;
};

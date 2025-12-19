// Validation middleware for request body
export const validateGameCreation = (req, res, next) => {
  const { playerName } = req.body;

  if (!playerName || typeof playerName !== 'string' || playerName.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Valid player name is required'
    });
  }

  if (playerName.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Player name must be 50 characters or less'
    });
  }

  next();
};

export const validateGamePlay = (req, res, next) => {
  const { playerNumbers } = req.body;

  if (!playerNumbers || !Array.isArray(playerNumbers)) {
    return res.status(400).json({
      success: false,
      message: 'playerNumbers must be an array'
    });
  }

  if (playerNumbers.length !== 4) {
    return res.status(400).json({
      success: false,
      message: 'Exactly 4 numbers are required'
    });
  }

  const isValid = playerNumbers.every(num => 
    Number.isInteger(num) && num >= 0 && num <= 9
  );

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'All numbers must be integers between 0 and 9'
    });
  }

  next();
};

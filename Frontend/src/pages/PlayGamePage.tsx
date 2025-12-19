import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Chip,
} from '@mui/material';
import {
  Casino as CasinoIcon,
  EmojiEvents as TrophyIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { usePlayer } from '../context/PlayerContext';
import { gameAPI } from '../services/api';
import type { GameResult } from '../types';

const PlayGamePage: React.FC = () => {
  const { player } = usePlayer();
  const [numbers, setNumbers] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleNumberChange = (index: number, value: string) => {
    // Only allow single digit 0-9
    if (value === '' || (/^\d$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 9)) {
      const newNumbers = [...numbers];
      newNumbers[index] = value;
      setNumbers(newNumbers);
      setError(null);

      // Auto-focus next field
      if (value !== '' && index < 3) {
        const nextField = document.getElementById(`number-${index + 1}`);
        nextField?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && numbers[index] === '' && index > 0) {
      const prevField = document.getElementById(`number-${index - 1}`);
      prevField?.focus();
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (numbers.some(n => n === '')) {
      setError('Please enter all 4 numbers');
      return;
    }

    if (!player?.gameId) {
      setError('Game session not found. Please sign up again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const playerNumbers = numbers.map(Number);
      const response = await gameAPI.playGame(player.gameId, playerNumbers);

      setResult(response.data!);
      setShowResult(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to play game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    setNumbers(['', '', '', '']);
    setResult(null);
    setShowResult(false);
    setError(null);
    // Focus first field
    document.getElementById('number-0')?.focus();
  };

  const getScoreColor = (matches: number) => {
    if (matches === 4) return '#f5576c';
    if (matches === 3) return '#667eea';
    if (matches === 2) return '#00bcd4';
    if (matches === 1) return '#4caf50';
    return '#9e9e9e';
  };

  const getPrizeLabel = (matches: number) => {
    if (matches === 4) return 'JACKPOT! 🎰';
    if (matches === 3) return 'Amazing! 🌟';
    if (matches === 2) return 'Great! 🎉';
    if (matches === 1) return 'Good! 👍';
    return 'Try Again! 🍀';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Play Lucky 4 🎲
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Pick your lucky 4 numbers and try your luck!
        </Typography>
      </Box>

      <Card
        elevation={4}
        sx={{
          background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Number Input Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CasinoIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Choose Your Numbers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select 4 numbers between 0 and 9
            </Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {numbers.map((num, index) => (
              <Grid item xs={3} sm={2} key={index}>
                <TextField
                  id={`number-${index}`}
                  value={num}
                  onChange={(e) => handleNumberChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      height: 80,
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                        borderWidth: 2,
                      },
                    },
                  }}
                  disabled={loading}
                  autoFocus={index === 0}
                />
              </Grid>
            ))}
          </Grid>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit}
            disabled={loading || numbers.some(n => n === '')}
            sx={{
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Play Now!'}
          </Button>

          {/* Score Guide */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Prize Guide 🏆
            </Typography>
            <Grid container spacing={1}>
              {[
                { matches: 4, points: 1000 },
                { matches: 3, points: 200 },
                { matches: 2, points: 50 },
                { matches: 1, points: 10 },
                { matches: 0, points: 0 },
              ].map((prize) => (
                <Grid item xs={12} sm={6} key={prize.matches}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="body1">
                      <strong>{prize.matches}</strong> Matches
                    </Typography>
                    <Chip
                      label={`${prize.points} pts`}
                      color={prize.matches >= 3 ? 'primary' : 'default'}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Result Dialog */}
      <Dialog
        open={showResult}
        onClose={() => setShowResult(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
      >
        <Box sx={{ textAlign: 'center', pt: 4, px: 3 }}>
          <TrophyIcon sx={{ fontSize: 80, color: getScoreColor(result?.matches || 0) }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
            {getPrizeLabel(result?.matches || 0)}
          </Typography>
        </Box>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          {result && (
            <Box>
              {/* Winning Numbers */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Winning Numbers
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                  {result.luckyNumbers.map((num, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        background: '#667eea',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {num}
                    </Box>
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your Numbers
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  {result.playerNumbers.map((num, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        background:
                          num === result.luckyNumbers[idx]
                            ? getScoreColor(result.matches)
                            : '#e0e0e0',
                        color: num === result.luckyNumbers[idx] ? 'white' : '#424242',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        position: 'relative',
                      }}
                    >
                      {num}
                      {num === result.luckyNumbers[idx] && (
                        <CheckIcon
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            fontSize: 20,
                            bgcolor: 'white',
                            borderRadius: '50%',
                            color: getScoreColor(result.matches),
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Score Details */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  mb: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Matches
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {result.matches}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Score
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ color: getScoreColor(result.matches) }}
                    >
                      {result.score}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="body1" color="text.secondary">
                {result.result}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setShowResult(false)}
            sx={{ minWidth: 120 }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handlePlayAgain}
            sx={{
              minWidth: 120,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlayGamePage;

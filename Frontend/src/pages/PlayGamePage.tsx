import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Fade,
  Chip,
} from '@mui/material';
import {
  Casino as CasinoIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { usePlayer } from '../context/PlayerContext';
import { gameAPI } from '../services/api';
import type { GameResult } from '../types';

const PlayGamePage: React.FC = () => {
  const { player } = usePlayer();
  const [numbers, setNumbers] = useState<(number | null)[]>([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRoll = (index: number) => {
    // Generate random number between 1-10
    const randomNum = Math.floor(Math.random() * 10) + 1;
    const newNumbers = [...numbers];
    newNumbers[index] = randomNum;
    setNumbers(newNumbers);
    setError(null);
  };

  const handleSubmit = async () => {
    // Validation
    if (numbers.some(n => n === null)) {
      setError('Please roll all 4 numbers');
      return;
    }

    if (!player?.id) {
      setError('Game session not found. Please sign up again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedNumbers = numbers as number[];
      const response = await gameAPI.playGame(player.id, generatedNumbers);

      setResult(response.data!);
      setShowResult(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to play game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    setNumbers([null, null, null, null]);
    setResult(null);
    setShowResult(false);
    setError(null);
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
          {/* Number Roll Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CasinoIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Roll Your Numbers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click each button to generate a random number (1-10)
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            {numbers.map((num, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleRoll(index)}
                    disabled={loading}
                    startIcon={<CasinoIcon />}
                    sx={{
                      width: '100%',
                      py: 2,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      background: num !== null 
                        ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)' 
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: num !== null
                          ? 'linear-gradient(135deg, #45a049 0%, #4caf50 100%)'
                          : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      },
                    }}
                  >
                    Roll {index + 1}
                  </Button>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      border: '3px solid',
                      borderColor: num !== null ? '#667eea' : '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: num !== null ? '#667eea10' : 'background.paper',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {num !== null ? (
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color="primary"
                        sx={{
                          animation: 'fadeIn 0.3s ease',
                          '@keyframes fadeIn': {
                            from: { opacity: 0, transform: 'scale(0.5)' },
                            to: { opacity: 1, transform: 'scale(1)' },
                          },
                        }}
                      >
                        {num}
                      </Typography>
                    ) : (
                      <Typography variant="h5" color="text.disabled">
                        ?
                      </Typography>
                    )}
                  </Box>
                </Box>
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
            disabled={loading || numbers.some(n => n === null)}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit & Compare!'}
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
          <TrophyIcon sx={{ fontSize: 80, color: '#667eea' }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
            Game Complete!
          </Typography>
        </Box>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          {result && (
            <Box>
              {/* Score Details */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your Generated Numbers
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                  {result.generatedNumbers.map((num, idx) => (
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
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Score
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ color: '#667eea' }}
                    >
                      {result.score}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
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

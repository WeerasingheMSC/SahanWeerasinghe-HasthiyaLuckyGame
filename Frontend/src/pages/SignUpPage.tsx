import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Casino as CasinoIcon } from '@mui/icons-material';
import { usePlayer } from '../context/PlayerContext';
import { gameAPI } from '../services/api';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPlayer } = usePlayer();
  const [playerName, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (playerName.length > 50) {
      setError('Name must be 50 characters or less');
      return;
    }

    // Create game session via API
    setLoading(true);
    try {
      const response = await gameAPI.createGame(playerName.trim(), email.trim());
      
      // Save player info with gameId from backend
      setPlayer({ 
        gameId: response.data!.gameId,
        playerName: playerName.trim(), 
        email: email.trim() 
      });
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create player. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={24}
          sx={{
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Logo and Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <CasinoIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                Hasthiya Lucky 4
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Match 4 numbers and win big prizes!
              </Typography>
            </Box>

            {/* Welcome Message */}
            <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
              Welcome! Let's Get Started
            </Typography>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                sx={{ mb: 3 }}
                inputProps={{ maxLength: 50 }}
                helperText="Enter your name to start playing"
              />

              <TextField
                fullWidth
                type="email"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 4 }}
                helperText="We'll use this to track your scores"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Playing'}
              </Button>
            </form>

            {/* Game Info */}
            <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                🎮 How to Play:
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Select 4 numbers between 0 and 9
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                • Match numbers in exact positions to win
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Jackpot: 1000 points for 4 matches!
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: 'white', opacity: 0.8 }}
        >
          © 2025 Hasthiya Lucky 4 • Good Luck! 🍀
        </Typography>
      </Container>
    </Box>
  );
};

export default SignUpPage;

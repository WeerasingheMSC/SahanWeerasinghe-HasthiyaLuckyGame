import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Container,
} from '@mui/material';
import {
  Casino as CasinoIcon,
  Leaderboard as LeaderboardIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { usePlayer } from '../context/PlayerContext';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const { player } = usePlayer();

  const cards = [
    {
      title: 'Play Game',
      description: 'Start a new Lucky 4 game and try your luck!',
      icon: <CasinoIcon sx={{ fontSize: 80 }} />,
      path: '/dashboard/play',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Leaderboard',
      description: 'Check top players and rankings',
      icon: <LeaderboardIcon sx={{ fontSize: 80 }} />,
      path: '/dashboard/leaderboard',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome back, {player?.playerName}! 👋
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Ready to play Lucky 4 and win amazing prizes?
        </Typography>
      </Box>

      {/* Game Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} key={card.title}>
            <Card
              elevation={4}
              sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(card.path)}
                sx={{ height: '100%', minHeight: 280 }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box
                    sx={{
                      background: card.gradient,
                      borderRadius: '50%',
                      width: 120,
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      mb: 3,
                      color: 'white',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How to Play Section */}
      <Card elevation={3} sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrophyIcon sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              How to Play Lucky 4
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#667eea',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Pick 4 Numbers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose 4 numbers between 0 and 9
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#667eea',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Submit Your Pick
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Confirm your number selection
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#667eea',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Match & Win
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Match positions to win points
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#f5576c',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  <TrophyIcon />
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Win Prizes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Up to 1000 points for jackpot!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Scoring Guide */}
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Scoring Guide 🎯
          </Typography>
          
          <Grid container spacing={2}>
            {[
              { matches: 4, points: 1000, label: 'JACKPOT!', color: '#f5576c' },
              { matches: 3, points: 200, label: 'Amazing!', color: '#667eea' },
              { matches: 2, points: 50, label: 'Great!', color: '#00bcd4' },
              { matches: 1, points: 10, label: 'Good!', color: '#4caf50' },
              { matches: 0, points: 0, label: 'Try Again', color: '#9e9e9e' },
            ].map((score) => (
              <Grid item xs={12} sm={6} md={4} key={score.matches}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `2px solid ${score.color}`,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" sx={{ color: score.color }}>
                    {score.matches} Matches
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {score.points} pts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {score.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DashboardHome;

import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { leaderboardAPI } from '../services/api';
import type { LeaderboardEntry } from '../types';

const LeaderboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchLeaderboard();
  }, [page, rowsPerPage]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await leaderboardAPI.getLeaderboard({
        page: page + 1, // API uses 1-based indexing
        limit: rowsPerPage,
      });

      setLeaderboard(response.data!);
      setTotal(response.pagination!.total);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#FFD700'; // Gold
    if (rank === 2) return '#C0C0C0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return '#667eea';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <TrophyIcon sx={{ color: getRankColor(rank) }} />;
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Leaderboard 🏆
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Top players and their scores
        </Typography>
      </Box>

      <Card elevation={4}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : leaderboard.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <TrophyIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No players yet. Be the first to play!
              </Typography>
            </Box>
          ) : (
            <>
              {/* Desktop Table */}
              {!isMobile && (
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      >
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                          Rank
                        </TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                          Player
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                          Games Played
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                          Total Score
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                          Avg Matches
                        </TableCell>
                        <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                          Highest Score
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaderboard.map((entry, index) => {
                        const globalRank = page * rowsPerPage + index + 1;
                        return (
                          <TableRow
                            key={entry.playerId}
                            sx={{
                              '&:hover': { bgcolor: 'action.hover' },
                              bgcolor: globalRank <= 3 ? `${getRankColor(globalRank)}10` : 'inherit',
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {getRankIcon(globalRank)}
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  sx={{ color: getRankColor(globalRank) }}
                                >
                                  #{globalRank}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                  sx={{
                                    bgcolor: getRankColor(globalRank),
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {getInitials(entry.player_name)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body1" fontWeight="bold">
                                    {entry.player_name}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={entry.games_played}
                                size="small"
                                sx={{ minWidth: 50 }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="h6" fontWeight="bold" color="primary">
                                {entry.total_score}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body1">
                                {parseFloat(entry.avg_matches).toFixed(1)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body1">
                                {entry.highest_score}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {/* Mobile Cards */}
              {isMobile && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {leaderboard.map((entry, index) => {
                    const globalRank = page * rowsPerPage + index + 1;
                    return (
                      <Card
                        key={entry.playerId}
                        elevation={2}
                        sx={{
                          bgcolor: globalRank <= 3 ? `${getRankColor(globalRank)}10` : 'background.paper',
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getRankIcon(globalRank)}
                              <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{ color: getRankColor(globalRank) }}
                              >
                                #{globalRank}
                              </Typography>
                            </Box>
                            <Avatar
                              sx={{
                                bgcolor: getRankColor(globalRank),
                                width: 50,
                                height: 50,
                                fontWeight: 'bold',
                              }}
                            >
                              {getInitials(entry.player_name)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body1" fontWeight="bold">
                                {entry.player_name}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: 2,
                            }}
                          >
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Total Score
                              </Typography>
                              <Typography variant="h6" fontWeight="bold" color="primary">
                                {entry.total_score}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Games Played
                              </Typography>
                              <Typography variant="h6" fontWeight="bold">
                                {entry.games_played}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Avg Matches
                              </Typography>
                              <Typography variant="h6" fontWeight="bold">
                                {parseFloat(entry.avg_matches).toFixed(1)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Highest Score
                              </Typography>
                              <Typography variant="h6" fontWeight="bold">
                                {entry.highest_score}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              )}

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default LeaderboardPage;

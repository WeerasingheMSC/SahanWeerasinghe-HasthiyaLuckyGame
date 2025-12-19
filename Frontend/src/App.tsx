import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import SignUpPage from './pages/SignUpPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import PlayGamePage from './pages/PlayGamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      dark: '#764ba2',
    },
    secondary: {
      main: '#f5576c',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { player } = usePlayer();

  if (!player) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="play" element={<PlayGamePage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlayerProvider>
        <AppContent />
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;

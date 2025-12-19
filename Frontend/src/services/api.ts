import axios from 'axios';
import type { Game, LeaderboardEntry, ApiResponse, GameResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Game API
export const gameAPI = {
  // Create a new game session
  createGame: async (playerName: string, playerEmail: string): Promise<ApiResponse<{ gameId: number; playerName: string; playerEmail: string; status: string }>> => {
    const response = await api.post('/games', { playerName, playerEmail });
    return response.data;
  },

  // Get all games with pagination
  getAllGames: async (page = 1, limit = 10): Promise<ApiResponse<Game[]>> => {
    const response = await api.get(`/games?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get specific game by ID
  getGameById: async (id: number): Promise<ApiResponse<Game>> => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  // Play a game
  playGame: async (gameId: number, playerNumbers: number[]): Promise<ApiResponse<GameResult>> => {
    const response = await api.post(`/games/${gameId}/play`, { playerNumbers });
    return response.data;
  },

  // Delete a game
  deleteGame: async (id: number): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/games/${id}`);
    return response.data;
  },
};

interface LeaderboardParams {
  page?: number;
  limit?: number;
}

// Leaderboard API
export const leaderboardAPI = {
  // Get leaderboard with pagination
  getLeaderboard: async (params: LeaderboardParams = {}): Promise<ApiResponse<LeaderboardEntry[]>> => {
    const { page = 1, limit = 10 } = params;
    const response = await api.get(`/leaderboard?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get player statistics
  getPlayerStats: async (playerId: number): Promise<ApiResponse<LeaderboardEntry>> => {
    const response = await api.get(`/players/${playerId}/stats`);
    return response.data;
  },
};

// Health check
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await api.get('/test-db');
    return response.data.success;
  } catch {
    return false;
  }
};

export default api;

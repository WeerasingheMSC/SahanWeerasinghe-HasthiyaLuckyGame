// TypeScript types for the Lucky 4 game

export interface Player {
  gameId?: number;
  playerName: string;
  email?: string;
}

export interface GameResult {
  playerNumbers: number[];
  luckyNumbers: number[];
  matches: number;
  score: number;
  result: string;
}

export interface Game {
  id: number;
  player_name: string;
  player_numbers: number[] | null;
  lucky_numbers: number[] | null;
  matches: number;
  score: number;
  status: 'active' | 'completed';
  created_at: string;
  played_at: string | null;
}

export interface LeaderboardEntry {
  player_name: string;
  games_played: number;
  total_score: number;
  highest_score: number;
  avg_matches: number;
  last_played: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationMeta;
}

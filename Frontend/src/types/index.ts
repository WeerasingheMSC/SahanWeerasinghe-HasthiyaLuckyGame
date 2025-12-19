// TypeScript types for the Lucky 4 game

export interface Player {
  id?: number;
  email: string;
}

export interface GameResult {
  generatedNumbers: number[];
  score: number;
}

export interface Game {
  id: number;
  email: string;
  generated_numbers: number[] | null;
  score: number;
  is_played: boolean;
  created_at: string;
}

export interface LeaderboardEntry {
  id: number;
  email: string;
  score: number;
  created_at: string;
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

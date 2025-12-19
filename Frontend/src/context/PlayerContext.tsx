import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Player } from '../types';

interface PlayerContextType {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
  isAuthenticated: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayerState] = useState<Player | null>(() => {
    const stored = localStorage.getItem('player');
    return stored ? JSON.parse(stored) : null;
  });

  const setPlayer = (newPlayer: Player | null) => {
    if (newPlayer) {
      localStorage.setItem('player', JSON.stringify(newPlayer));
    } else {
      localStorage.removeItem('player');
    }
    setPlayerState(newPlayer);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
        isAuthenticated: !!player,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

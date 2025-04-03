/**
 * React context for managing the global state of games
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Game, Platform } from '../../domain/entities/Game';
import { GameApiAdapter } from '../../infrastructure/api/GameApiAdapter';

// Interface for the context
interface GameContextType {
  games: Game[];
  loading: boolean;
  error: string | null;
  selectedGame: Game | null;
  selectedPlatform: Platform | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectGame: (gameId: string) => Promise<void>;
  filterGamesByPlatform: (platform: Platform) => Promise<void>;
  getGamesByTitle: (query: string) => Promise<void>;
  resetFilters: () => Promise<void>;
}

// Props for the provider
interface GameProviderProps {
  children: ReactNode;
}

// Creating the context with a default value
const GameContext = createContext<GameContextType | undefined>(undefined);

/**
 * Provider for the games context
 */
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // API adapter instance
  const gameApi = new GameApiAdapter();

  // Initial loading of games
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const allGames = await gameApi.getAllGames();
        setGames(allGames);
        setError(null);
      } catch (err) {
        setError('Error loading games');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Select a game by its ID
  const selectGame = async (gameId: string) => {
    try {
      const game = await gameApi.getGameById(gameId);
      setSelectedGame(game);
      setError(null);
    } catch (err) {
      setError(`Error selecting game ${gameId}`);
      console.error(err);
    }
  };

  // Filter games by platform
  const filterGamesByPlatform = async (platform: Platform) => {
    try {
      setLoading(true);
      const filteredGames = await gameApi.getGamesByPlatform(platform);
      setGames(filteredGames);
      setSelectedPlatform(platform);
      setError(null);
    } catch (err) {
      setError(`Error filtering games by platform ${platform}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search for games
  const getGamesByTitle = async (query: string) => {
    try {
      setLoading(true);
      const searchResults = await gameApi.getGamesByTitle(query);
      setGames(searchResults);
      setSearchQuery(query);
      setError(null);
    } catch (err) {
      setError(`Error searching for games with term "${query}"`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const resetFilters = async () => {
    try {
      setLoading(true);
      const allGames = await gameApi.getAllGames();
      setGames(allGames);
      setSelectedPlatform(null);
      setSearchQuery('');
      setError(null);
    } catch (err) {
      setError('Error resetting filters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value: GameContextType = {
    games,
    loading,
    error,
    selectedGame,
    selectedPlatform,
    searchQuery,
    setSearchQuery,
    selectGame,
    filterGamesByPlatform,
    getGamesByTitle,
    resetFilters,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

/**
 * Custom hook to use the games context
 */
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

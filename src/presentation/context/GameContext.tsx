import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Game, Platform } from '../../domain/entities/Game';
import { GameApiAdapter } from '../../infrastructure/api/GameApiAdapter';

interface GameContextType {
  games: Game[];
  loading: boolean;
  error: string | null;
  selectedGame: Game | null;
  selectedPlatform: Platform | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectGame: (gameId: string) => Promise<void>;
  filterGamesByPlatform: (platform: Platform | null) => Promise<void>;
  getGamesByTitle: (query: string) => Promise<void>;
  resetFilters: () => Promise<void>;
  loadMoreGames: () => Promise<void>;
  hasMoreGames: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  const gameApiAdapter = new GameApiAdapter();
  const ITEMS_PER_PAGE = 6;

  // Load initial games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedGames = await gameApiAdapter.getGamesPaginated(
          1,
          ITEMS_PER_PAGE
        );
        setGames(fetchedGames);
        setCurrentPage(1);
        setHasMoreGames(fetchedGames.length === ITEMS_PER_PAGE);
      } catch (err) {
        setError('Failed to fetch games. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Load more games for infinite scrolling
  const loadMoreGames = useCallback(async () => {
    if (isFiltered || !hasMoreGames || loading) return;

    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const moreGames = await gameApiAdapter.getGamesPaginated(
        nextPage,
        ITEMS_PER_PAGE
      );

      if (moreGames.length > 0) {
        setGames((prevGames) => [...prevGames, ...moreGames]);
        setCurrentPage(nextPage);
        setHasMoreGames(moreGames.length === ITEMS_PER_PAGE);
      } else {
        setHasMoreGames(false);
      }
    } catch (err) {
      setError('Failed to load more games. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasMoreGames, loading, isFiltered]);

  // Select a game by ID
  const selectGame = async (gameId: string) => {
    try {
      setLoading(true);
      const game = await gameApiAdapter.getGameById(gameId);
      if (game) {
        setSelectedGame(game);
      }
    } catch (err) {
      setError('Failed to select game. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter games by platform
  const filterGamesByPlatform = async (platform: Platform | null) => {
    try {
      setLoading(true);
      setSelectedPlatform(platform);

      if (platform) {
        const filteredGames = await gameApiAdapter.getGamesByPlatform(platform);
        setGames(filteredGames);
        setIsFiltered(true);
        setHasMoreGames(false);
      } else {
        // Reset to first page when clearing platform filter
        const initialGames = await gameApiAdapter.getGamesPaginated(
          1,
          ITEMS_PER_PAGE
        );
        setGames(initialGames);
        setCurrentPage(1);
        setHasMoreGames(initialGames.length === ITEMS_PER_PAGE);
        setIsFiltered(false);
      }
    } catch (err) {
      setError('Failed to filter games. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search games by title
  const getGamesByTitle = async (query: string) => {
    try {
      setLoading(true);
      setSearchQuery(query);

      if (query.trim()) {
        const searchResults = await gameApiAdapter.getGamesByTitle(query);
        setGames(searchResults);
        setIsFiltered(true);
        setHasMoreGames(false);
      } else {
        // Reset to first page when clearing search
        const initialGames = await gameApiAdapter.getGamesPaginated(
          1,
          ITEMS_PER_PAGE
        );
        setGames(initialGames);
        setCurrentPage(1);
        setHasMoreGames(initialGames.length === ITEMS_PER_PAGE);
        setIsFiltered(false);
      }
    } catch (err) {
      setError('Failed to search games. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset all filters
  const resetFilters = async () => {
    try {
      setLoading(true);
      setSelectedPlatform(null);
      setSearchQuery('');

      const initialGames = await gameApiAdapter.getGamesPaginated(
        1,
        ITEMS_PER_PAGE
      );
      setGames(initialGames);
      setCurrentPage(1);
      setHasMoreGames(initialGames.length === ITEMS_PER_PAGE);
      setIsFiltered(false);
    } catch (err) {
      setError('Failed to reset filters. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
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
        loadMoreGames,
        hasMoreGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

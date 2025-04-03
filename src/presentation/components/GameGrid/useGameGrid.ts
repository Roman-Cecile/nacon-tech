import { Game } from '../../../domain/entities/Game';

interface UseGameGridProps {
  games: Game[];
}

export const useGameGrid = ({
  games,
}: UseGameGridProps) => {
  const hasGames = games.length > 0;
  
  return {
    hasGames,
  };
};
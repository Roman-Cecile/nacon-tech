import React from 'react';
import { Game } from '../../../domain/entities/Game';
import { useGameGrid } from './useGameGrid';
import { GameCard } from '../GameCard/GameCard';

interface GameGridProps {
  games: Game[];
  loading: boolean;
  error: string | null;
  onSelectGame: (gameId: string) => Promise<void>;
}

/**
 * Component for displaying a grid of games
 */
export const GameGrid: React.FC<GameGridProps> = (props) => {
  const { games, loading, error, onSelectGame } = props;
  const { hasGames } = useGameGrid({ games });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (!hasGames) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-lg">Aucun jeu trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onSelect={onSelectGame} />
      ))}
    </div>
  );
};

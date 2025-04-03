import React from 'react';
import { Game } from '../../../domain/entities/Game';
import { useGameCard } from './useGameCard';

// Props for the GameCard component
interface GameCardProps {
  game: Game;
  onSelect: (gameId: string) => void;
}

/**
 * Component that displays game information in a card format
 */
export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  const { renderPlatforms, handleSelectGame } = useGameCard({ onSelect });

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Game image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Additional information */}
        <div className="text-sm text-gray-400 mb-3">
          <div className="flex justify-between">
            <span>Genre: {game.genre}</span>
            <span>{new Date(game.releaseDate).getFullYear()}</span>
          </div>
          <div>
            <span>Publisher: {game.publisher}</span>
          </div>
        </div>

        {/* Available platforms */}
        {renderPlatforms(game.platforms)}

        {/* Action button */}
        <button
          onClick={() => handleSelectGame(game.id)}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          View details
        </button>
      </div>
    </div>
  );
};

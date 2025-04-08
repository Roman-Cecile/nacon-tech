import React from 'react';
import { Game, Promotion } from '../../../domain/entities/Game';
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
  const { renderPlatforms, handleSelectGame, isPromotionActive } = useGameCard({
    onSelect,
  });

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Game image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        {game.promotion && isPromotionActive(game.promotion) && (
          <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-bold shadow-md transform rotate-0 translate-x-0 translate-y-0">
            {game.promotion.discountPercentage
              ? `-${game.promotion.discountPercentage}%`
              : 'PROMO'}
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Promotion details */}
        {game.promotion && isPromotionActive(game.promotion) && (
          <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-500 px-3 py-2 rounded-md mb-3">
            <p className="font-bold">
              {game.promotion.name || 'Promotion en cours'}
            </p>
            <p className="text-xs">
              {game.promotion.discountPercentage &&
                `Réduction: ${game.promotion.discountPercentage}%`}
            </p>
            <p className="text-xs">
              Jusqu'au {new Date(game.promotion.endDate).toLocaleDateString()}
            </p>
          </div>
        )}

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

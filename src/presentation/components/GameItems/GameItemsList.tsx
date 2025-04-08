import React from 'react';
import { Item } from '../../../domain/entities/Game';
import { useGameItems } from './useGameItems';
import { GameItemCard } from './GameItemCard';

interface GameItemsListProps {
  items: Item[] | undefined;
  title?: string;
}

/**
 * Component for displaying a list of game items with infinite scroll
 */
export const GameItemsList: React.FC<GameItemsListProps> = ({
  items = [],
  title = 'Items du jeu',
}) => {
  const ITEMS_PER_PAGE = 3; // Show 6 items initially, then load more on scroll

  const { displayedItems, isLoadingMore, lastItemElementRef } = useGameItems({
    items,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  if (!items || items.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400 text-center">
          Aucun item disponible pour ce jeu
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-96 overflow-y-auto">
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            ref={
              index === displayedItems.length - 1 && displayedItems.length >= 3
                ? lastItemElementRef
                : null
            }
          >
            <GameItemCard item={item} />
          </div>
        ))}
      </div>

      <div
        className={`${isLoadingMore ? '' : 'invisible'} flex justify-center`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    </div>
  );
};

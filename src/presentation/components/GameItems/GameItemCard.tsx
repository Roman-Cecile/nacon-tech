import React from 'react';
import { Item, ItemStat } from '../../../domain/entities/Game';

interface GameItemCardProps {
  item: Item;
}

/**
 * Component for displaying a single game item card
 */
export const GameItemCard: React.FC<GameItemCardProps> = ({ item }) => {
  // Function to render item stats with progress bars
  const renderStats = (stats: ItemStat[]) => {
    return stats.map((stat, index) => (
      <div key={index} className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-300">{stat.name}</span>
          <span className="text-sm text-gray-300">
            {stat.value}
            {stat.maxValue ? `/${stat.maxValue}` : ''}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full"
            style={{
              width: `${
                stat.maxValue ? (stat.value / stat.maxValue) * 100 : stat.value
              }%`,
            }}
          ></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white">{item.name}</h3>
          <span className="bg-purple-600 text-xs text-white px-2 py-1 rounded">
            {item.type}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4">{item.description}</p>

        {/* Item stats */}
        <div className="mt-3">{renderStats(item.stats)}</div>
      </div>
    </div>
  );
};

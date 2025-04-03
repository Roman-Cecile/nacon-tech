import React from 'react';
import { Platform } from '../../../domain/entities/Game';
import { useFilterSection } from './useFilterSection';

interface FilterSectionProps {
  selectedPlatform: Platform | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterGamesByPlatform: (platform: Platform) => Promise<void>;
  getGamesByTitle: (query: string) => Promise<void>;
  resetFilters: () => Promise<void>;
}

export const FilterSection: React.FC<FilterSectionProps> = (props) => {
  const { selectedPlatform, searchQuery, setSearchQuery, resetFilters } = props;

  const { handleSearchSubmit, handlePlatformChange } = useFilterSection(props);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg sticky top-4">
      <h2 className="text-xl font-bold text-white mb-4">Filtres</h2>

      {/* Search input */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Platform filters */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Plateformes</h3>
        <div className="space-y-2">
          {Object.values(Platform).map((platform) => (
            <button
              key={platform}
              onClick={() => handlePlatformChange(platform)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedPlatform === platform
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Reset filters */}
      <button
        onClick={resetFilters}
        className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};

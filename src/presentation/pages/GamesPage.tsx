/**
 * Main page for the application that displays the main content.
 */
import React from 'react';
import { FilterSection } from '../components/FilterSection/FilterSection';
import { GameCarousel } from '../components/GameCarousel/GameCarousel';
import { GameGrid } from '../components/GameGrid/GameGrid';
import { VideoSection } from '../components/VideoSection/VideoSection';
import { useGameContext } from '../context/GameContext';
import { useGamesPage } from './useGamesPage';

export const GamesPage: React.FC = () => {
  const {
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
  } = useGameContext();

  const { viewMode, toggleViewMode } = useGamesPage();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Video section */}
      <div className="mb-8">
        <VideoSection game={selectedGame} />
      </div>

      {/* Main content with filters and game cards */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="md:w-1/4">
          <FilterSection
            selectedPlatform={selectedPlatform}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterGamesByPlatform={filterGamesByPlatform}
            getGamesByTitle={getGamesByTitle}
            resetFilters={resetFilters}
          />

          {/* View mode toggle button */}
          <div className="mt-6">
            <button
              onClick={toggleViewMode}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              <span className="mr-2">
                {viewMode === 'grid'
                  ? 'Switch to Carousel View'
                  : 'Switch to Grid View'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {viewMode === 'grid' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Games display (Grid or Carousel) */}
        <div className="md:w-3/4">
          {viewMode === 'grid' ? (
            <GameGrid
              games={games}
              loading={loading}
              error={error}
              onSelectGame={selectGame}
              onLoadMore={hasMoreGames ? loadMoreGames : undefined}
            />
          ) : (
            <GameCarousel
              games={games}
              loading={loading}
              error={error}
              onSelectGame={selectGame}
            />
          )}
        </div>
      </div>
    </div>
  );
};

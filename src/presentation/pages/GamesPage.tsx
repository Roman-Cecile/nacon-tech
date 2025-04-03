/**
 * Main page for the application that displays the main content.
 */
import React from 'react';
import { useGameContext } from '../context/GameContext';
import { GameGrid } from '../components/GameGrid/GameGrid';
import { VideoSection } from '../components/VideoSection/VideoSection';
import { FilterSection } from '../components/FilterSection/FilterSection';

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
  } = useGameContext();

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
        </div>

        {/* Games grid */}
        <div className="md:w-3/4">
          <GameGrid
            games={games}
            loading={loading}
            error={error}
            onSelectGame={selectGame}
          />
        </div>
      </div>
    </div>
  );
};

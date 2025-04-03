import React, { useState } from 'react';
import { Game } from '../../../domain/entities/Game';
import { GameCard } from '../GameCard/GameCard';

interface GameCarouselProps {
  games: Game[];
  loading: boolean;
  error: string | null;
  onSelectGame: (gameId: string) => Promise<void>;
}

export const GameCarousel: React.FC<GameCarouselProps> = (props) => {
  const { games, loading, error, onSelectGame } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

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

  if (games.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-lg">Aucun jeu trouvé</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        <div className="flex justify-center items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 px-4">
            <GameCard key={games[currentIndex].id} game={games[currentIndex]} onSelect={onSelectGame} />
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-r-lg p-4 focus:outline-none"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white rounded-l-lg p-4 focus:outline-none"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Pagination indicators */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full focus:outline-none ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
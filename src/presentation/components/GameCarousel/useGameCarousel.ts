import { useState } from 'react';
import { Game } from '../../../domain/entities/Game';

interface UseGameCarouselProps {
  games: Game[];
}

export const useGameCarousel = ({ games }: UseGameCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    hasGames: games.length > 0
  };
};
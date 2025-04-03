import { Game } from '../../../domain/entities/Game';

export const useVideoSection = () => {
  // Type guard function to check if game is not null
  const isValidGame = (game: Game | null): game is Game => {
    return game !== null;
  };
  
  return {
    isValidGame
  };
};
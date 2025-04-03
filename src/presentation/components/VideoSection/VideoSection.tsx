import React from 'react';
import { Game } from '../../../domain/entities/Game';
import { useVideoSection } from './useVideoSection';

interface VideoSectionProps {
  game: Game | null;
}

/**
 * Component for displaying the video section of a game (not working yet)
 */
export const VideoSection: React.FC<VideoSectionProps> = ({ game }) => {
  const { isValidGame } = useVideoSection();

  if (!isValidGame(game)) {
    return (
      <div className="w-full h-96 bg-gray-800 flex items-center justify-center rounded-lg overflow-hidden">
        <p className="text-gray-400 text-xl">
          Sélectionnez un jeu pour voir sa vidéo
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative pb-9/16 h-96">
        <video
          src={game.videoUrl}
          poster={game.imageUrl}
          controls
          className="absolute inset-0 w-full h-full object-cover"
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
      <div className="p-4 bg-gradient-to-t from-gray-900 to-gray-800">
        <h2 className="text-2xl font-bold text-white">{game.title}</h2>
        <p className="text-gray-300 mt-2">{game.description}</p>
      </div>
    </div>
  );
};

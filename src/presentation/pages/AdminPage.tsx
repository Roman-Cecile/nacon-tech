import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Game, Platform } from '../../domain/entities/Game';
import { GameItemsList } from '../components/GameItems/GameItemsList';
import { PromotionSection } from '../components/Promotions/PromotionSection';

export const AdminPage: React.FC = () => {
  const { games, loading, error, updateGamePromotion } = useGameContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
  };

  const getPlatformBadgeColor = (platform: Platform) => {
    switch (platform) {
      case Platform.PC:
        return 'bg-blue-600';
      case Platform.PLAYSTATION:
        return 'bg-indigo-600';
      case Platform.XBOX:
        return 'bg-green-600';
      case Platform.SWITCH:
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="text-gray-400 mt-4">Chargement des jeux...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-500 text-white p-4 rounded-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">
          Administration des jeux
        </h1>
        <div className="flex items-center">
          <span className="text-gray-300 mr-4">
            Connecté en tant que {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Liste des jeux */}
        <div className="md:w-1/3 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white mb-4">Liste des jeux</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {games.map((game) => (
              <div
                key={game.id}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  selectedGame?.id === game.id
                    ? 'bg-purple-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => handleSelectGame(game)}
              >
                <div className="flex items-center">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-16 h-16 object-cover rounded mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-white">{game.title}</h3>
                    <p className="text-gray-400 text-sm">{game.genre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détails du jeu sélectionné */}
        <div className="md:w-2/3 bg-gray-800 rounded-lg p-4">
          {selectedGame ? (
            <div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-white">Détails du jeu</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedGame.imageUrl}
                    alt={selectedGame.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {selectedGame.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {selectedGame.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-400 mb-1">ID</h4>
                    <p className="text-white">{selectedGame.id}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Genre</h4>
                    <p className="text-white">{selectedGame.genre}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Éditeur</h4>
                    <p className="text-white">{selectedGame.publisher}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Date de sortie</h4>
                    <p className="text-white">{selectedGame.releaseDate}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 mb-1">Plateformes</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedGame.platforms.map((platform) => (
                        <span
                          key={platform}
                          className={`${getPlatformBadgeColor(
                            platform
                          )} text-white text-xs px-2 py-1 rounded`}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Section des items du jeu */}
              <GameItemsList items={selectedGame.items} />
              {/* Section des promotions */}
              <PromotionSection
                selectedGame={selectedGame}
                updateGamePromotion={updateGamePromotion}
                onGameUpdate={setSelectedGame}
              />

              <div className="mt-6">
                <h4 className="text-gray-400 mb-2">Vidéo du jeu</h4>
                <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
                  <video
                    src={selectedGame.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    poster={selectedGame.imageUrl}
                  ></video>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-400">
                Sélectionnez un jeu pour voir ses détails
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

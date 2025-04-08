import React from 'react';
import { Game, Promotion } from '../../../domain/entities/Game';
import { usePromotion } from './usePromotion';

interface PromotionSectionProps {
  selectedGame: Game | null;
  updateGamePromotion: (
    gameId: string,
    promotion: Promotion | null
  ) => Promise<void>;
  onGameUpdate?: (updatedGame: Game) => void;
}

export const PromotionSection: React.FC<PromotionSectionProps> = ({
  selectedGame,
  updateGamePromotion,
  onGameUpdate,
}) => {
  const {
    isEditingPromotion,
    promotionForm,
    formError,
    handleEditPromotion,
    handleCancelEdit,
    handlePromotionChange,
    handleRemovePromotion,
    handleSavePromotion,
  } = usePromotion({
    selectedGame,
    updateGamePromotion,
    onGameUpdate,
  });

  if (!selectedGame) return null;

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h4 className="text-gray-400 mb-2">Promotion</h4>
        {!isEditingPromotion && (
          <button
            onClick={handleEditPromotion}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded-md transition-colors"
          >
            {selectedGame.promotion ? 'Modifier' : 'Ajouter'}
          </button>
        )}
      </div>

      {isEditingPromotion ? (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h5 className="text-white font-medium mb-3">
            Édition de la promotion
          </h5>

          {formError && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-2 rounded-md mb-4">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Nom de la promotion
              </label>
              <input
                type="text"
                name="name"
                value={promotionForm?.name || ''}
                onChange={handlePromotionChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Pourcentage de réduction
              </label>
              <input
                type="number"
                name="discountPercentage"
                min="1"
                max="100"
                value={promotionForm?.discountPercentage || ''}
                onChange={handlePromotionChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Date de début
              </label>
              <input
                type="date"
                name="startDate"
                value={promotionForm?.startDate || ''}
                onChange={handlePromotionChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">
                Date de fin
              </label>
              <input
                type="date"
                name="endDate"
                value={promotionForm?.endDate || ''}
                onChange={handlePromotionChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRecurring"
                name="isRecurring"
                checked={promotionForm?.isRecurring || false}
                onChange={handlePromotionChange}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
              />
              <label htmlFor="isRecurring" className="text-gray-300">
                Promotion récurrente
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              {selectedGame.promotion && (
                <button
                  onClick={handleRemovePromotion}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors mr-2"
                >
                  Supprimer la promotion
                </button>
              )}
            </div>
            <div>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-colors mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleSavePromotion}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {selectedGame.promotion ? (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Nom:</p>
                  <p className="text-white">
                    {selectedGame.promotion.name || 'Sans nom'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Réduction:</p>
                  <p className="text-white">
                    {selectedGame.promotion.discountPercentage || 0}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Période:</p>
                  <p className="text-white">
                    Du{' '}
                    {new Date(
                      selectedGame.promotion.startDate
                    ).toLocaleDateString()}{' '}
                    au{' '}
                    {new Date(
                      selectedGame.promotion.endDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Type:</p>
                  <p className="text-white">
                    {selectedGame.promotion.isRecurring
                      ? 'Récurrente'
                      : 'Unique'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Aucune promotion active pour ce jeu</p>
          )}
        </div>
      )}
    </div>
  );
};

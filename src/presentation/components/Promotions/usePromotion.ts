import { useEffect, useState } from 'react';
import { Game, Promotion } from '../../../domain/entities/Game';

interface UsePromotionProps {
  selectedGame: Game | null;
  updateGamePromotion: (gameId: string, promotion: Promotion | null) => Promise<void>;
  onGameUpdate?: (updatedGame: Game) => void;
}

export const usePromotion = ({
  selectedGame,
  updateGamePromotion,
  onGameUpdate,
}: UsePromotionProps) => {
  const [isEditingPromotion, setIsEditingPromotion] = useState(false);
  const [promotionForm, setPromotionForm] = useState<Promotion | null>(
    selectedGame?.promotion || null
  );
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
      const resetPromotionForm = () => {
        setPromotionForm(selectedGame?.promotion || null);
        setIsEditingPromotion(false);
        setFormError(null);
      };
    resetPromotionForm();
  }, [selectedGame?.id]);

  const handleEditPromotion = () => {
    if (selectedGame) {
      const newPromotion: Promotion = {
        id: `promo-${selectedGame.id}`,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        isRecurring: false,
        discountPercentage: 10,
        name: 'Nouvelle promotion',
      };
      setPromotionForm(selectedGame.promotion || newPromotion);
      setIsEditingPromotion(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingPromotion(false);
    setFormError(null);
  };

  const handlePromotionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (!promotionForm) return;

    setPromotionForm((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]:
          type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : type === 'number'
            ? parseInt(value, 10)
            : value,
      };
    });
  };

  const handleRemovePromotion = async () => {
    if (!selectedGame) return;

    try {
      await updateGamePromotion(selectedGame.id, null);
      
      // Update the selected game with the removed promotion
      const updatedGame = { ...selectedGame, promotion: null };
      if (onGameUpdate) {
        onGameUpdate(updatedGame);
      }
      
      setIsEditingPromotion(false);
      setPromotionForm(null);
    } catch (err) {
      setFormError('Erreur lors de la suppression de la promotion');
    }
  };

  const handleSavePromotion = async () => {
    if (!selectedGame || !promotionForm) return;

    const startDate = new Date(promotionForm.startDate);
    const endDate = new Date(promotionForm.endDate);
    
    // Validation
    if (endDate <= startDate) {
      setFormError('La date de fin doit être postérieure à la date de début');
      return;
    }

    if (!promotionForm.name || promotionForm.name.trim() === '') {
      setFormError('Le nom de la promotion est requis');
      return;
    }

    if (
      promotionForm.discountPercentage !== undefined &&
      (promotionForm.discountPercentage <= 0 ||
        promotionForm.discountPercentage > 100)
    ) {
      setFormError('Le pourcentage de réduction doit être entre 1 et 100');
      return;
    }

    try {
      await updateGamePromotion(selectedGame.id, promotionForm);
      
      // Update the selected game with the new promotion
      const updatedGame = { ...selectedGame, promotion: promotionForm };
      if (onGameUpdate) {
        onGameUpdate(updatedGame);
      }
      
      setIsEditingPromotion(false);
      setFormError(null);
    } catch (err) {
      setFormError('Erreur lors de la sauvegarde de la promotion');
    }
  };

  return {
    isEditingPromotion,
    promotionForm,
    formError,
    handleEditPromotion,
    handleCancelEdit,
    handlePromotionChange,
    handleRemovePromotion,
    handleSavePromotion,
  };
};
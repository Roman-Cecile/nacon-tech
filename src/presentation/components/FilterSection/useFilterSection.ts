import { Platform } from '../../../domain/entities/Game';

interface UseFilterSectionProps {
  selectedPlatform: Platform | null;
  searchQuery: string;
  filterGamesByPlatform: (platform: Platform) => Promise<void>;
  getGamesByTitle: (query: string) => Promise<void>;
  resetFilters: () => Promise<void>;
}

export const useFilterSection = ({
  selectedPlatform,
  searchQuery,
  filterGamesByPlatform,
  getGamesByTitle,
  resetFilters,
}: UseFilterSectionProps) => {
  // Gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getGamesByTitle(searchQuery);
  };

  // Gérer le changement de plateforme
  const handlePlatformChange = (platform: Platform) => {
    if (selectedPlatform === platform) {
      resetFilters();
    } else {
      filterGamesByPlatform(platform);
    }
  };

  return {
    handleSearchSubmit,
    handlePlatformChange,
  };
};
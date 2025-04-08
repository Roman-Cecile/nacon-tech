import { Platform, Promotion } from '../../../domain/entities/Game';

interface UseGameCardProps {
  onSelect: (gameId: string) => void;
}

export const useGameCard = ({ onSelect }: UseGameCardProps) => {
  // Function to display available platforms
  const renderPlatforms = (platforms: Platform[]) => {
    return (
      <div className="flex space-x-2 mt-2">
        {platforms.map((platform) => {
          let bgColor = '';
          switch (platform) {
            case Platform.PC:
              bgColor = 'bg-blue-600';
              break;
            case Platform.PLAYSTATION:
              bgColor = 'bg-indigo-600';
              break;
            case Platform.XBOX:
              bgColor = 'bg-green-600';
              break;
            case Platform.SWITCH:
              bgColor = 'bg-red-600';
              break;
            default:
              bgColor = 'bg-gray-600';
          }
          return (
            <span
              key={platform}
              className={`${bgColor} text-xs font-semibold px-2 py-1 rounded-full text-white`}
            >
              {platform}
            </span>
          );
        })}
      </div>
    );
  };

  const handleSelectGame = (gameId: string) => {
    onSelect(gameId);
  };

  /**
   * Checks if a promotion is currently active
   */
  const isPromotionActive = (promotion: Promotion): boolean => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    console.log(now >= startDate && now <= endDate);
    console.log({ now, startDate, endDate });

    return now >= startDate && now <= endDate;
  };

  return {
    renderPlatforms,
    handleSelectGame,
    isPromotionActive,
  };
};

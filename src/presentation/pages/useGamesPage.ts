import { useState } from "react";

type ViewMode = 'grid' | 'carousel';

export const useGamesPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const toggleViewMode = () => {
        setViewMode(viewMode === 'grid' ? 'carousel' : 'grid');
      };
    return {
        viewMode,
        toggleViewMode
    }
}
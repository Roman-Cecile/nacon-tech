import { useState, useEffect, useCallback, useRef } from 'react';
import { Game } from '../../../domain/entities/Game';

interface UseGameGridProps {
  games: Game[];
  onLoadMore?: () => Promise<void>;
}

export const useGameGrid = ({
  games,
  onLoadMore
}: UseGameGridProps) => {
  const hasGames = games.length > 0;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastGameElementRef = useRef<HTMLDivElement | null>(null);
  
  const handleObserver = useCallback(async (entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && onLoadMore && !isLoadingMore) {
      setIsLoadingMore(true);
      await onLoadMore();
      setIsLoadingMore(false);
    }
  }, [onLoadMore, isLoadingMore]);
  
  useEffect(() => {
    if (lastGameElementRef.current) {
      observer.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '20px',
        threshold: 0.1
      });
      observer.current.observe(lastGameElementRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleObserver, games]);
  
  return {
    hasGames,
    isLoadingMore,
    lastGameElementRef
  };
};
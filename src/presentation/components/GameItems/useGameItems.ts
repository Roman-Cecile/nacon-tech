import { useState, useEffect, useCallback, useRef } from 'react';
import { Item } from '../../../domain/entities/Game';

interface UseGameItemsProps {
  items: Item[];
  itemsPerPage: number;
}

export const useGameItems = ({ items, itemsPerPage }: UseGameItemsProps) => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemElementRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize displayed items
  useEffect(() => {
    if (items && items.length > 0) {
      const initialItems = items.slice(0, itemsPerPage);
      setDisplayedItems(initialItems);
      setHasMoreItems(items.length > itemsPerPage);
      setCurrentPage(1);
    } else {
      setDisplayedItems([]);
      setHasMoreItems(false);
    }
  }, [items, itemsPerPage]);
  
  // Load more items function
  const loadMoreItems = useCallback(() => {
    if (!hasMoreItems || isLoadingMore || !items) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = items.slice(startIndex, endIndex);
      
      if (newItems.length > 0) {
        setDisplayedItems(prevItems => [...prevItems, ...newItems]);
        setCurrentPage(nextPage);
        setHasMoreItems(endIndex < items.length);
      } else {
        setHasMoreItems(false);
      }
      
      setIsLoadingMore(false);
    }, 300);
  }, [currentPage, hasMoreItems, isLoadingMore, items, itemsPerPage]);
  
  // Intersection observer for infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMoreItems && !isLoadingMore) {
      loadMoreItems();
    }
  }, [loadMoreItems, hasMoreItems, isLoadingMore]);
  
  useEffect(() => {
    if (lastItemElementRef.current) {
      observer.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      });
      observer.current.observe(lastItemElementRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [handleObserver]);
  
  return {
    displayedItems,
    isLoadingMore,
    lastItemElementRef,
    loadMoreItems
  };
};
import { renderHook, act } from '@testing-library/react';
import { useGameCarousel } from '../useGameCarousel';
import { Game, Platform } from '../../../../domain/entities/Game';

describe('useGameCarousel', () => {
  const mockGames: Game[] = [
    {
      id: '1',
      title: 'Game 1',
      description: 'Description 1',
      imageUrl: 'image1.jpg',
      videoUrl: 'video1.mp4',
      platforms: [Platform.PC],
      releaseDate: '2023-01-01',
      publisher: 'Publisher 1',
      genre: 'Genre 1'
    },
    {
      id: '2',
      title: 'Game 2',
      description: 'Description 2',
      imageUrl: 'image2.jpg',
      videoUrl: 'video2.mp4',
      platforms: [Platform.PLAYSTATION],
      releaseDate: '2023-02-01',
      publisher: 'Publisher 2',
      genre: 'Genre 2'
    },
    {
      id: '3',
      title: 'Game 3',
      description: 'Description 3',
      imageUrl: 'image3.jpg',
      videoUrl: 'video3.mp4',
      platforms: [Platform.XBOX],
      releaseDate: '2023-03-01',
      publisher: 'Publisher 3',
      genre: 'Genre 3'
    }
  ];

  test('should initialize with currentIndex as 0', () => {
    const { result } = renderHook(() => useGameCarousel({ games: mockGames }));
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.hasGames).toBe(true);
  });

  test('should handle nextSlide correctly', () => {
    const { result } = renderHook(() => useGameCarousel({ games: mockGames }));
    
    act(() => {
      result.current.nextSlide();
    });
    
    expect(result.current.currentIndex).toBe(1);
    
    act(() => {
      result.current.nextSlide();
    });
    
    expect(result.current.currentIndex).toBe(2);
    
    act(() => {
      result.current.nextSlide();
    });
    
    // Should loop back to the first game
    expect(result.current.currentIndex).toBe(0);
  });

  test('should handle prevSlide correctly', () => {
    const { result } = renderHook(() => useGameCarousel({ games: mockGames }));
    
    act(() => {
      result.current.prevSlide();
    });
    
    // Should go to the last game when prevSlide is called from the first game
    expect(result.current.currentIndex).toBe(2);
    
    act(() => {
      result.current.prevSlide();
    });
    
    expect(result.current.currentIndex).toBe(1);
    
    act(() => {
      result.current.prevSlide();
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

  test('should handle goToSlide correctly', () => {
    const { result } = renderHook(() => useGameCarousel({ games: mockGames }));
    
    act(() => {
      result.current.goToSlide(2);
    });
    
    expect(result.current.currentIndex).toBe(2);
    
    act(() => {
      result.current.goToSlide(0);
    });
    
    expect(result.current.currentIndex).toBe(0);
  });

});
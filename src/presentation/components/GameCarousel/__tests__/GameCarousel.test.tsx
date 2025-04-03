import { render, screen, fireEvent } from '@testing-library/react';

import { GameCarousel } from '../GameCarousel';
import { Game, Platform } from '../../../../domain/entities/Game';

jest.mock('../useGameCarousel', () => {
  const mockNextSlide = jest.fn();
  const mockPrevSlide = jest.fn();
  const mockGoToSlide = jest.fn();

  return {
    useGameCarousel: jest.fn(({ games }) => ({
      currentIndex: 0,
      hasGames: games.length > 0,
      nextSlide: mockNextSlide,
      prevSlide: mockPrevSlide,
      goToSlide: mockGoToSlide,
    })),
  };
});

describe('GameCarousel', () => {
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
      genre: 'Genre 1',
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
      genre: 'Genre 2',
    },
  ];

  const mockOnSelectGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    render(
      <GameCarousel
        games={mockGames}
        loading={true}
        error={null}
        onSelectGame={mockOnSelectGame}
      />
    );

    expect(screen.getByTestId('loading-spinner')).toBeTruthy();
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Error loading games';

    render(
      <GameCarousel
        games={mockGames}
        loading={false}
        error={errorMessage}
        onSelectGame={mockOnSelectGame}
      />
    );

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  test('renders empty state correctly', () => {
    render(
      <GameCarousel
        games={[]}
        loading={false}
        error={null}
        onSelectGame={mockOnSelectGame}
      />
    );

    expect(screen.getByText('Aucun jeu trouvé')).toBeTruthy();
  });

  test('renders carousel with games correctly', () => {
    render(
      <GameCarousel
        games={mockGames}
        loading={false}
        error={null}
        onSelectGame={mockOnSelectGame}
      />
    );

    // Check if the first game is rendered
    expect(screen.getByText('Game 1')).toBeTruthy();

    // Check if navigation buttons are rendered
    expect(screen.getByLabelText('Previous slide')).toBeTruthy();
    expect(screen.getByLabelText('Next slide')).toBeTruthy();

    // Check if pagination indicators are rendered (one for each game)
    const paginationButtons = screen
      .getAllByRole('button')
      .filter((button) =>
        button.getAttribute('aria-label')?.startsWith('Go to slide')
      );
    expect(paginationButtons).toHaveLength(mockGames.length);
  });

  test('navigation buttons trigger slide changes', () => {
    const useGameCarouselModule = require('../useGameCarousel');
    const mockHook = useGameCarouselModule.useGameCarousel;

    const mockNextSlide = jest.fn();
    const mockPrevSlide = jest.fn();

    mockHook.mockImplementation(() => ({
      currentIndex: 0,
      hasGames: true,
      nextSlide: mockNextSlide,
      prevSlide: mockPrevSlide,
      goToSlide: jest.fn(),
    }));

    render(
      <GameCarousel
        games={mockGames}
        loading={false}
        error={null}
        onSelectGame={mockOnSelectGame}
      />
    );

    // Click next button
    fireEvent.click(screen.getByLabelText('Next slide'));
    expect(mockNextSlide).toHaveBeenCalled();

    // Click previous button
    fireEvent.click(screen.getByLabelText('Previous slide'));
    expect(mockPrevSlide).toHaveBeenCalled();
  });

  test('pagination indicators trigger goToSlide', () => {
    const useGameCarouselModule = require('../useGameCarousel');
    const mockHook = useGameCarouselModule.useGameCarousel;

    const mockGoToSlide = jest.fn();

    mockHook.mockImplementation(() => ({
      currentIndex: 0,
      hasGames: true,
      nextSlide: jest.fn(),
      prevSlide: jest.fn(),
      goToSlide: mockGoToSlide,
    }));

    render(
      <GameCarousel
        games={mockGames}
        loading={false}
        error={null}
        onSelectGame={mockOnSelectGame}
      />
    );

    // Click on the second pagination indicator
    const paginationButtons = screen
      .getAllByRole('button')
      .filter((button) =>
        button.getAttribute('aria-label')?.startsWith('Go to slide')
      );
    fireEvent.click(paginationButtons[1]);

    expect(mockGoToSlide).toHaveBeenCalledWith(1);
  });
});

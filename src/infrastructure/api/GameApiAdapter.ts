import { Game, Platform } from '../../domain/entities/Game';
import { GameUseCases } from '../../domain/usecases/GameUseCases';
import { MockGameRepository } from '../../data/repositories/MockGameRepository';

/**
 * Adapter for the GameUseCases interface that simulates an API request
 * using a mock repository
 */
export class GameApiAdapter implements GameUseCases {
  private mockRepository: MockGameRepository;

  constructor() {
    this.mockRepository = new MockGameRepository();
  }

  /**
   * Simulates an API request to get all games
   */
  async getAllGames(): Promise<Game[]> {
    try {
      const games = await this.mockRepository.getAllGames();
      return games;
    } catch (error) {
      console.error('Error fetching all games', error);
      throw error;
    }
  }

  /**
   * Simulates an API request to get a game by ID
   * @param id Game ID to fetch detail
   */
  async getGameById(id: string): Promise<Game | null> {
    try {
      const game = await this.mockRepository.getGameById(id);
      return game;
    } catch (error) {
      console.error(`Error fetching game : ${id}:`, error);
      throw error;
    }
  }

  /**
   * Simulates an API request to get games by platform
   * @param platform Platform to filter games
   */
  async getGamesByPlatform(platform: Platform): Promise<Game[]> {
    try {
      const games = await this.mockRepository.getGamesByPlatform(platform);
      return games;
    } catch (error) {
      console.error(`Error fetching games for platform ${platform}:`, error);
      throw error;
    }
  }

  /**
   * Simulates an API request to search games
   * @param query Search query
   */
  async getGamesByTitle(query: string): Promise<Game[]> {
    try {
      const games = await this.mockRepository.getGamesByTitle(query);
      return games;
    } catch (error) {
      console.error(`Error in getGamesByTitle(), query: "${query}":`, error);
      throw error;
    }
  }
}
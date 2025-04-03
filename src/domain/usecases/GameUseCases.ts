/**
 * Interface defining the use cases for games
 */
import { Game, Platform } from '../entities/Game';

export interface GameUseCases {
  getAllGames(): Promise<Game[]>;
  getGameById(id: string): Promise<Game | null>;
  getGamesByPlatform(platform: Platform): Promise<Game[]>;
  getGamesByTitle(query: string): Promise<Game[]>;
}
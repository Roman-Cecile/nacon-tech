/**
 * Game entity representing a videogame
 */
export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  platforms: Platform[];
  releaseDate: string;
  publisher: string;
  genre: string;
}

/**
 * Enum representing the different supported platforms
 */
export enum Platform {
  PC = 'PC',
  PLAYSTATION = 'PlayStation',
  XBOX = 'Xbox',
  SWITCH = 'Switch'
}
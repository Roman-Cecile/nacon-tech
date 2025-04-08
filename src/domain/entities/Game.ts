/**
 * Item entity representing an in-game item
 */
export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  imageUrl?: string;
  stats: ItemStat[];
}

/**
 * Item statistic
 */
export interface ItemStat {
  name: string;
  value: number;
  maxValue?: number;
}

/**
 * Enum representing different item types
 */
export enum ItemType {
  WEAPON = 'Arme',
  VEHICLE = 'Véhicule',
  ARMOR = 'Armure',
  CONSUMABLE = 'Consommable',
  ACCESSORY = 'Accessoire'
}

/**
 * Promotion entity representing a promotional period for a game
 */
export interface Promotion {
  id: string;
  startDate: string;
  endDate: string;
  isRecurring: boolean;
  discountPercentage?: number;
  name?: string;
}

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
  items?: Item[];
  promotion: Promotion | null;
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
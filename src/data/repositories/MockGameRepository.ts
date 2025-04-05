import { Game, Platform } from '../../domain/entities/Game';
import { GameUseCases } from '../../domain/usecases/GameUseCases';

// Mock data for games
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Horizon Adventure',
    description: "Un jeu d'aventure épique dans un monde ouvert rempli de mystères et de créatures fantastiques.",
    imageUrl: '/images/game1.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX],
    releaseDate: '2023-05-15',
    publisher: 'Nacon Studios',
    genre: 'Aventure'
  },
  {
    id: '2',
    title: 'Speed Racers',
    description: 'Course automobile intense avec des véhicules personnalisables et des circuits à travers le monde.',
    imageUrl: '/images/game2.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX, Platform.SWITCH],
    releaseDate: '2023-08-22',
    publisher: 'Nacon Racing',
    genre: 'Course'
  },
  {
    id: '3',
    title: 'Tactical Force',
    description: "Jeu de tir tactique où la stratégie et la coordination d'équipe sont essentielles pour réussir les missions.",
    imageUrl: '/images/game3.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.XBOX],
    releaseDate: '2023-11-10',
    publisher: 'Nacon Interactive',
    genre: 'FPS'
  },
  {
    id: '4',
    title: 'Fantasy Quest',
    description: 'Plongez dans un univers médiéval fantastique riche en quêtes, en personnages et en créatures mythiques.',
    imageUrl: '/images/game4.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.SWITCH],
    releaseDate: '2024-01-30',
    publisher: 'Nacon RPG',
    genre: 'RPG'
  },
  {
    id: '5',
    title: 'Survival Island',
    description: 'Survivez sur une île hostile en gérant vos ressources et en construisant votre abri contre les dangers.',
    imageUrl: '/images/game5.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.XBOX, Platform.PLAYSTATION],
    releaseDate: '2024-03-18',
    publisher: 'Nacon Survival',
    genre: 'Survie'
  },
  {
    id: '6',
    title: 'Sports Champions',
    description: 'Compétition sportive multidisciplinaire avec des modes carrière et multijoueur.',
    imageUrl: '/images/game6.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PLAYSTATION, Platform.SWITCH],
    releaseDate: '2023-07-05',
    publisher: 'Nacon Sports',
    genre: 'Sport'
  },
  {
    id: '7',
    title: 'Mystic Quest',
    description: 'Découvrez un monde mystérieux avec des quêtes et des ennemis surnaturels.',
    imageUrl: '/images/game7.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX],
    releaseDate: '2023-09-20',
    publisher: 'Nacon Mystery',
    genre: 'Aventure'
  },
  {
    id: '8',
    title: 'Cyber Nexus',
    description: 'Un jeu de rôle cyberpunk dans un futur dystopique où la technologie a pris le contrôle.',
    imageUrl: '/images/game8.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION],
    releaseDate: '2023-10-12',
    publisher: 'Nacon Future',
    genre: 'RPG'
  },
  {
    id: '9',
    title: 'Medieval Dynasty',
    description: 'Construisez votre propre héritage dans un monde médiéval réaliste avec des systèmes de survie et de gestion.',
    imageUrl: '/images/game9.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.XBOX],
    releaseDate: '2023-12-05',
    publisher: 'Nacon History',
    genre: 'Simulation'
  },
  {
    id: '10',
    title: 'Ocean Explorer',
    description: 'Plongez dans les profondeurs de l\'océan et découvrez des créatures mystérieuses et des trésors cachés.',
    imageUrl: '/images/game10.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.SWITCH],
    releaseDate: '2024-02-18',
    publisher: 'Nacon Discovery',
    genre: 'Aventure'
  },
  {
    id: '11',
    title: 'Space Pioneers',
    description: 'Explorez l\'univers, colonisez des planètes et développez votre empire spatial.',
    imageUrl: '/images/game11.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX],
    releaseDate: '2024-04-22',
    publisher: 'Nacon Space',
    genre: 'Stratégie'
  },
  {
    id: '12',
    title: 'Zombie Outbreak',
    description: 'Survivez à une apocalypse zombie en gérant vos ressources et en protégeant votre groupe de survivants.',
    imageUrl: '/images/game12.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.XBOX],
    releaseDate: '2023-11-30',
    publisher: 'Nacon Horror',
    genre: 'Survie'
  },
  {
    id: '13',
    title: 'Racing Legends',
    description: 'Pilotez les voitures les plus emblématiques de l\'histoire sur des circuits légendaires.',
    imageUrl: '/images/game13.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX],
    releaseDate: '2024-01-15',
    publisher: 'Nacon Racing',
    genre: 'Course'
  },
  {
    id: '14',
    title: 'Puzzle Masters',
    description: 'Résolvez des énigmes complexes dans un monde coloré et plein de défis.',
    imageUrl: '/images/game14.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.SWITCH],
    releaseDate: '2023-08-08',
    publisher: 'Nacon Puzzle',
    genre: 'Réflexion'
  },
  {
    id: '15',
    title: 'Ancient Kingdoms',
    description: 'Bâtissez votre royaume, formez des alliances et conquérez vos ennemis dans ce jeu de stratégie historique.',
    imageUrl: '/images/game15.jpg',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION],
    releaseDate: '2024-03-05',
    publisher: 'Nacon Strategy',
    genre: 'Stratégie'
  }
];

/**
 * Class implementing the GameUseCases interface with simulated data
 */
export class MockGameRepository implements GameUseCases {
  private baseUrl: string = 'https://api.nacon.com/games'; // fake url
  
  async getAllGames(): Promise<Game[]> {
    console.log(`GET ${this.baseUrl}`);
    // Simulates network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGames;
  }
  
  async getGameById(id: string): Promise<Game | null> {
    console.log(`GET ${this.baseUrl}/${id}`);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const game = mockGames.find(game => game.id === id);
    return game || null;
  }
  
  async getGamesByPlatform(platform: Platform): Promise<Game[]> {
    console.log(`GET ${this.baseUrl}?platform=${platform}`);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockGames.filter(game => game.platforms.includes(platform));
  }
  
  async getGamesByTitle(query: string): Promise<Game[]> {
    console.log(`GET ${this.baseUrl}?search=${query}`);
    await new Promise(resolve => setTimeout(resolve, 350));
    const lowercaseQuery = query.toLowerCase();
    return mockGames.filter(game => 
      game.title.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  /**
   * Get games with pagination support
   * @param page Page number (starting from 1)
   * @param limit Number of items per page
   */
  async getGamesPaginated(page: number = 1, limit: number = 6): Promise<Game[]> {
    console.log(`GET ${this.baseUrl}?page=${page}&limit=${limit}`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return mockGames.slice(startIndex, endIndex);
  }
}
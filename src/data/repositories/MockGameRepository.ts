import { Game, Platform, Item, ItemType, ItemStat } from '../../domain/entities/Game';
import { GameUseCases } from '../../domain/usecases/GameUseCases';

// Mock items for different game types
const weaponItems: Item[] = [
  {
    id: 'w1',
    name: 'Fusil d\'assaut tactique',
    description: 'Arme polyvalente avec une bonne cadence de tir et précision',
    type: ItemType.WEAPON,
    imageUrl: './src/assets/tactical-rifle.png',
    stats: [
      { name: 'Dégâts', value: 45, maxValue: 100 },
      { name: 'Précision', value: 75, maxValue: 100 },
      { name: 'Cadence', value: 65, maxValue: 100 },
      { name: 'Portée', value: 70, maxValue: 100 }
    ]
  },
  {
    id: 'w2',
    name: 'Sniper de précision',
    description: 'Fusil à longue portée pour éliminer les ennemis à distance',
    type: ItemType.WEAPON,
    imageUrl: './src/assets/sniper-rifle.png',
    stats: [
      { name: 'Dégâts', value: 95, maxValue: 100 },
      { name: 'Précision', value: 90, maxValue: 100 },
      { name: 'Cadence', value: 15, maxValue: 100 },
      { name: 'Portée', value: 100, maxValue: 100 }
    ]
  },
  {
    id: 'w3',
    name: 'Pistolet de service',
    description: 'Arme de poing fiable pour les situations d\'urgence',
    type: ItemType.WEAPON,
    imageUrl: './src/assets/pistol.png',
    stats: [
      { name: 'Dégâts', value: 30, maxValue: 100 },
      { name: 'Précision', value: 60, maxValue: 100 },
      { name: 'Cadence', value: 40, maxValue: 100 },
      { name: 'Portée', value: 25, maxValue: 100 }
    ]
  }
];

const vehicleItems: Item[] = [
  {
    id: 'v1',
    name: 'Supercar GT',
    description: 'Voiture de sport haute performance avec une vitesse maximale impressionnante',
    type: ItemType.VEHICLE,
    imageUrl: './src/assets/supercar.png',
    stats: [
      { name: 'Vitesse', value: 95, maxValue: 100 },
      { name: 'Accélération', value: 90, maxValue: 100 },
      { name: 'Maniabilité', value: 75, maxValue: 100 },
      { name: 'Freinage', value: 80, maxValue: 100 }
    ]
  },
  {
    id: 'v2',
    name: '4x4 Tout-terrain',
    description: 'Véhicule robuste capable de traverser tous types de terrains',
    type: ItemType.VEHICLE,
    imageUrl: './src/assets/offroad.png',
    stats: [
      { name: 'Vitesse', value: 60, maxValue: 100 },
      { name: 'Accélération', value: 50, maxValue: 100 },
      { name: 'Maniabilité', value: 65, maxValue: 100 },
      { name: 'Tout-terrain', value: 95, maxValue: 100 }
    ]
  },
  {
    id: 'v3',
    name: 'Moto de course',
    description: 'Moto légère et rapide pour les circuits',
    type: ItemType.VEHICLE,
    imageUrl: './src/assets/racing-bike.png',
    stats: [
      { name: 'Vitesse', value: 90, maxValue: 100 },
      { name: 'Accélération', value: 95, maxValue: 100 },
      { name: 'Maniabilité', value: 85, maxValue: 100 },
      { name: 'Freinage', value: 70, maxValue: 100 }
    ]
  }
];

const rpgItems: Item[] = [
  {
    id: 'r1',
    name: 'Épée légendaire',
    description: 'Une épée forgée par les anciens, imprégnée de magie puissante',
    type: ItemType.WEAPON,
    imageUrl: './src/assets/legendary-sword.png',
    stats: [
      { name: 'Dégâts', value: 85, maxValue: 100 },
      { name: 'Vitesse', value: 60, maxValue: 100 },
      { name: 'Critique', value: 75, maxValue: 100 },
      { name: 'Magie', value: 90, maxValue: 100 }
    ]
  },
  {
    id: 'r2',
    name: 'Armure de dragon',
    description: 'Armure forgée à partir d\'écailles de dragon, offrant une protection exceptionnelle',
    type: ItemType.ARMOR,
    imageUrl: './src/assets/dragon-armor.png',
    stats: [
      { name: 'Défense', value: 90, maxValue: 100 },
      { name: 'Résistance magique', value: 85, maxValue: 100 },
      { name: 'Durabilité', value: 95, maxValue: 100 },
      { name: 'Poids', value: 70, maxValue: 100 }
    ]
  },
  {
    id: 'r3',
    name: 'Amulette de vie',
    description: 'Un artefact ancien qui augmente la vitalité de son porteur',
    type: ItemType.ACCESSORY,
    imageUrl: './src/assets/life-amulet.png',
    stats: [
      { name: 'Santé', value: 80, maxValue: 100 },
      { name: 'Régénération', value: 75, maxValue: 100 },
      { name: 'Protection', value: 50, maxValue: 100 },
      { name: 'Chance', value: 60, maxValue: 100 }
    ]
  }
];

const survivalItems: Item[] = [
  {
    id: 's1',
    name: 'Hache de survie',
    description: 'Outil polyvalent pour couper du bois et se défendre',
    type: ItemType.WEAPON,
    imageUrl: './src/assets/survival-axe.png',
    stats: [
      { name: 'Dégâts', value: 65, maxValue: 100 },
      { name: 'Durabilité', value: 80, maxValue: 100 },
      { name: 'Polyvalence', value: 90, maxValue: 100 },
      { name: 'Poids', value: 50, maxValue: 100 }
    ]
  },
  {
    id: 's2',
    name: 'Kit de premiers soins',
    description: 'Ensemble d\'équipements médicaux pour traiter les blessures',
    type: ItemType.CONSUMABLE,
    imageUrl: './src/assets/medkit.png',
    stats: [
      { name: 'Guérison', value: 75, maxValue: 100 },
      { name: 'Utilisations', value: 3, maxValue: 5 },
      { name: 'Efficacité', value: 80, maxValue: 100 },
      { name: 'Temps d\'utilisation', value: 60, maxValue: 100 }
    ]
  },
  {
    id: 's3',
    name: 'Sac à dos tactique',
    description: 'Sac à dos spacieux avec de nombreux compartiments',
    type: ItemType.ACCESSORY,
    imageUrl: './src/assets/tactical-backpack.png',
    stats: [
      { name: 'Capacité', value: 85, maxValue: 100 },
      { name: 'Durabilité', value: 90, maxValue: 100 },
      { name: 'Organisation', value: 75, maxValue: 100 },
      { name: 'Poids', value: 40, maxValue: 100 }
    ]
  }
];

const sportsItems: Item[] = [
  {
    id: 'sp1',
    name: 'Chaussures professionnelles',
    description: 'Chaussures de sport haute performance pour une meilleure agilité',
    type: ItemType.ACCESSORY,
    imageUrl: './src/assets/pro-shoes.png',
    stats: [
      { name: 'Vitesse', value: 85, maxValue: 100 },
      { name: 'Agilité', value: 90, maxValue: 100 },
      { name: 'Confort', value: 80, maxValue: 100 },
      { name: 'Durabilité', value: 75, maxValue: 100 }
    ]
  },
  {
    id: 'sp2',
    name: 'Ballon officiel',
    description: 'Ballon de compétition aux normes internationales',
    type: ItemType.ACCESSORY,
    imageUrl: './src/assets/official-ball.png',
    stats: [
      { name: 'Précision', value: 95, maxValue: 100 },
      { name: 'Rebond', value: 90, maxValue: 100 },
      { name: 'Durabilité', value: 85, maxValue: 100 },
      { name: 'Contrôle', value: 95, maxValue: 100 }
    ]
  }
];

// Mock data for games
const mockGames: Game[] = [
  {
    id: '1',
    title: 'Horizon Adventure',
    description: "Un jeu d'aventure épique dans un monde ouvert rempli de mystères et de créatures fantastiques.",
    imageUrl: "./src/assets/horizon-adventure.png",
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX],
    releaseDate: '2023-05-15',
    publisher: 'Nacon Studios',
    genre: 'Aventure',
    items: [
      rpgItems[0],
      rpgItems[2],
      {
        id: 'a1',
        name: 'Carte au trésor',
        description: 'Révèle l\'emplacement des trésors cachés dans le monde',
        type: ItemType.ACCESSORY,
        imageUrl: './src/assets/treasure-map.png',
        stats: [
          { name: 'Précision', value: 85, maxValue: 100 },
          { name: 'Portée', value: 70, maxValue: 100 },
          { name: 'Détail', value: 90, maxValue: 100 }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Speed Racers',
    description: 'Course automobile intense avec des véhicules personnalisables et des circuits à travers le monde.',
    imageUrl: "./src/assets/speed-racers.jpeg",
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.XBOX, Platform.SWITCH],
    releaseDate: '2023-08-22',
    publisher: 'Nacon Racing',
    genre: 'Course',
    items: [
      vehicleItems[0],
      vehicleItems[2],
      {
        id: 'c1',
        name: 'Turbo Boost',
        description: 'Système d\'amélioration temporaire de la vitesse',
        type: ItemType.ACCESSORY,
        imageUrl: './src/assets/turbo-boost.png',
        stats: [
          { name: 'Puissance', value: 95, maxValue: 100 },
          { name: 'Durée', value: 30, maxValue: 100 },
          { name: 'Recharge', value: 60, maxValue: 100 }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Tactical Force',
    description: "Jeu de tir tactique où la stratégie et la coordination d'équipe sont essentielles pour réussir les missions.",
    imageUrl: "./src/assets/tactical-force.jpeg",
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.XBOX],
    releaseDate: '2023-11-10',
    publisher: 'Nacon Interactive',
    genre: 'FPS',
    items: [
      weaponItems[0],
      weaponItems[1],
      weaponItems[2],
      {
        id: 'f1',
        name: 'Gilet pare-balles',
        description: 'Protection balistique avancée pour les situations de combat',
        type: ItemType.ARMOR,
        imageUrl: './src/assets/bulletproof-vest.png',
        stats: [
          { name: 'Protection', value: 85, maxValue: 100 },
          { name: 'Mobilité', value: 60, maxValue: 100 },
          { name: 'Durabilité', value: 75, maxValue: 100 }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Fantasy Quest',
    description: 'Plongez dans un univers médiéval fantastique riche en quêtes, en personnages et en créatures mythiques.',
    imageUrl: './src/assets/fantasy-quest.png',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.PLAYSTATION, Platform.SWITCH],
    releaseDate: '2024-01-30',
    publisher: 'Nacon RPG',
    genre: 'RPG',
    items: [
      rpgItems[0],
      rpgItems[1],
      rpgItems[2],
      {
        id: 'rp1',
        name: 'Grimoire ancien',
        description: 'Livre de sorts contenant des connaissances magiques oubliées',
        type: ItemType.ACCESSORY,
        imageUrl: './src/assets/ancient-grimoire.png',
        stats: [
          { name: 'Puissance magique', value: 90, maxValue: 100 },
          { name: 'Sagesse', value: 85, maxValue: 100 },
          { name: 'Mana', value: 95, maxValue: 100 }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Survival Island',
    description: 'Survivez sur une île hostile en gérant vos ressources et en construisant votre abri contre les dangers.',
    imageUrl: "./src/assets/survival-island.png",
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PC, Platform.XBOX, Platform.PLAYSTATION],
    releaseDate: '2024-03-18',
    publisher: 'Nacon Survival',
    genre: 'Survie',
    items: [
      survivalItems[0],
      survivalItems[1],
      survivalItems[2],
      {
        id: 'sv1',
        name: 'Tente de camping',
        description: 'Abri portable pour se protéger des éléments',
        type: ItemType.ACCESSORY,
        imageUrl: './src/assets/camping-tent.png',
        stats: [
          { name: 'Protection', value: 70, maxValue: 100 },
          { name: 'Isolation', value: 75, maxValue: 100 },
          { name: 'Facilité de montage', value: 65, maxValue: 100 },
          { name: 'Durabilité', value: 80, maxValue: 100 }
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Sports Champions',
    description: 'Compétition sportive multidisciplinaire avec des modes carrière et multijoueur.',
    imageUrl: './src/assets/sports-champions.png',
    videoUrl: 'https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.ia.mp4',
    platforms: [Platform.PLAYSTATION, Platform.SWITCH],
    releaseDate: '2023-07-05',
    publisher: 'Nacon Sports',
    genre: 'Sport',
    items: [
      sportsItems[0],
      sportsItems[1],
      {
        id: 'sp3',
        name: 'Équipement de protection',
        description: 'Ensemble de protections pour éviter les blessures',
        type: ItemType.ARMOR,
        imageUrl: './src/assets/protective-gear.png',
        stats: [
          { name: 'Protection', value: 85, maxValue: 100 },
          { name: 'Mobilité', value: 80, maxValue: 100 },
          { name: 'Confort', value: 75, maxValue: 100 },
          { name: 'Durabilité', value: 70, maxValue: 100 }
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'Mystic Quest',
    description: 'Découvrez un monde mystérieux avec des quêtes et des ennemis surnaturels.',
    imageUrl: './src/assets/mystic-quest.png',
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
    imageUrl: './src/assets/cyber-nexus.png',
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
    imageUrl: './src/assets/medieval-dynasty.png',
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
    imageUrl: './src/assets/ocean-explorer.png',
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
    imageUrl: './src/assets/space-pioneers.png',
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
    imageUrl: './src/assets/zombie-outbreak.png',
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
    imageUrl: './src/assets/racing-legends.png',
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
    imageUrl: './src/assets/puzzle-masters.png',
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
    imageUrl: './src/assets/ancient-kingdoms.png',
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
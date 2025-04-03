# Nacon LiveOps

## Aperçu du Projet

Ce projet est une boutique de jeux vidéo. Il permet de visualiser de différentes manières les items vendus.

L'application propose deux modes d'affichage principaux :
- **Vue en Grille** : Affiche les jeux dans un format structuré en grille
- **Vue en Carrousel** : Affiche un jeu à la fois avec des flèches de navigation

## Technologies Utilisées

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Architecture Clean (Domain-Driven Design)

## Prérequis

- Node.js (version 18 ou supérieure)
- npm

## Installation

1. Clonez le dépôt :
```bash
git clone <url-du-dépôt>
cd nacon-liveops
```
2. Installez les dépendances :
```bash
npm install
```
3. Lancez l'application :
```bash
npm run dev
```
L'application sera accessible à l'adresse http://localhost:5173 .

```
nacon-liveops/
├── public/            # Ressources statiques (images, vidéos)
├── src/
│   ├── assets/        # Ressources utilisées par l'application
│   ├── data/          # Couche de données (repositories)
│   ├── domain/        # Entités et cas d'utilisation
│   ├── infrastructure/# Adaptateurs d'API et services externes
│   ├── presentation/  # Composants React et logique UI
│   │   ├── components/# Composants réutilisables
│   │   ├── context/   # Contextes React
│   │   └── pages/     # Pages de l'application
│   ├── App.tsx        # Composant racine
│   └── main.tsx       # Point d'entrée
└── ...
````

## Fonctionnalités

### Affichage des Jeux
L'application propose deux modes d'affichage :
1. Vue en Grille : Affiche plusieurs jeux simultanément dans une grille responsive.
2. Vue en Carrousel : Affiche un jeu à la fois avec des animations de transition fluides et des contrôles de navigation.

### Filtrer et recherche
- Filtrage par plateforme (PC, PlayStation, Xbox, Switch)
- Recherche par titre de jeu
- Réinitialisation des filtres

## Architecture

Le projet suit les principes de la Clean Architecture :
- Domain : Contient les entités métier et les interfaces des cas d'utilisation
- Data : Implémente les repositories pour l'accès aux données
- Infrastructure : Contient les adaptateurs pour les services externes
- Presentation : Gère l'interface utilisateur et les interactions

## API Mockée
L'application utilise une API simulée avec des délais réseau pour reproduire un environnement réel. Les données sont stockées localement dans `MockGameRepository.ts` .

## Développement
### Ajout de nouveaux jeux
Pour ajouter de nouveaux jeux, modifiez le fichier `src/data/repositories/MockGameRepository.ts` et ajoutez des entrées au tableau mockGames .

### Personnalisation des Styles
Les styles sont basés sur Tailwind CSS. Pour personnaliser l'apparence, modifiez les classes dans les composants ou ajustez la configuration dans `tailwind.config.js` .
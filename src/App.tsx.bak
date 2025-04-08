import { Footer } from './presentation/components/Footer/Footer';
import { Header } from './presentation/components/Header/Header';
import { GameProvider } from './presentation/context/GameContext';
import { GamesPage } from './presentation/pages/GamesPage';

function App() {
  return (
    <GameProvider>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="flex-grow">
          <GamesPage />
        </main>
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;

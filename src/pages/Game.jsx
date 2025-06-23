import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { GameProvider, useGame } from "../components/MemoryFlow/GameContext";
import MainMenu from "../components/MemoryFlow/MainMenu";
import PatternMatchGame from "../components/MemoryFlow/PatternMatchGame";
import SequenceGame from "../components/MemoryFlow/SequenceGame";
import SpatialGame from "../components/MemoryFlow/SpatialGame";
import ResultsScreen from "../components/MemoryFlow/ResultsScreen";
import ProgressScreen from "../components/MemoryFlow/ProgressScreen";
import LevelSelect from "../components/MemoryFlow/LevelSelect";

const GameContent = () => {
  const { gameState, currentGame } = useGame();

  if (gameState === 'menu') {
    return <MainMenu />;
  }

  if (gameState === 'levelSelect') {
    return <LevelSelect />;
  }

  if (gameState === 'playing') {
    switch (currentGame) {
      case 'pattern':
        return <PatternMatchGame />;
      case 'sequence':
        return <SequenceGame />;
      case 'spatial':
        return <SpatialGame />;
      default:
        return <MainMenu />;
    }
  }

  if (gameState === 'results') {
    return <ResultsScreen />;
  }

  if (gameState === 'progress') {
    return <ProgressScreen />;
  }

  return <MainMenu />;
};

function GamePage() {
  // Set a custom data attribute for page-specific cursor colors
  useEffect(() => {
    document.body.setAttribute("data-page", "game");

    return () => {
      document.body.removeAttribute("data-page");
    };
  }, []);

  return (
    <GameProvider>
      <div className="relative">
        {/* Back to Portfolio Button - Always visible */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <i className="bi bi-arrow-left"></i> Back to Portfolio
          </Link>
        </div>
        
        {/* Game Content */}
        <GameContent />
        
        {/* Storyboards Section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Design Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore the design storyboards that showcase different user experiences and interface approaches for MemoryFlow
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-cyan-500 p-3 rounded-full mr-4">
                      <i className="bi bi-lightning-charge text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Focus Mode Design</h3>
                      <p className="text-gray-400">Modern Minimalist Theme</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Fast-paced interface designed for users who need quick, effective memory training sessions with minimal distractions.
                  </p>
                  <Link 
                    to="/projects/storyboard-1" 
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    View Storyboard <i className="bi bi-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-orange-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500 p-3 rounded-full mr-4">
                      <i className="bi bi-heart text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Comfort Mode Design</h3>
                      <p className="text-gray-600">Warm Accessible Theme</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Gentle, accessible interface for users who value detailed guidance, encouraging feedback, and patient pacing.
                  </p>
                  <Link 
                    to="/projects/storyboard-2" 
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View Storyboard <i className="bi bi-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default GamePage;

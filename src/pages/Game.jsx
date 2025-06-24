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

  if (gameState === "menu") {
    return <MainMenu />;
  }

  if (gameState === "levelSelect") {
    return <LevelSelect />;
  }

  if (gameState === "playing") {
    switch (currentGame) {
      case "pattern":
        return <PatternMatchGame />;
      case "sequence":
        return <SequenceGame />;
      case "spatial":
        return <SpatialGame />;
      default:
        return <MainMenu />;
    }
  }

  if (gameState === "results") {
    return <ResultsScreen />;
  }

  if (gameState === "progress") {
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
      </div>
    </GameProvider>
  );
}

export default GamePage;

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
    <>
      <GameProvider>
        <div className="game-page">
          <GameContent />
        </div>
      </GameProvider>
    </>
  );
}

export default GamePage;

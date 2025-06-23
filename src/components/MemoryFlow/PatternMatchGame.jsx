import { useState, useEffect, useCallback, useMemo } from "react";
import { useGame } from "./GameContext";

const PatternMatchGame = () => {
  const {
    theme,
    difficulty,
    gameVariant,
    getDifficultySettings,
    recordAnswer,
    recordMove,
    endGame,
    returnToMenu,
    timeElapsed,
    setTimeElapsed,
    sessionStats,
  } = useGame();

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isFocusMode = theme === "focus";
  const settings = getDifficultySettings();
  const totalCards = settings.patternCards;
  const totalPairs = totalCards / 2;

  // Calculate grid dimensions for pattern matching
  const getGridDimensions = () => {
    switch (difficulty) {
      case "beginner":
        return { rows: 2, cols: 4 }; // 8 cards
      case "intermediate":
        return { rows: 4, cols: 4 }; // 16 cards
      case "advanced":
        return { rows: 3, cols: 6 }; // 18 cards
      case "expert":
        return { rows: 6, cols: 6 }; // 36 cards
      case "impossible":
        return { rows: 10, cols: 10 }; // 100 cards
      default:
        return { rows: 2, cols: 4 };
    }
  };

  const gridDimensions = getGridDimensions();

  // Generate symbols based on variant
  const getSymbolSet = () => {
    switch (gameVariant) {
      case "icons":
        return [
          "🌟",
          "🌺",
          "🎯",
          "🎨",
          "🎭",
          "🎪",
          "🎸",
          "🎵",
          "🚀",
          "🌙",
          "☀️",
          "🌈",
          "🔥",
          "💎",
          "🏆",
          "⚡",
          "🦋",
          "🌸",
          "🍀",
          "🌻",
          "🎋",
          "🎃",
          "🎄",
          "🎁",
          "🌮",
          "🍕",
          "🍎",
          "🥨",
          "🍪",
          "🧁",
          "🎂",
          "🍰",
          "🧊",
          "❄️",
          "🌊",
          "🌪️",
          "🌋",
          "🏔️",
          "🗻",
          "🏕️",
          "🏖️",
          "🏜️",
          "🌴",
          "🌲",
          "🌳",
          "🌱",
          "🌿",
          "🍁",
          "🍂",
        ];
      case "words":
        return [
          "CAT",
          "DOG",
          "SUN",
          "MOON",
          "STAR",
          "TREE",
          "FISH",
          "BIRD",
          "BOOK",
          "BALL",
          "CAKE",
          "FIRE",
          "RAIN",
          "SNOW",
          "WIND",
          "ROCK",
          "WAVE",
          "LEAF",
          "ROSE",
          "BEAR",
          "LION",
          "FROG",
          "DUCK",
          "WOLF",
          "DEER",
          "HAWK",
          "SEAL",
          "CRAB",
          "WORM",
          "MOTH",
          "WASP",
          "TOAD",
          "LYNX",
          "IBEX",
          "NEWT",
          "OXEN",
          "YAKS",
          "EMUS",
          "KIWI",
          "OWLS",
          "RAMS",
          "PIGS",
          "COWS",
          "HENS",
          "BEES",
          "ANTS",
          "BUGS",
          "TOYS",
        ];
      case "signs":
        return [
          "±",
          "∞",
          "≈",
          "≠",
          "≤",
          "≥",
          "∑",
          "∏",
          "∆",
          "∇",
          "∂",
          "∫",
          "√",
          "∛",
          "∜",
          "∝",
          "∈",
          "∉",
          "∪",
          "∩",
          "⊂",
          "⊃",
          "⊆",
          "⊇",
          "∧",
          "∨",
          "¬",
          "→",
          "↔",
          "∀",
          "∃",
          "∄",
          "⊕",
          "⊗",
          "⊥",
          "∥",
          "⊤",
          "⊥",
          "℮",
          "ℯ",
          "π",
          "φ",
          "ψ",
          "ω",
          "α",
          "β",
          "γ",
          "δ",
        ];
      case "numbers":
        return [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
        ];
      case "combination":
        return [
          "🌟",
          "CAT",
          "±",
          "7",
          "🎨",
          "SUN",
          "∞",
          "12",
          "🚀",
          "DOG",
          "≈",
          "3",
          "🌺",
          "MOON",
          "≠",
          "15",
          "🎯",
          "TREE",
          "∑",
          "8",
          "🎭",
          "FISH",
          "∆",
          "21",
          "🎪",
          "BIRD",
          "√",
          "4",
          "🎸",
          "BALL",
          "∈",
          "18",
          "🎵",
          "FIRE",
          "∪",
          "9",
          "🌙",
          "RAIN",
          "∧",
          "25",
          "☀️",
          "BOOK",
          "→",
          "6",
          "🌈",
          "STAR",
          "∀",
          "11",
          "🔥",
          "CAKE",
          "⊕",
          "19",
        ];
      default:
        return [
          "🌟",
          "🌺",
          "🎯",
          "🎨",
          "🎭",
          "🎪",
          "🎸",
          "🎵",
          "🚀",
          "🌙",
          "☀️",
          "🌈",
          "🔥",
          "💎",
          "🏆",
          "⚡",
          "🦋",
          "🌸",
          "🍀",
          "🌻",
          "🎋",
          "🎃",
          "🎄",
          "🎁",
        ];
    }
  };

  const symbols = useMemo(() => getSymbolSet(), [gameVariant]);

  const initializeGame = useCallback(() => {
    const selectedSymbols = symbols.slice(0, totalPairs);
    const cardPairs = [...selectedSymbols, ...selectedSymbols];

    // Shuffle cards
    const shuffledCards = cardPairs
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
    setTimeElapsed(0);
  }, [symbols, totalPairs, setTimeElapsed]);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [difficulty, gameVariant, initializeGame]);

  // Timer
  useEffect(() => {
    if (!gameComplete && !isPaused) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameComplete, isPaused, setTimeElapsed]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs.length === totalPairs && totalPairs > 0) {
      setGameComplete(true);
      setTimeout(() => {
        endGame();
      }, 1000);
    }
  }, [matchedPairs.length, totalPairs, endGame]);

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || isPaused) return;

    const card = cards.find((c) => c.id === cardId);
    if (card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      recordMove(); // Record move in context

      // Check for match
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        recordAnswer(true);
        setMatchedPairs((prev) => [...prev, firstCard.symbol]);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        recordAnswer(false);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getAccuracy = () => {
    if (moves === 0) return 100;
    return Math.round((matchedPairs.length / moves) * 100);
  };

  const getLiveAccuracy = () => {
    if (sessionStats.totalAttempts === 0) return 100;
    return Math.round(
      (sessionStats.correct / sessionStats.totalAttempts) * 100
    );
  };

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-cyan-400 font-bold">
              Pattern Match -{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-medium"
              >
                {isPaused ? (
                  <i className="bi bi-play"></i>
                ) : (
                  <i className="bi bi-pause"></i>
                )}
              </button>
              <div className="text-2xl font-bold text-cyan-400">
                {formatTime(timeElapsed)}
              </div>
              <div className="text-yellow-400">
                {"★".repeat(Math.min(5, Math.floor(getAccuracy() / 20)))}
                {"☆".repeat(5 - Math.min(5, Math.floor(getAccuracy() / 20)))}
              </div>
              {/* Live Accuracy Meter */}
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400">Accuracy</div>
                <div
                  className={`text-lg font-bold ${
                    getLiveAccuracy() >= 75
                      ? "text-green-400"
                      : getLiveAccuracy() >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {getLiveAccuracy()}%
                </div>
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getLiveAccuracy() >= 75
                        ? "bg-green-400"
                        : getLiveAccuracy() >= 50
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                    style={{ width: `${Math.min(100, getLiveAccuracy())}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Grid */}
          <div
            className={`grid gap-2 mb-6 mx-auto`}
            style={{
              gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
              maxWidth: `${Math.min(gridDimensions.cols * 80, 600)}px`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center ${
                  gameVariant === "words" ||
                  gameVariant === "numbers" ||
                  gameVariant === "signs"
                    ? "text-lg font-bold"
                    : "text-2xl font-bold"
                } ${
                  card.isMatched
                    ? "bg-gradient-to-br from-green-500 to-teal-600 animate-pulse"
                    : card.isFlipped
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {card.isFlipped || card.isMatched ? card.symbol : ""}
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div className="text-center">
            {matchedPairs.length > 0 && !gameComplete && (
              <div className="text-cyan-400 text-lg font-semibold mb-2">
                Perfect Match! +
                {difficulty === "advanced"
                  ? 30
                  : difficulty === "intermediate"
                  ? 20
                  : 10}
              </div>
            )}
            <div className="w-full bg-gray-700 rounded-full h-2 max-w-md mx-auto">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(matchedPairs.length / totalPairs) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Progress: {matchedPairs.length}/{totalPairs} pairs
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-8">
            <button
              onClick={returnToMenu}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Comfort Mode
  return (
    <div className="min-h-screen bg-orange-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Pattern Matching - Round 1 of 3
              </h2>
              <p className="text-gray-600">Take your time - there's no rush!</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium mb-2"
              >
                {isPaused ? (
                  <>
                    <i className="bi bi-play"></i> Resume
                  </>
                ) : (
                  <>
                    <i className="bi bi-pause"></i> Pause
                  </>
                )}
              </button>
              <div className="text-sm text-gray-600">
                Time: {formatTime(timeElapsed)}
              </div>
            </div>

            {/* Live Accuracy Meter */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Your Progress
                </span>
                <span
                  className={`text-lg font-bold ${
                    getLiveAccuracy() >= 75
                      ? "text-green-600"
                      : getLiveAccuracy() >= 50
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {getLiveAccuracy()}% Accuracy
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    getLiveAccuracy() >= 75
                      ? "bg-green-500"
                      : getLiveAccuracy() >= 50
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(100, getLiveAccuracy())}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Keep going!</span>
                <span
                  className={
                    getLiveAccuracy() >= 75 ? "text-green-600 font-medium" : ""
                  }
                >
                  {getLiveAccuracy() >= 75
                    ? "✓ Goal reached!"
                    : "Goal: 75% for next level"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="bg-blue-50 rounded-xl p-8 mb-6 border-2 border-blue-200">
          <div
            className={`grid gap-4 mb-6 mx-auto`}
            style={{
              gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
              maxWidth: `${Math.min(gridDimensions.cols * 100, 800)}px`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 border-4 flex items-center justify-center font-bold ${
                  gameVariant === "words" ||
                  gameVariant === "numbers" ||
                  gameVariant === "signs"
                    ? "text-xl"
                    : "text-4xl"
                } ${
                  card.isMatched
                    ? "bg-green-200 border-green-400 text-green-700"
                    : card.isFlipped
                    ? "bg-orange-200 border-orange-400 text-orange-700"
                    : "bg-white border-gray-300 hover:border-gray-400 text-gray-400"
                }`}
              >
                {card.isFlipped || card.isMatched ? card.symbol : "?"}
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div className="text-center">
            {matchedPairs.length > 0 && !gameComplete && (
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full inline-block text-lg font-medium mb-4">
                <i className="bi bi-check2-circle me-2"></i>
                Excellent! You found a match!
              </div>
            )}
            <div className="text-gray-600 mb-4">
              Progress: {matchedPairs.length} out of {totalPairs} pairs found
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${(matchedPairs.length / totalPairs) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <button
            onClick={returnToMenu}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium"
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatternMatchGame;

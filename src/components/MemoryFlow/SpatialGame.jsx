import { useState, useEffect, useCallback } from 'react';
import { useGame } from './GameContext';

const SpatialGame = () => {
  const { 
    theme, 
    getDifficultySettings, 
    recordAnswer, 
    recordRound,
    recordPerfectRound,
    endGame,
    returnToMenu,
    timeElapsed,
    setTimeElapsed,
    score,
    sessionStats
  } = useGame();

  const [positions, setPositions] = useState([]);
  const [playerPositions, setPlayerPositions] = useState([]);
  const [showingPositions, setShowingPositions] = useState(false);
  const [round, setRound] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [phase, setPhase] = useState('preparation'); // 'preparation', 'showing', 'recalling'

  const isFocusMode = theme === 'focus';
  const settings = getDifficultySettings();
  const gridSize = settings.gridSize;
  const maxRounds = 5;
  const currentPositionCount = Math.min(3 + round, 8);

  const getLiveAccuracy = () => {
    if (sessionStats.totalAttempts === 0) return 100;
    return Math.round((sessionStats.correct / sessionStats.totalAttempts) * 100);
  };

  // Initialize game
  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  // Timer
  useEffect(() => {
    if (!gameComplete && !isPaused && phase === 'recalling') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameComplete, isPaused, phase, setTimeElapsed]);

  const generatePositions = useCallback((count) => {
    const positions = [];
    const totalCells = gridSize * gridSize;
    
    while (positions.length < count) {
      const newPos = Math.floor(Math.random() * totalCells);
      if (!positions.includes(newPos)) {
        positions.push(newPos);
      }
    }
    
    return positions;
  }, [gridSize]);

  const startNewRound = useCallback(() => {
    const newPositions = generatePositions(currentPositionCount);
    setPositions(newPositions);
    setPlayerPositions([]);
    setIsPlayerTurn(false);
    setPhase('preparation');
    setFeedback('Get ready to memorize the positions!');
    
    // Show positions after a short delay
    setTimeout(() => {
      showPositions(newPositions);
    }, 2000);
  }, [currentPositionCount, showPositions, generatePositions]);

  const showPositions = useCallback(async (pos) => {
    setShowingPositions(true);
    setPhase('showing');
    setFeedback('Memorize these positions...');
    
    // Show all positions simultaneously for a duration
    const showDuration = isFocusMode ? 2000 : 3000;
    
    for (let i = 0; i < pos.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Keep all positions visible for the show duration
    await new Promise(resolve => setTimeout(resolve, showDuration));
    
    setShowingPositions(false);
    setIsPlayerTurn(true);
    setPhase('recalling');
    setFeedback('Now click the positions you remember!');
  }, [isFocusMode]);

  const handleCellClick = (cellIndex) => {
    if (!isPlayerTurn || showingPositions || isPaused) return;

    // Check if position was already selected
    if (playerPositions.includes(cellIndex)) return;

    const newPlayerPositions = [...playerPositions, cellIndex];
    setPlayerPositions(newPlayerPositions);

    // Check if this position was in the original sequence
    if (positions.includes(cellIndex)) {
      // Correct position
      if (newPlayerPositions.length === positions.length) {
        // All positions found
        const allCorrect = newPlayerPositions.every(pos => positions.includes(pos));
        
        if (allCorrect) {
          recordAnswer(true);
          recordRound();
          recordPerfectRound(); // Perfect round since all positions correct
          setFeedback('Perfect! All positions correct!');
          setIsPlayerTurn(false);
          
          if (round >= maxRounds) {
            // Game complete
            setTimeout(() => {
              setGameComplete(true);
              endGame();
            }, 1500);
          } else {
            // Next round
            setTimeout(() => {
              setRound(prev => prev + 1);
              startNewRound();
            }, 2000);
          }
        }
      } else {
        setFeedback(`Good! ${newPlayerPositions.length}/${positions.length} found`);
      }
    } else {
      // Wrong position
      recordAnswer(false);
      recordRound(); // Still count the round attempt
      setFeedback('Oops! That wasn\'t one of the positions. Try again.');
      setIsPlayerTurn(false);
      
      // Restart current round after delay
      setTimeout(() => {
        startNewRound();
      }, 2000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCellState = (cellIndex) => {
    if (showingPositions && positions.includes(cellIndex)) {
      return 'showing';
    }
    if (playerPositions.includes(cellIndex)) {
      return positions.includes(cellIndex) ? 'correct' : 'incorrect';
    }
    return 'default';
  };

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-green-400 font-bold">
              Spatial Memory - Round {round}/{maxRounds}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-medium"
              >
                {isPaused ? <i className="bi bi-play"></i> : <i className="bi bi-pause"></i>}
              </button>
              <div className="text-2xl font-bold text-green-400">{formatTime(timeElapsed)}</div>
              <div className="text-yellow-400">
                Score: {score}
              </div>
              {/* Live Accuracy Meter */}
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-400">Accuracy</div>
                <div className={`text-lg font-bold ${
                  getLiveAccuracy() >= 75 ? 'text-green-400' : 
                  getLiveAccuracy() >= 50 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {getLiveAccuracy()}%
                </div>
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getLiveAccuracy() >= 75 ? 'bg-green-400' : 
                      getLiveAccuracy() >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{width: `${Math.min(100, getLiveAccuracy())}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="text-center mb-6">
            <div className="text-lg font-semibold text-green-400 mb-2">
              {feedback}
            </div>
            <div className="text-gray-400 text-sm">
              Remember {currentPositionCount} positions | Round {round} of {maxRounds}
            </div>
          </div>

          {/* Game Grid */}
          <div 
            className={`grid gap-2 mb-8 mx-auto max-w-lg`}
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {Array.from({ length: gridSize * gridSize }, (_, index) => {
              const state = getCellState(index);
              return (
                <div
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center text-sm font-bold ${
                    state === 'showing' 
                      ? 'bg-gradient-to-br from-green-500 to-teal-600 animate-pulse' 
                      : state === 'correct'
                      ? 'bg-gradient-to-br from-green-500 to-teal-600'
                      : state === 'incorrect'
                      ? 'bg-gradient-to-br from-red-500 to-pink-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {state === 'showing' && '★'}
                  {state === 'correct' && '✓'}
                  {state === 'incorrect' && '✗'}
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="text-center mb-8">
            <div className="w-full bg-gray-700 rounded-full h-2 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${(round / maxRounds) * 100}%`}}
              ></div>
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Round Progress: {round}/{maxRounds}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
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
                Spatial Memory - Round {round} of {maxRounds}
              </h2>
              <p className="text-gray-600">Remember the positions of the highlighted squares</p>
            </div>
            <div className="text-center">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium mb-2"
              >
                {isPaused ? <><i className="bi bi-play"></i> Resume</> : <><i className="bi bi-pause"></i> Pause</>}
              </button>
              <div className="text-sm text-gray-600">Time: {formatTime(timeElapsed)}</div>
            </div>
            
            {/* Live Accuracy Meter */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Your Progress</span>
                <span className={`text-lg font-bold ${
                  getLiveAccuracy() >= 75 ? 'text-green-600' : 
                  getLiveAccuracy() >= 50 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {getLiveAccuracy()}% Accuracy
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    getLiveAccuracy() >= 75 ? 'bg-green-500' : 
                    getLiveAccuracy() >= 50 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{width: `${Math.min(100, getLiveAccuracy())}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Keep going!</span>
                <span className={getLiveAccuracy() >= 75 ? 'text-green-600 font-medium' : ''}>
                  {getLiveAccuracy() >= 75 ? '✓ Goal reached!' : 'Goal: 75% for next level'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-blue-50 rounded-xl p-8 mb-6 border-2 border-blue-200">
          {/* Feedback */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full inline-block text-lg font-medium">
              {feedback}
            </div>
            <div className="text-gray-600 text-sm mt-2">
              Memorize {currentPositionCount} positions on the grid
            </div>
          </div>

          {/* Game Grid */}
          <div 
            className={`grid gap-3 mb-8 mx-auto max-w-lg`}
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {Array.from({ length: gridSize * gridSize }, (_, index) => {
              const state = getCellState(index);
              return (
                <div
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 border-4 flex items-center justify-center text-2xl font-bold ${
                    state === 'showing' 
                      ? 'bg-green-200 border-green-400 text-green-700 animate-pulse' 
                      : state === 'correct'
                      ? 'bg-green-200 border-green-400 text-green-700'
                      : state === 'incorrect'
                      ? 'bg-red-200 border-red-400 text-red-700'
                      : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {state === 'showing' && '★'}
                  {state === 'correct' && '✓'}
                  {state === 'incorrect' && '✗'}
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="text-center">
            <div className="text-gray-600 mb-4">
              Round {round} of {maxRounds} | Found: {playerPositions.filter(pos => positions.includes(pos)).length}/{positions.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{width: `${(round / maxRounds) * 100}%`}}
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

export default SpatialGame;
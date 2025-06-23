import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGame } from './GameContext';

const SequenceGame = () => {
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

  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [highlightedColor, setHighlightedColor] = useState(-1);
  const [round, setRound] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  const isFocusMode = theme === 'focus';
  const settings = getDifficultySettings();
  const maxRounds = 5;
  const currentSequenceLength = Math.min(settings.sequenceLength + round - 1, settings.sequenceLength + 3);

  // Colors for sequence
  const colors = useMemo(() => [
    { id: 1, name: 'Red', class: isFocusMode ? 'bg-red-500' : 'bg-red-400', activeClass: isFocusMode ? 'bg-red-300' : 'bg-red-200' },
    { id: 2, name: 'Blue', class: isFocusMode ? 'bg-blue-500' : 'bg-blue-400', activeClass: isFocusMode ? 'bg-blue-300' : 'bg-blue-200' },
    { id: 3, name: 'Green', class: isFocusMode ? 'bg-green-500' : 'bg-green-400', activeClass: isFocusMode ? 'bg-green-300' : 'bg-green-200' },
    { id: 4, name: 'Yellow', class: isFocusMode ? 'bg-yellow-500' : 'bg-yellow-400', activeClass: isFocusMode ? 'bg-yellow-300' : 'bg-yellow-200' },
    { id: 5, name: 'Purple', class: isFocusMode ? 'bg-purple-500' : 'bg-purple-400', activeClass: isFocusMode ? 'bg-purple-300' : 'bg-purple-200' },
    { id: 6, name: 'Pink', class: isFocusMode ? 'bg-pink-500' : 'bg-pink-400', activeClass: isFocusMode ? 'bg-pink-300' : 'bg-pink-200' }
  ], [isFocusMode]);

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
    if (!gameComplete && !isPaused && !showingSequence) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameComplete, isPaused, showingSequence, setTimeElapsed]);

  const generateSequence = useCallback((length) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * colors.length));
    }
    return newSequence;
  }, [colors]);

  const startNewRound = useCallback(() => {
    const newSequence = generateSequence(currentSequenceLength);
    console.log('Generated sequence:', newSequence); // Debug log
    setSequence(newSequence);
    setPlayerSequence([]);
    setHighlightedColor(-1);
    setIsPlayerTurn(false);
    setFeedback('Watch the sequence carefully!');
    
    // Show sequence after a short delay
    setTimeout(() => {
      showSequence(newSequence);
    }, 1000);
  }, [currentSequenceLength, showSequence, generateSequence]);

  const showSequence = useCallback(async (seq) => {
    setShowingSequence(true);
    setFeedback('Watch the sequence carefully!');
    
    for (let i = 0; i < seq.length; i++) {
      const colorIndex = seq[i];
      console.log(`Showing step ${i + 1}: color index ${colorIndex} (${colors[colorIndex].name})`);
      
      // Highlight the current color
      setHighlightedColor(colorIndex);
      
      // Wait for the highlight duration
      await new Promise(resolve => setTimeout(resolve, isFocusMode ? 800 : 1000));
      
      // Remove highlight
      setHighlightedColor(-1);
      
      // Wait between colors (except for the last one)
      if (i < seq.length - 1) {
        await new Promise(resolve => setTimeout(resolve, isFocusMode ? 300 : 400));
      }
    }
    
    setShowingSequence(false);
    setHighlightedColor(-1);
    setIsPlayerTurn(true);
    setFeedback('Now repeat the sequence!');
  }, [colors, isFocusMode]);

  const handleColorClick = (colorIndex) => {
    if (!isPlayerTurn || showingSequence || isPaused) return;

    const newPlayerSequence = [...playerSequence, colorIndex];
    const currentPosition = playerSequence.length; // 0-based position we're checking
    const expectedColor = sequence[currentPosition];
    
    console.log(`Player clicked: ${colors[colorIndex].name} (index ${colorIndex})`);
    console.log(`Expected: ${colors[expectedColor].name} (index ${expectedColor})`);
    console.log(`Position: ${currentPosition + 1}/${sequence.length}`);
    
    setPlayerSequence(newPlayerSequence);

    if (colorIndex === expectedColor) {
      // Correct step
      if (newPlayerSequence.length === sequence.length) {
        // Complete sequence correct
        recordAnswer(true);
        recordRound();
        recordPerfectRound(); // Perfect round since all correct
        setFeedback('Perfect! Well done!');
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
      } else {
        setFeedback(`Good! ${newPlayerSequence.length}/${sequence.length} correct`);
      }
    } else {
      // Wrong step
      recordAnswer(false);
      recordRound(); // Still count the round attempt
      setFeedback(`Oops! Expected ${colors[expectedColor].name}, got ${colors[colorIndex].name}. Try again.`);
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

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-purple-400 font-bold">
              Sequence Memory - Round {round}/{maxRounds}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm font-medium"
              >
                {isPaused ? <i className="bi bi-play"></i> : <i className="bi bi-pause"></i>}
              </button>
              <div className="text-2xl font-bold text-purple-400">{formatTime(timeElapsed)}</div>
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
            <div className="text-lg font-semibold text-purple-400 mb-2">
              {feedback}
            </div>
            <div className="text-gray-400 text-sm">
              Sequence length: {currentSequenceLength} | Round {round} of {maxRounds}
            </div>
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            {colors.map((color, index) => (
              <div
                key={color.id}
                onClick={() => handleColorClick(index)}
                className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center font-bold text-white ${
                  highlightedColor === index
                    ? color.activeClass
                    : color.class
                } ${
                  isPlayerTurn ? 'hover:scale-105 hover:shadow-lg' : ''
                } ${
                  playerSequence.length > 0 && playerSequence[playerSequence.length - 1] === index && isPlayerTurn
                    ? 'ring-4 ring-white'
                    : ''
                }`}
              >
                {isFocusMode ? '' : color.name}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="text-center mb-8">
            <div className="w-full bg-gray-700 rounded-full h-2 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
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
                Sequence Memory - Round {round} of {maxRounds}
              </h2>
              <p className="text-gray-600">Remember the order of the colors</p>
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
              Sequence length: {currentSequenceLength} colors
            </div>
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg mx-auto mb-8">
            {colors.map((color, index) => (
              <div
                key={color.id}
                onClick={() => handleColorClick(index)}
                className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 border-4 text-xl font-bold text-white flex items-center justify-center ${
                  highlightedColor === index
                    ? `${color.activeClass} border-gray-600 scale-110`
                    : `${color.class} border-gray-300`
                } ${
                  isPlayerTurn ? 'hover:scale-105 hover:shadow-lg' : ''
                } ${
                  playerSequence.length > 0 && playerSequence[playerSequence.length - 1] === index && isPlayerTurn
                    ? 'ring-4 ring-blue-400'
                    : ''
                }`}
              >
                {color.name}
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="text-center">
            <div className="text-gray-600 mb-4">
              Round {round} of {maxRounds}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full transition-all duration-500"
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

export default SequenceGame;
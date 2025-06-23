import { useGame } from './GameContext';
import { useEffect, useState, useCallback } from 'react';

const ResultsScreen = () => {
  const { 
    theme, 
    score, 
    accuracy, 
    timeElapsed, 
    streak, 
    sessionsPlayed,
    sessionStats,
    currentGame,
    difficulty,
    returnToMenu,
    startGame,
    unlockedLevels
  } = useGame();

  const [showUnlockButton, setShowUnlockButton] = useState(false);
  const isFocusMode = theme === 'focus';

  // Re-check unlock status when unlocked levels change
  useEffect(() => {
    const checkUnlock = () => {
      const nextLevel = getNextLevel();
      const hasNextLevel = nextLevel !== undefined;
      const hasRequiredAccuracy = accuracy >= 75;
      const nextLevelIsUnlocked = unlockedLevels[currentGame]?.includes(nextLevel);
      
      const shouldShow = hasRequiredAccuracy && hasNextLevel && nextLevelIsUnlocked;
      console.log('useEffect unlock check:', shouldShow);
      setShowUnlockButton(shouldShow);
    };
    
    // Small delay to ensure state has updated
    const timer = setTimeout(checkUnlock, 100);
    return () => clearTimeout(timer);
  }, [unlockedLevels, accuracy, currentGame, difficulty, getNextLevel]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding performance!";
    if (accuracy >= 75) return "Great job!";
    if (accuracy >= 60) return "Good effort!";
    return "Keep practicing!";
  };

  const getGameTypeName = () => {
    const names = {
      pattern: 'Pattern Matching',
      sequence: 'Sequence Memory',
      spatial: 'Spatial Memory'
    };
    return names[currentGame] || 'Memory Game';
  };

  const getNextLevel = useCallback(() => {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert', 'impossible'];
    const currentIndex = levels.indexOf(difficulty);
    return levels[currentIndex + 1];
  }, [difficulty]);

  const wasLevelUnlocked = () => {
    const nextLevel = getNextLevel();
    const hasNextLevel = nextLevel !== undefined;
    const hasRequiredAccuracy = accuracy >= 75;
    const nextLevelIsUnlocked = unlockedLevels[currentGame]?.includes(nextLevel);
    
    console.log('=== RESULTS SCREEN DEBUG ===');
    console.log('Current game:', currentGame);
    console.log('Current difficulty:', difficulty);
    console.log('Next level:', nextLevel);
    console.log('Accuracy:', accuracy, '>=75?', hasRequiredAccuracy);
    console.log('Unlocked levels for', currentGame, ':', unlockedLevels[currentGame]);
    console.log('Next level unlocked?', nextLevelIsUnlocked);
    console.log('Should show button?', hasRequiredAccuracy && hasNextLevel && nextLevelIsUnlocked);
    console.log('showUnlockButton state:', showUnlockButton);
    
    return showUnlockButton;
  };

  const startNextLevel = () => {
    const nextLevel = getNextLevel();
    if (nextLevel) {
      startGame(nextLevel);
    }
  };

  // Mock weekly performance data for visualization
  const weeklyPerformance = [
    Math.max(20, accuracy - 25 + Math.random() * 10),
    Math.max(25, accuracy - 20 + Math.random() * 10),
    Math.max(30, accuracy - 15 + Math.random() * 10),
    Math.max(35, accuracy - 10 + Math.random() * 10),
    Math.max(40, accuracy - 5 + Math.random() * 10),
    Math.max(45, accuracy + Math.random() * 5),
    accuracy
  ];

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">Session Complete</h1>
            <p className="text-gray-400">{getGameTypeName()} - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
          </div>

          {/* Main Score */}
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-cyan-400 mb-2">{accuracy}%</div>
              <div className="text-xl text-gray-300">Accuracy Score</div>
              <div className="text-green-400 text-sm">
                {accuracy > 75 ? '+' : ''}{accuracy > 50 ? Math.floor(Math.random() * 10) : -Math.floor(Math.random() * 5)}% from last session
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{formatTime(timeElapsed)}</div>
                <div className="text-gray-400 text-sm">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{streak + (accuracy > 70 ? 1 : 0)}</div>
                <div className="text-gray-400 text-sm">Streak Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-gray-400 text-sm">Points Earned</div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-400 mb-2">Weekly Performance</div>
              <div className="flex justify-between items-end h-16">
                {weeklyPerformance.map((value, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="bg-gradient-to-t from-cyan-500 to-blue-600 w-6 rounded-t transition-all duration-1000"
                      style={{ height: `${Math.max(4, (value / 100) * 60)}px` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Progress Notification */}
            {getNextLevel() && (
              <div className={`rounded-lg p-4 mb-6 text-center border ${
                wasLevelUnlocked() 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-400'
                  : accuracy >= 75 
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border-blue-400'
                    : 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border-yellow-400'
              }`}>
                {wasLevelUnlocked() ? (
                  <>
                    <div className="text-green-400 text-lg font-bold mb-1">
                      <i className="bi bi-trophy-fill me-2"></i>
                      Level Unlocked!
                    </div>
                    <div className="text-green-300 text-sm">
                      Great job! You've unlocked {getNextLevel().charAt(0).toUpperCase() + getNextLevel().slice(1)} difficulty
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`text-lg font-bold mb-1 ${accuracy >= 75 ? 'text-blue-400' : 'text-yellow-400'}`}>
                      <i className={`bi ${accuracy >= 75 ? 'bi-check-circle' : 'bi-target'} me-2`}></i>
                      {accuracy >= 75 ? 'Requirement Met!' : 'Almost There!'}
                    </div>
                    <div className={`text-sm ${accuracy >= 75 ? 'text-blue-300' : 'text-yellow-300'}`}>
                      {accuracy >= 75 
                        ? `You achieved ${accuracy}% accuracy! Next level should unlock soon.`
                        : `Need 75% accuracy to unlock ${getNextLevel().charAt(0).toUpperCase() + getNextLevel().slice(1)} difficulty. You got ${accuracy}%.`
                      }
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className={`flex gap-4 ${wasLevelUnlocked() ? 'grid grid-cols-3' : ''}`}>
              {wasLevelUnlocked() && (
                <button 
                  onClick={startNextLevel}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-lg font-semibold transition-colors animate-pulse"
                >
                  <i className="bi bi-unlock me-2"></i>
                  Next Level
                </button>
              )}
              <button 
                onClick={() => startGame(difficulty)}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition-colors"
              >
                Play Again
              </button>
              <button 
                onClick={returnToMenu}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-semibold transition-colors"
              >
                Main Menu
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="text-center text-gray-400 text-sm">
            <p>{getPerformanceMessage()}</p>
            <p className="mt-1">
              {sessionStats.correct} correct, {sessionStats.incorrect} incorrect
            </p>
            {/* Debug info */}
            <div className="mt-4 text-xs bg-gray-800 p-2 rounded">
              <div>Next Level: {getNextLevel() || 'none'}</div>
              <div>Accuracy: {accuracy}% (&gt;= 75: {accuracy >= 75 ? 'YES' : 'NO'})</div>
              <div>Unlocked: {JSON.stringify(unlockedLevels[currentGame])}</div>
              <div>Show Button: {showUnlockButton ? 'YES' : 'NO'}</div>
            </div>
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
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Wonderful Job!</h1>
          <p className="text-lg text-gray-600">You completed the {getGameTypeName()} exercise</p>
        </div>
        
        {/* Results Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-orange-100">
          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-orange-50 p-6 rounded-lg text-center border border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">{accuracy}%</div>
              <div className="text-gray-700 font-medium">Accuracy</div>
              <div className="text-sm text-gray-500 mt-1">
                {accuracy >= 90 ? 'Perfect score!' : accuracy >= 75 ? 'Excellent!' : 'Great effort!'}
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">{formatTime(timeElapsed)}</div>
              <div className="text-gray-700 font-medium">Time Taken</div>
              <div className="text-sm text-gray-500 mt-1">Nice and steady</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">{sessionsPlayed + 1}</div>
              <div className="text-gray-700 font-medium">Total Sessions</div>
              <div className="text-sm text-gray-500 mt-1">Great consistency!</div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress This Week</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pattern Matching</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-400 h-3 rounded-full transition-all duration-1000"
                      style={{width: currentGame === 'pattern' ? `${accuracy}%` : '75%'}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12">
                    {currentGame === 'pattern' ? `${accuracy}%` : '75%'}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sequence Memory</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-400 h-3 rounded-full transition-all duration-1000"
                      style={{width: currentGame === 'sequence' ? `${accuracy}%` : '68%'}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12">
                    {currentGame === 'sequence' ? `${accuracy}%` : '68%'}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Spatial Memory</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-400 h-3 rounded-full transition-all duration-1000"
                      style={{width: currentGame === 'spatial' ? `${accuracy}%` : '82%'}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-12">
                    {currentGame === 'spatial' ? `${accuracy}%` : '82%'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4 font-medium">
              <i className="bi bi-arrow-up-circle me-1"></i>
              You're improving steadily! Keep up the great work.
            </p>
          </div>

          {/* Level Progress Notification */}
          {getNextLevel() && (
            <div className={`rounded-xl p-6 mb-6 text-center border-2 ${
              wasLevelUnlocked() 
                ? 'bg-green-100 border-green-300'
                : accuracy >= 75 
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-yellow-100 border-yellow-300'
            }`}>
              {wasLevelUnlocked() ? (
                <>
                  <div className="text-4xl mb-3">🎉</div>
                  <div className="text-green-800 text-xl font-bold mb-2">
                    Congratulations! New Level Unlocked!
                  </div>
                  <div className="text-green-700">
                    You've achieved {accuracy}% accuracy and unlocked <strong>{getNextLevel().charAt(0).toUpperCase() + getNextLevel().slice(1)}</strong> difficulty!
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-3">{accuracy >= 75 ? '✅' : '🎯'}</div>
                  <div className={`text-xl font-bold mb-2 ${accuracy >= 75 ? 'text-blue-800' : 'text-yellow-800'}`}>
                    {accuracy >= 75 ? 'Great Progress!' : 'Keep Practicing!'}
                  </div>
                  <div className={`${accuracy >= 75 ? 'text-blue-700' : 'text-yellow-700'}`}>
                    {accuracy >= 75 
                      ? `Excellent! You achieved ${accuracy}% accuracy. The next level should unlock soon!`
                      : (
                        <>
                          You need <strong>75% accuracy</strong> to unlock <strong>{getNextLevel().charAt(0).toUpperCase() + getNextLevel().slice(1)}</strong> difficulty.<br/>
                          You got <strong>{accuracy}%</strong> this time. You're getting closer!
                        </>
                      )
                    }
                  </div>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {wasLevelUnlocked() && (
              <button 
                onClick={startNextLevel}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg"
              >
                <i className="bi bi-unlock-fill me-2"></i>
                Try {getNextLevel().charAt(0).toUpperCase() + getNextLevel().slice(1)} Level
              </button>
            )}
            <button 
              onClick={() => startGame(difficulty)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Play Again
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              <i className="bi bi-graph-up me-2"></i>
              View Detailed Report
            </button>
            <button 
              onClick={returnToMenu}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <i className="bi bi-house me-2"></i>
              Return to Menu
            </button>
          </div>
        </div>

        {/* Encouragement Message */}
        <div className="text-center text-gray-600">
          <p className="text-lg font-medium">{getPerformanceMessage()}</p>
          <p className="text-sm mt-1">
            You got {sessionStats.correct} out of {sessionStats.totalAttempts} correct
          </p>
          {/* Debug info */}
          <div className="mt-4 text-xs bg-gray-100 p-2 rounded text-left max-w-md mx-auto">
            <div>Next Level: {getNextLevel() || 'none'}</div>
            <div>Accuracy: {accuracy}% (&gt;= 75: {accuracy >= 75 ? 'YES' : 'NO'})</div>
            <div>Unlocked: {JSON.stringify(unlockedLevels[currentGame])}</div>
            <div>Show Button: {showUnlockButton ? 'YES' : 'NO'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
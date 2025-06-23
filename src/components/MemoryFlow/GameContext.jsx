import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  // Theme settings
  const [theme, setTheme] = useState('focus'); // 'focus' or 'comfort'
  
  // Game state
  const [currentGame, setCurrentGame] = useState(null); // 'pattern', 'sequence', 'spatial'
  const [difficulty, setDifficulty] = useState('beginner'); // 'beginner', 'intermediate', 'advanced', 'expert', 'impossible'
  const [gameVariant, setGameVariant] = useState('icons'); // 'icons', 'words', 'signs', 'numbers', 'combination'
  const [gameState, setGameState] = useState('menu'); // 'menu', 'levelSelect', 'playing', 'results'
  
  // Scoring and progress
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionsPlayed, setSessionsPlayed] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  
  // Game session data
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    totalAttempts: 0,
    startTime: null,
    endTime: null,
    gameType: null,
    difficulty: null,
    moves: 0,
    hintsUsed: 0,
    perfectRounds: 0,
    totalRounds: 0
  });

  // Historical stats
  const [gameHistory, setGameHistory] = useState([]);
  const [overallStats, setOverallStats] = useState({
    pattern: { sessionsPlayed: 0, bestAccuracy: 0, bestTime: 999, totalTime: 0, averageAccuracy: 0 },
    sequence: { sessionsPlayed: 0, bestAccuracy: 0, bestTime: 999, totalTime: 0, averageAccuracy: 0 },
    spatial: { sessionsPlayed: 0, bestAccuracy: 0, bestTime: 999, totalTime: 0, averageAccuracy: 0 }
  });

  // Level unlocking
  const [unlockedLevels, setUnlockedLevels] = useState({
    pattern: ['beginner'],
    sequence: ['beginner'],
    spatial: ['beginner']
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('memoryflow-data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setTheme(data.theme || 'focus');
        setStreak(data.streak || 0);
        setSessionsPlayed(data.sessionsPlayed || 0);
        setGameHistory(data.gameHistory || []);
        setOverallStats(data.overallStats || {
          pattern: { sessionsPlayed: 0, bestAccuracy: 0, bestTime: 999, totalTime: 0, averageAccuracy: 0 },
          sequence: { sessionsPlayed: 0, bestAccuracy: 0, bestTime: 999, totalTime: 0, averageAccuracy: 0 },
          spatial: { sessionsPlayed: 0, bestAccuracy: 0, bestTime: 999, totalTime: 0, averageAccuracy: 0 }
        });
        setUnlockedLevels(data.unlockedLevels || {
          pattern: ['beginner'],
          sequence: ['beginner'],
          spatial: ['beginner']
        });
      } catch (error) {
        console.error('Error loading saved game data:', error);
      }
    }
  }, []);

  // Save data to localStorage
  const saveGameData = useCallback(() => {
    const dataToSave = {
      theme,
      streak,
      sessionsPlayed,
      gameHistory,
      overallStats,
      unlockedLevels,
      lastPlayed: new Date().toISOString()
    };
    localStorage.setItem('memoryflow-data', JSON.stringify(dataToSave));
  }, [theme, streak, sessionsPlayed, gameHistory, overallStats, unlockedLevels]);

  // Save data whenever unlocked levels change
  useEffect(() => {
    if (Object.keys(unlockedLevels).length > 0) {
      console.log('Unlocked levels changed, saving data:', unlockedLevels);
      saveGameData();
    }
  }, [unlockedLevels, saveGameData]);

  // Game control functions
  const selectGameType = (gameType) => {
    setCurrentGame(gameType);
    setGameState('levelSelect');
  };

  const startGame = (selectedDifficulty = difficulty, selectedVariant = gameVariant) => {
    setDifficulty(selectedDifficulty);
    setGameVariant(selectedVariant);
    setGameState('playing');
    setSessionStats({
      correct: 0,
      incorrect: 0,
      totalAttempts: 0,
      startTime: new Date(),
      endTime: null,
      gameType: currentGame,
      difficulty: selectedDifficulty,
      variant: selectedVariant,
      moves: 0,
      hintsUsed: 0,
      perfectRounds: 0,
      totalRounds: 0
    });
    setScore(0);
    setTimeElapsed(0);
  };

  const endGame = () => {
    const endTime = new Date();
    const finalAccuracy = sessionStats.totalAttempts > 0 
      ? Math.round((sessionStats.correct / sessionStats.totalAttempts) * 100) 
      : 0;
    
    console.log(`=== GAME ENDED ===`);
    console.log(`Game: ${currentGame}, Difficulty: ${difficulty}`);
    console.log(`Accuracy: ${finalAccuracy}% (${sessionStats.correct}/${sessionStats.totalAttempts})`);
    console.log(`Current unlocked levels:`, unlockedLevels);
    
    setAccuracy(finalAccuracy);
    const finalStats = { ...sessionStats, endTime };
    setSessionStats(finalStats);
    setSessionsPlayed(prev => prev + 1);
    
    // Add to game history
    const gameSession = {
      id: Date.now(),
      gameType: currentGame,
      difficulty,
      variant: gameVariant,
      accuracy: finalAccuracy,
      timeElapsed,
      score,
      date: endTime.toISOString(),
      stats: finalStats
    };
    
    setGameHistory(prev => [gameSession, ...prev.slice(0, 49)]); // Keep last 50 sessions
    
    // Update overall stats
    setOverallStats(prev => {
      const gameStats = prev[currentGame];
      const newStats = {
        ...gameStats,
        sessionsPlayed: gameStats.sessionsPlayed + 1,
        bestAccuracy: Math.max(gameStats.bestAccuracy, finalAccuracy),
        bestTime: timeElapsed > 0 ? Math.min(gameStats.bestTime, timeElapsed) : gameStats.bestTime,
        totalTime: gameStats.totalTime + timeElapsed,
        averageAccuracy: Math.round(
          ((gameStats.averageAccuracy * gameStats.sessionsPlayed) + finalAccuracy) / 
          (gameStats.sessionsPlayed + 1)
        )
      };
      
      return {
        ...prev,
        [currentGame]: newStats
      };
    });
    
    // Update streak
    if (finalAccuracy >= 70) {
      setStreak(prev => prev + 1);
    } else if (finalAccuracy < 50) {
      setStreak(0);
    }

    // Check for level unlock - must happen BEFORE setGameState
    const shouldUnlock = finalAccuracy >= 75;
    console.log(`Should unlock next level: ${shouldUnlock} (accuracy >= 75%: ${finalAccuracy >= 75})`);
    
    if (shouldUnlock) {
      const levels = ['beginner', 'intermediate', 'advanced', 'expert', 'impossible'];
      const currentIndex = levels.indexOf(difficulty);
      const nextLevel = levels[currentIndex + 1];
      
      console.log(`Current level: ${difficulty} (index: ${currentIndex})`);
      console.log(`Next level to unlock: ${nextLevel}`);
      console.log(`Current unlocked for ${currentGame}:`, unlockedLevels[currentGame]);
      
      if (nextLevel && !unlockedLevels[currentGame]?.includes(nextLevel)) {
        console.log(`✅ UNLOCKING ${nextLevel} for ${currentGame}`);
        
        // Use functional update to ensure we have the latest state
        setUnlockedLevels(currentUnlocked => {
          const gameUnlocked = currentUnlocked[currentGame] || [];
          
          // Double-check it's not already unlocked
          if (gameUnlocked.includes(nextLevel)) {
            console.log(`❌ ${nextLevel} already unlocked, skipping`);
            return currentUnlocked;
          }
          
          const newUnlocked = {
            ...currentUnlocked,
            [currentGame]: [...gameUnlocked, nextLevel]
          };
          
          console.log(`New unlocked levels state:`, newUnlocked);
          
          // Save immediately with the new unlocked state
          const dataToSave = {
            theme,
            streak: streak + (finalAccuracy >= 70 ? 1 : finalAccuracy < 50 ? -streak : 0),
            sessionsPlayed: sessionsPlayed + 1,
            gameHistory: [gameSession, ...gameHistory.slice(0, 49)],
            overallStats: {
              ...overallStats,
              [currentGame]: {
                ...overallStats[currentGame],
                sessionsPlayed: overallStats[currentGame].sessionsPlayed + 1,
                bestAccuracy: Math.max(overallStats[currentGame].bestAccuracy, finalAccuracy),
                bestTime: timeElapsed > 0 ? Math.min(overallStats[currentGame].bestTime, timeElapsed) : overallStats[currentGame].bestTime,
                totalTime: overallStats[currentGame].totalTime + timeElapsed,
                averageAccuracy: Math.round(
                  ((overallStats[currentGame].averageAccuracy * overallStats[currentGame].sessionsPlayed) + finalAccuracy) / 
                  (overallStats[currentGame].sessionsPlayed + 1)
                )
              }
            },
            unlockedLevels: newUnlocked,
            lastPlayed: new Date().toISOString()
          };
          
          localStorage.setItem('memoryflow-data', JSON.stringify(dataToSave));
          console.log(`✅ Data saved to localStorage with unlocked levels:`, newUnlocked);
          
          return newUnlocked;
        });
      } else if (!nextLevel) {
        console.log(`❌ No next level exists after ${difficulty}`);
      } else {
        console.log(`❌ Level ${nextLevel} already unlocked`);
      }
    } else {
      console.log(`❌ Accuracy ${finalAccuracy}% < 75%, no unlock`);
    }
    
    setGameState('results');
  };

  const returnToMenu = () => {
    setGameState('menu');
    setCurrentGame(null);
    setShowProgress(false);
    setSessionStats({
      correct: 0,
      incorrect: 0,
      totalAttempts: 0,
      startTime: null,
      endTime: null,
      gameType: null,
      difficulty: null,
      moves: 0,
      hintsUsed: 0,
      perfectRounds: 0,
      totalRounds: 0
    });
  };

  const recordAnswer = (isCorrect) => {
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      totalAttempts: prev.totalAttempts + 1
    }));
    
    if (isCorrect) {
      setScore(prev => prev + (difficulty === 'advanced' ? 30 : difficulty === 'intermediate' ? 20 : 10));
    }
  };

  const recordMove = () => {
    setSessionStats(prev => ({
      ...prev,
      moves: prev.moves + 1
    }));
  };

  const recordPerfectRound = () => {
    setSessionStats(prev => ({
      ...prev,
      perfectRounds: prev.perfectRounds + 1
    }));
  };

  const recordRound = () => {
    setSessionStats(prev => ({
      ...prev,
      totalRounds: prev.totalRounds + 1
    }));
  };

  const showProgressScreen = () => {
    setShowProgress(true);
    setGameState('progress');
  };

  // Debug function to manually unlock levels
  const debugUnlockLevel = (gameType, level) => {
    if (!unlockedLevels[gameType].includes(level)) {
      setUnlockedLevels(prev => ({
        ...prev,
        [gameType]: [...prev[gameType], level]
      }));
      saveGameData();
    }
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'focus' ? 'comfort' : 'focus';
      saveGameData();
      return newTheme;
    });
  };

  const getDifficultySettings = () => {
    const settings = {
      beginner: { 
        gridSize: 4, 
        patternCards: 8, // 2x4 grid for pairs
        sequenceLength: 3, 
        spatialPositions: 3, 
        timeLimit: 180 
      },
      intermediate: { 
        gridSize: 4, 
        patternCards: 16, // 4x4 grid for pairs
        sequenceLength: 4, 
        spatialPositions: 4, 
        timeLimit: 120 
      },
      advanced: { 
        gridSize: 6, 
        patternCards: 18, // 3x6 grid for pairs
        sequenceLength: 5, 
        spatialPositions: 5, 
        timeLimit: 90 
      },
      expert: { 
        gridSize: 6, 
        patternCards: 36, // 6x6 grid for pairs
        sequenceLength: 6, 
        spatialPositions: 6, 
        timeLimit: 60 
      },
      impossible: { 
        gridSize: 10, 
        patternCards: 100, // 10x10 grid for pairs
        sequenceLength: 8, 
        spatialPositions: 8, 
        timeLimit: 45 
      }
    };
    return settings[difficulty];
  };

  const unlockNextLevel = (gameType, currentDifficulty) => {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert', 'impossible'];
    const currentIndex = levels.indexOf(currentDifficulty);
    const nextLevel = levels[currentIndex + 1];
    
    console.log(`Checking unlock: ${gameType}, current: ${currentDifficulty}, next: ${nextLevel}`);
    console.log(`Current unlocked levels for ${gameType}:`, unlockedLevels[gameType]);
    
    if (nextLevel && !unlockedLevels[gameType].includes(nextLevel)) {
      console.log(`Unlocking ${nextLevel} for ${gameType}`);
      setUnlockedLevels(prev => {
        const newLevels = {
          ...prev,
          [gameType]: [...prev[gameType], nextLevel]
        };
        console.log(`New unlocked levels:`, newLevels);
        return newLevels;
      });
      return true;
    }
    return false;
  };

  const value = {
    // State
    theme,
    currentGame,
    difficulty,
    gameVariant,
    gameState,
    score,
    accuracy,
    timeElapsed,
    streak,
    sessionsPlayed,
    sessionStats,
    showProgress,
    gameHistory,
    overallStats,
    unlockedLevels,
    
    // Actions
    setTheme,
    setTimeElapsed,
    selectGameType,
    startGame,
    endGame,
    returnToMenu,
    recordAnswer,
    recordMove,
    recordPerfectRound,
    recordRound,
    showProgressScreen,
    toggleTheme,
    getDifficultySettings,
    unlockNextLevel,
    debugUnlockLevel,
    saveGameData
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
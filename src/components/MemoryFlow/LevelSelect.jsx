import { useState } from 'react';
import { useGame } from './GameContext';

const LevelSelect = () => {
  const { 
    theme, 
    currentGame, 
    unlockedLevels, 
    startGame, 
    returnToMenu,
    debugUnlockLevel
  } = useGame();

  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [selectedVariant, setSelectedVariant] = useState('icons');

  const isFocusMode = theme === 'focus';

  const difficulties = [
    { 
      key: 'beginner', 
      name: 'Beginner', 
      description: '2×4 pairs, 3 sequences',
      icon: '🌱',
      color: 'green'
    },
    { 
      key: 'intermediate', 
      name: 'Intermediate', 
      description: '4×4 pairs, 4 sequences',
      icon: '🌿',
      color: 'blue'
    },
    { 
      key: 'advanced', 
      name: 'Advanced', 
      description: '3×6 pairs, 5 sequences',
      icon: '🌳',
      color: 'purple'
    },
    { 
      key: 'expert', 
      name: 'Expert', 
      description: '6×6 pairs, 6 sequences',
      icon: '🔥',
      color: 'orange'
    },
    { 
      key: 'impossible', 
      name: 'Impossible', 
      description: '10×10 pairs, 8 sequences',
      icon: '⚡',
      color: 'red'
    }
  ];

  const variants = {
    pattern: [
      { key: 'icons', name: 'Icons', description: 'Emoji and symbol matching', icon: '😀' },
      { key: 'words', name: 'Words', description: 'Text-based matching', icon: 'ABC' },
      { key: 'signs', name: 'Signs', description: 'Mathematical symbols', icon: '±' },
      { key: 'numbers', name: 'Numbers', description: 'Numeric patterns', icon: '123' },
      { key: 'combination', name: 'Mixed', description: 'All types combined', icon: '🎯' }
    ],
    sequence: [
      { key: 'colors', name: 'Colors', description: 'Vibrant color sequences', icon: '🌈' },
      { key: 'sounds', name: 'Audio', description: 'Sound-based patterns', icon: '🔊' },
      { key: 'shapes', name: 'Shapes', description: 'Geometric patterns', icon: '⭐' },
      { key: 'arrows', name: 'Directions', description: 'Directional sequences', icon: '↗️' },
      { key: 'mixed', name: 'Mixed', description: 'Combined elements', icon: '🎨' }
    ],
    spatial: [
      { key: 'grid', name: 'Grid', description: 'Simple grid positions', icon: '⚡' },
      { key: 'maze', name: 'Maze', description: 'Path-based memory', icon: '🌀' },
      { key: 'objects', name: 'Objects', description: 'Object placement', icon: '📦' },
      { key: 'landmarks', name: 'Landmarks', description: 'Location memory', icon: '🗺️' },
      { key: 'dynamic', name: 'Dynamic', description: 'Moving elements', icon: '🚀' }
    ]
  };

  const gameVariants = variants[currentGame] || variants.pattern;

  const getGameTypeName = () => {
    const names = {
      pattern: 'Pattern Matching',
      sequence: 'Sequence Memory',
      spatial: 'Spatial Memory'
    };
    return names[currentGame] || 'Memory Game';
  };

  const isLevelUnlocked = (level) => {
    return unlockedLevels[currentGame]?.includes(level) || false;
  };

  const handleStart = () => {
    startGame(selectedDifficulty, selectedVariant);
  };

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">{getGameTypeName()}</h1>
              <p className="text-gray-400">Select difficulty and variant</p>
            </div>
            <button
              onClick={returnToMenu}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Difficulty Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-6">Difficulty Level</h2>
              <div className="space-y-3">
                {difficulties.map((diff) => {
                  const isUnlocked = isLevelUnlocked(diff.key);
                  const isSelected = selectedDifficulty === diff.key;
                  
                  return (
                    <div
                      key={diff.key}
                      onClick={() => isUnlocked && setSelectedDifficulty(diff.key)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        isUnlocked
                          ? isSelected
                            ? 'bg-cyan-600 border-2 border-cyan-400'
                            : 'bg-gray-700 hover:bg-gray-600 border-2 border-gray-600'
                          : 'bg-gray-900 border-2 border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{diff.icon}</span>
                          <div>
                            <div className="font-semibold">{diff.name}</div>
                            <div className="text-sm text-gray-400">{diff.description}</div>
                          </div>
                        </div>
                        {!isUnlocked && (
                          <i className="bi bi-lock-fill text-gray-500"></i>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Variant Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-6">Game Variant</h2>
              <div className="space-y-3">
                {gameVariants.map((variant) => {
                  const isSelected = selectedVariant === variant.key;
                  
                  return (
                    <div
                      key={variant.key}
                      onClick={() => setSelectedVariant(variant.key)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-600 border-2 border-purple-400'
                          : 'bg-gray-700 hover:bg-gray-600 border-2 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{variant.icon}</span>
                        <div>
                          <div className="font-semibold">{variant.name}</div>
                          <div className="text-sm text-gray-400">{variant.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleStart}
              disabled={!isLevelUnlocked(selectedDifficulty)}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                isLevelUnlocked(selectedDifficulty)
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Start Game
            </button>
            
            {/* Debug unlock button */}
            <div className="mt-4">
              <button
                onClick={() => debugUnlockLevel(currentGame, 'intermediate')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
              >
                Debug: Unlock Intermediate
              </button>
              <button
                onClick={() => debugUnlockLevel(currentGame, 'advanced')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm ml-2"
              >
                Debug: Unlock Advanced
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-400">
              Unlocked levels: {unlockedLevels[currentGame]?.join(', ') || 'none'}
              <br />Debug: {JSON.stringify(unlockedLevels)}
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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{getGameTypeName()}</h1>
              <p className="text-lg text-gray-600">Choose your challenge level and game style</p>
            </div>
            <button
              onClick={returnToMenu}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Menu
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Difficulty Selection */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Level</h2>
            <div className="space-y-4">
              {difficulties.map((diff) => {
                const isUnlocked = isLevelUnlocked(diff.key);
                const isSelected = selectedDifficulty === diff.key;
                
                return (
                  <div
                    key={diff.key}
                    onClick={() => isUnlocked && setSelectedDifficulty(diff.key)}
                    className={`p-6 rounded-lg cursor-pointer transition-all border-2 ${
                      isUnlocked
                        ? isSelected
                          ? 'bg-orange-100 border-orange-400'
                          : 'bg-white border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                        : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-3xl mr-4">{diff.icon}</span>
                        <div>
                          <div className="text-lg font-semibold text-gray-800">{diff.name}</div>
                          <div className="text-gray-600">{diff.description}</div>
                        </div>
                      </div>
                      {!isUnlocked ? (
                        <div className="text-center">
                          <i className="bi bi-lock-fill text-gray-400 text-xl"></i>
                          <div className="text-xs text-gray-400 mt-1">Locked</div>
                        </div>
                      ) : isSelected ? (
                        <i className="bi bi-check-circle-fill text-orange-500 text-xl"></i>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Variant Selection */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Game Style</h2>
            <div className="space-y-4">
              {gameVariants.map((variant) => {
                const isSelected = selectedVariant === variant.key;
                
                return (
                  <div
                    key={variant.key}
                    onClick={() => setSelectedVariant(variant.key)}
                    className={`p-6 rounded-lg cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'bg-blue-100 border-blue-400'
                        : 'bg-white border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-3xl mr-4">{variant.icon}</span>
                        <div>
                          <div className="text-lg font-semibold text-gray-800">{variant.name}</div>
                          <div className="text-gray-600">{variant.description}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <i className="bi bi-check-circle-fill text-blue-500 text-xl"></i>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Start Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center border border-orange-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Start?</h3>
          <p className="text-gray-600 mb-6">
            You've selected <strong>{difficulties.find(d => d.key === selectedDifficulty)?.name}</strong> difficulty 
            with <strong>{gameVariants.find(v => v.key === selectedVariant)?.name}</strong> style.
          </p>
          <button
            onClick={handleStart}
            disabled={!isLevelUnlocked(selectedDifficulty)}
            className={`px-12 py-4 rounded-lg font-bold text-lg transition-all ${
              isLevelUnlocked(selectedDifficulty)
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLevelUnlocked(selectedDifficulty) ? 'Start Your Challenge!' : 'Level Locked'}
          </button>
          {!isLevelUnlocked(selectedDifficulty) && (
            <p className="text-sm text-gray-500 mt-2">
              Complete previous levels with 75% accuracy to unlock this difficulty
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
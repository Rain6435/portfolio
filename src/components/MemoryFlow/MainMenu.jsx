import { useGame } from './GameContext';

const MainMenu = () => {
  const { 
    theme, 
    streak, 
    sessionsPlayed, 
    selectGameType, 
    toggleTheme,
    showProgressScreen
  } = useGame();

  const isFocusMode = theme === 'focus';

  const gameTypes = [
    {
      id: 'pattern',
      name: 'Pattern Match',
      description: isFocusMode ? '2 mins' : 'Great for visual memory',
      icon: 'bi-grid-3x3',
      color: isFocusMode ? 'from-cyan-500 to-blue-600' : 'from-orange-400 to-red-500',
      estimatedTime: '5-8 minutes'
    },
    {
      id: 'sequence',
      name: 'Sequence',
      description: isFocusMode ? '3 mins' : 'Builds working memory',
      icon: 'bi-arrow-repeat',
      color: isFocusMode ? 'from-purple-500 to-pink-600' : 'from-blue-400 to-purple-500',
      estimatedTime: '4-6 minutes'
    },
    {
      id: 'spatial',
      name: 'Spatial',
      description: isFocusMode ? '4 mins' : 'Tests position memory',
      icon: 'bi-geo-alt',
      color: isFocusMode ? 'from-green-500 to-teal-600' : 'from-green-400 to-blue-500',
      estimatedTime: '6-10 minutes'
    }
  ];


  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">MemoryFlow</h1>
              <p className="text-gray-400">Quick Training Session</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-cyan-400 text-2xl font-bold">{streak}</div>
                <div className="text-gray-400 text-sm">Day Streak</div>
              </div>
              <button
                onClick={toggleTheme}
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                title="Switch to Comfort Mode"
              >
                <i className="bi bi-moon text-cyan-400"></i>
              </button>
            </div>
          </div>

          {/* Game Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {gameTypes.map((game) => (
              <div
                key={game.id}
                onClick={() => selectGameType(game.id)}
                className={`bg-gradient-to-br ${game.color} p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform`}
              >
                <i className={`${game.icon} text-3xl mb-2`}></i>
                <div className="font-semibold">{game.name}</div>
                <div className="text-sm opacity-80">{game.description}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {streak > 0 && <span className="bg-cyan-500 text-xs px-2 py-1 rounded">🏆 Speed Master</span>}
              {streak > 3 && <span className="bg-purple-500 text-xs px-2 py-1 rounded">⚡ Streak King</span>}
            </div>
            <button 
              onClick={() => selectGameType('pattern')}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Quick Start
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            {sessionsPlayed} sessions completed
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">MemoryFlow</h1>
              <p className="text-lg text-gray-600">Ready for today's brain training session?</p>
            </div>
            <button
              onClick={toggleTheme}
              className="bg-orange-100 hover:bg-orange-200 p-3 rounded-lg transition-colors"
              title="Switch to Focus Mode"
            >
              <i className="bi bi-sun text-orange-600 text-xl"></i>
            </button>
          </div>
          
          {sessionsPlayed > 0 && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block">
              <i className="bi bi-check-circle me-2"></i>
              {streak > 0 ? `${streak} days this week - Great progress!` : `${sessionsPlayed} sessions completed - Keep it up!`}
            </div>
          )}
        </div>

        {/* Game Selection */}
        <div className="space-y-4 mb-8">
          {gameTypes.map((game) => (
            <div
              key={game.id}
              className="bg-white p-6 rounded-lg shadow-md border-2 border-orange-200 hover:border-orange-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <i className={`${game.icon} text-2xl text-orange-600`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{game.name}</h3>
                    <p className="text-gray-600">{game.description}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="bg-gray-100 px-2 py-1 rounded mr-2">Beginner Level</span>
                      Estimated time: {game.estimatedTime}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => selectGameType(game.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Select Level
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Help and Progress */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium">
            <i className="bi bi-question-circle me-2"></i>
            How to Play Tutorial
          </button>
          <button 
            onClick={showProgressScreen}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            <i className="bi bi-graph-up me-2"></i>
            View My Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
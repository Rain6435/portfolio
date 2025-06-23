import { useGame } from './GameContext';

const ProgressScreen = () => {
  const { 
    theme, 
    gameHistory, 
    overallStats, 
    returnToMenu,
    streak
  } = useGame();

  const isFocusMode = theme === 'focus';

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getGameTypeIcon = (gameType) => {
    const icons = {
      pattern: 'bi-grid-3x3',
      sequence: 'bi-arrow-repeat',
      spatial: 'bi-geo-alt'
    };
    return icons[gameType] || 'bi-controller';
  };

  const getGameTypeName = (gameType) => {
    const names = {
      pattern: 'Pattern Match',
      sequence: 'Sequence Memory',
      spatial: 'Spatial Memory'
    };
    return names[gameType] || gameType;
  };

  const recentSessions = gameHistory.slice(0, 10);
  const totalSessions = Object.values(overallStats).reduce((sum, stat) => sum + stat.sessionsPlayed, 0);
  const avgAccuracy = totalSessions > 0 
    ? Math.round(Object.values(overallStats).reduce((sum, stat) => sum + (stat.averageAccuracy * stat.sessionsPlayed), 0) / totalSessions)
    : 0;

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">Progress Analytics</h1>
              <p className="text-gray-400">Track your cognitive training performance</p>
            </div>
            <button
              onClick={returnToMenu}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Menu
            </button>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalSessions}</div>
              <div className="text-gray-400 text-sm">Total Sessions</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{avgAccuracy}%</div>
              <div className="text-gray-400 text-sm">Avg Accuracy</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{streak}</div>
              <div className="text-gray-400 text-sm">Current Streak</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {Math.max(...Object.values(overallStats).map(s => s.bestAccuracy))}%
              </div>
              <div className="text-gray-400 text-sm">Best Accuracy</div>
            </div>
          </div>

          {/* Game Type Stats */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-cyan-400 mb-6">Performance by Game Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(overallStats).map(([gameType, stats]) => (
                <div key={gameType} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <i className={`${getGameTypeIcon(gameType)} text-cyan-400 text-xl me-3`}></i>
                    <h3 className="font-semibold">{getGameTypeName(gameType)}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sessions:</span>
                      <span>{stats.sessionsPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best Accuracy:</span>
                      <span className="text-green-400">{stats.bestAccuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Accuracy:</span>
                      <span>{stats.averageAccuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best Time:</span>
                      <span className="text-yellow-400">
                        {stats.bestTime < 999 ? formatTime(stats.bestTime) : '--'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-6">Recent Sessions</h2>
            <div className="space-y-3">
              {recentSessions.length > 0 ? recentSessions.map((session) => (
                <div key={session.id} className="bg-gray-900 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <i className={`${getGameTypeIcon(session.gameType)} text-cyan-400 text-lg me-3`}></i>
                    <div>
                      <div className="font-medium">{getGameTypeName(session.gameType)}</div>
                      <div className="text-gray-400 text-sm">
                        {session.difficulty} • {formatDate(session.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">{session.accuracy}%</div>
                    <div className="text-gray-400 text-sm">{formatTime(session.timeElapsed)}</div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-400 py-8">
                  No sessions yet. Start playing to track your progress!
                </div>
              )}
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Progress Report</h1>
              <p className="text-lg text-gray-600">See how you're improving over time</p>
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

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-orange-200">
            <div className="text-4xl font-bold text-orange-600 mb-2">{totalSessions}</div>
            <div className="text-gray-600 font-medium">Total Sessions</div>
            <div className="text-sm text-gray-500 mt-1">Keep it up!</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-green-200">
            <div className="text-4xl font-bold text-green-600 mb-2">{avgAccuracy}%</div>
            <div className="text-gray-600 font-medium">Average Score</div>
            <div className="text-sm text-gray-500 mt-1">Great progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-blue-200">
            <div className="text-4xl font-bold text-blue-600 mb-2">{streak}</div>
            <div className="text-gray-600 font-medium">Day Streak</div>
            <div className="text-sm text-gray-500 mt-1">Consistency wins</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border border-purple-200">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {Math.max(...Object.values(overallStats).map(s => s.bestAccuracy))}%
            </div>
            <div className="text-gray-600 font-medium">Personal Best</div>
            <div className="text-sm text-gray-500 mt-1">Amazing!</div>
          </div>
        </div>

        {/* Game Type Progress */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Skills Development</h2>
          <div className="space-y-6">
            {Object.entries(overallStats).map(([gameType, stats]) => (
              <div key={gameType} className="border-l-4 border-orange-400 pl-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-full mr-3">
                      <i className={`${getGameTypeIcon(gameType)} text-orange-600 text-lg`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{getGameTypeName(gameType)}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{stats.averageAccuracy}%</div>
                    <div className="text-sm text-gray-500">Average</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Sessions: </span>
                    <span className="font-medium">{stats.sessionsPlayed}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Best Score: </span>
                    <span className="font-medium text-green-600">{stats.bestAccuracy}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Best Time: </span>
                    <span className="font-medium text-blue-600">
                      {stats.bestTime < 999 ? formatTime(stats.bestTime) : 'Not set'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                  <div 
                    className="bg-orange-400 h-3 rounded-full transition-all duration-500"
                    style={{width: `${Math.min(stats.averageAccuracy, 100)}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {totalSessions === 0 && (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-4">🎯</div>
              <p>Start playing games to see your progress here!</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentSessions.length > 0 ? recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-4">
                    <i className={`${getGameTypeIcon(session.gameType)} text-orange-600`}></i>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{getGameTypeName(session.gameType)}</div>
                    <div className="text-sm text-gray-500">
                      {session.difficulty} level • {formatDate(session.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{session.accuracy}%</div>
                  <div className="text-sm text-gray-500">{formatTime(session.timeElapsed)}</div>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">📊</div>
                <p>Your recent game sessions will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;
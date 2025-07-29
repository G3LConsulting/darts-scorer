import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameProfessional.css';

const MatchReport = ({ matchData, onNewGame, onRematch }) => {
  const navigate = useNavigate();

  const calculateGameStatistics = (player) => {
    const { allThrows } = player;

    if (allThrows.length === 0) {
      return {
        gameAverage: 0,
        bestLegAverage: 0,
        highestScore: 0,
        highestFinish: 0,
      };
    }

    // Game average (across all throws in match)
    const totalScore = allThrows.reduce((sum, score) => sum + score, 0);
    const totalDarts = allThrows.length * 3;
    const gameAverage =
      totalDarts > 0 ? ((totalScore / totalDarts) * 3).toFixed(1) : 0;

    // Best leg average - for now, approximate with game average
    // In a full implementation, we'd track per-leg statistics
    const bestLegAverage = gameAverage;

    // Highest score in a single throw
    const highestScore = allThrows.length > 0 ? Math.max(...allThrows) : 0;

    // Highest finish - look for reasonable finishing scores
    // Filter for scores that could be legitimate finishes (2-170, excluding common high scores like 180)
    const potentialFinishes = allThrows.filter(
      (score) =>
        (score >= 2 &&
          score <= 170 &&
          score !== 180 && // Exclude maximum score
          score % 2 === 0) || // Even numbers (doubles)
        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25].includes(score) // Odd singles up to 25
    );

    const highestFinish =
      potentialFinishes.length > 0 ? Math.max(...potentialFinishes) : 0;

    return {
      gameAverage: parseFloat(gameAverage),
      bestLegAverage: parseFloat(bestLegAverage),
      highestScore,
      highestFinish,
    };
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const { gameType, bestOf, players, winner } = matchData;
  const loser = players.find((p) => p.id !== winner.id);

  const winnerStats = calculateGameStatistics(winner);
  const loserStats = calculateGameStatistics(loser);

  return (
    <div className="game-container">
      {/* Match Report Header */}
      <div className="match-header">
        <button className="back-btn" onClick={handleBackClick}>
          ←
        </button>
        <h1 className="match-title">MATCH REPORT</h1>
        <div className="match-actions"></div>
      </div>

      {/* Report Content */}
      <div className="match-report-content">
        {/* Winner Section */}
        <div className="winner-section">
          <div className="winner-crown">👑</div>
          <h2 className="winner-title">MATCH WINNER</h2>
          <h3 className="winner-name">{winner.name}</h3>
          <div className="winner-score">
            {winner.legs} - {loser.legs}
          </div>
          <div className="match-details">
            {gameType} • Best of {bestOf}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <h3 className="stats-title">MATCH STATISTICS</h3>

          <div className="stats-grid">
            {/* Winner Column */}
            <div className="player-stats winner-stats">
              <div className="player-stats-header">
                <span className="player-stats-name">{winner.name}</span>
                <span className="winner-badge">WINNER</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Avg Game Score</span>
                <span className="stat-value">{winnerStats.gameAverage}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Best Leg Avg</span>
                <span className="stat-value">{winnerStats.bestLegAverage}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Highest Score</span>
                <span className="stat-value">{winnerStats.highestScore}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Highest Finish</span>
                <span className="stat-value">
                  {winnerStats.highestFinish || '-'}
                </span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Legs Won</span>
                <span className="stat-value">{winner.legs}</span>
              </div>
            </div>

            {/* VS Divider */}
            <div className="vs-divider">
              <span>VS</span>
            </div>

            {/* Loser Column */}
            <div className="player-stats loser-stats">
              <div className="player-stats-header">
                <span className="player-stats-name">{loser.name}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Avg Game Score</span>
                <span className="stat-value">{loserStats.gameAverage}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Best Leg Avg</span>
                <span className="stat-value">{loserStats.bestLegAverage}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Highest Score</span>
                <span className="stat-value">{loserStats.highestScore}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Highest Finish</span>
                <span className="stat-value">
                  {loserStats.highestFinish || '-'}
                </span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Legs Won</span>
                <span className="stat-value">{loser.legs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="report-actions">
          <button className="report-btn secondary" onClick={onRematch}>
            REMATCH
          </button>
          <button className="report-btn primary" onClick={onNewGame}>
            NEW GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchReport;

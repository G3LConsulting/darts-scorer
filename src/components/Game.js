import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameProfessional.css';
import NumPad from './NumPad';
import Notification from './Notification';

const Game = () => {
  const navigate = useNavigate();
  const [gameType, setGameType] = useState(501);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Player 1',
      score: gameType,
      throws: [],
      legs: 0,
      allThrows: [],
    },
    {
      id: 2,
      name: 'Player 2',
      score: gameType,
      throws: [],
      legs: 0,
      allThrows: [],
    },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentThrow, setCurrentThrow] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [bestOf, setBestOf] = useState(3);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showNotification = (message, type = 'info', duration = 3000) => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  const handleGameTypeChange = (newGameType) => {
    setGameType(newGameType);
    // Update players' scores to match new game type
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        score: newGameType,
      }))
    );
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const handleThrowSubmit = () => {
    const throwValue = parseInt(currentThrow);

    if (isNaN(throwValue) || throwValue < 0) {
      showNotification('Please enter a valid score', 'error');
      return;
    }

    if (throwValue > 180) {
      showNotification('Maximum possible score is 180', 'error');
      return;
    }

    if (throwValue > players[currentPlayer].score) {
      showNotification(
        `Score exceeds remaining points! You have ${players[currentPlayer].score} left.`,
        'error'
      );
      return;
    }

    // Calculate new score
    const newScore = players[currentPlayer].score - throwValue;

    // Check for bust scenario (score would go below 2)
    if (newScore < 0 || newScore === 1) {
      showNotification(
        `Bust! This throw would leave you with ${newScore} points. You need at least 2 points to finish with a double.`,
        'bust'
      );
      return;
    }

    if (newScore === 0) {
      // Check if it's a valid double out finish
      if (!isValidDoubleOut(throwValue, players[currentPlayer].score)) {
        showNotification('You must finish with a double! Try again.', 'error');
        return;
      }

      // Winner of the leg! Use functional update
      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.map((player, index) => {
          if (index === currentPlayer) {
            return {
              ...player,
              score: 0,
              throws: [...player.throws, throwValue],
              allThrows: [...player.allThrows, throwValue],
              legs: player.legs + 1,
            };
          }
          return player;
        });

        // Check if match is won
        const legsToWin = Math.ceil(bestOf / 2);
        const winner = updatedPlayers[currentPlayer];

        if (winner.legs >= legsToWin) {
          setTimeout(() => {
            showNotification(
              `${winner.name} wins the match ${winner.legs}-${
                updatedPlayers[1 - currentPlayer].legs
              }!`,
              'trophy',
              5000
            );
          }, 100);
        } else {
          // Reset for next leg
          setTimeout(() => {
            showNotification(`${winner.name} wins the leg!`, 'success', 2000);
            setPlayers((prevPlayers) =>
              prevPlayers.map((p) => ({
                ...p,
                score: gameType,
                throws: [],
              }))
            );
            setCurrentThrow('');
          }, 100);
        }

        return updatedPlayers;
      });
      return;
    }

    // Valid throw - use functional update to only update the current player
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayer) {
          return {
            ...player,
            score: newScore,
            throws: [...player.throws, throwValue],
            allThrows: [...player.allThrows, throwValue],
          };
        }
        return player;
      })
    );
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setCurrentThrow('');
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        score: gameType,
        throws: [],
        legs: 0,
        allThrows: [],
      }))
    );
    setCurrentPlayer(0);
    setCurrentThrow('');
    setGameStarted(false);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const calculateAverage = (throws) => {
    if (throws.length === 0) return 0;
    const sum = throws.reduce((acc, val) => acc + val, 0);
    const dartsThrown = throws.length * 3; // Each throw entry represents 3 darts
    return ((sum / dartsThrown) * 3).toFixed(1); // Average per 3 darts
  };

  const isValidDoubleOut = (throwValue, currentScore) => {
    // Validate double out finish according to darts rules
    // throwValue is the total score being entered for this turn
    // currentScore is the remaining score before this throw

    // Must equal the remaining score to finish
    if (throwValue !== currentScore) {
      return false;
    }

    // Rule 1: If score is 50 or below, it must be even (finishable with a double)
    if (currentScore <= 50) {
      return currentScore % 2 === 0 && currentScore >= 2;
    }

    // Rule 2: If score is above 50, it must be 170 or less (max possible finish)
    // and should be theoretically finishable with a double out
    if (currentScore <= 170) {
      // For simplicity, we'll allow any score that could theoretically be finished
      // A more complete implementation would check all valid finish combinations
      return true;
    }

    // Scores above 170 cannot be finished in one turn
    return false;
  };

  const handleUndoLastThrow = () => {
    // Find the last player who threw
    let lastPlayerIndex = currentPlayer - 1;
    if (lastPlayerIndex < 0) {
      lastPlayerIndex = players.length - 1;
    }

    if (players[lastPlayerIndex].throws.length > 0) {
      // Use functional update to only modify the specific player
      setPlayers((prevPlayers) =>
        prevPlayers.map((player, index) => {
          if (index === lastPlayerIndex) {
            const throws = [...player.throws];
            const allThrows = [...player.allThrows];
            const lastThrow = throws.pop();
            allThrows.pop();

            return {
              ...player,
              throws,
              allThrows,
              score: player.score + lastThrow,
            };
          }
          return player;
        })
      );

      // Switch back to the player who threw last
      setCurrentPlayer(lastPlayerIndex);
    }
  };

  if (!gameStarted) {
    return (
      <>
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
        />
        <div className="game">
          <div className="game-setup">
            <h2>Setup New Game</h2>
            <div className="players-setup">
              {players.map((player, index) => (
                <div key={player.id} className="player-setup">
                  <label>
                    Player {index + 1} Name:
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => {
                        const newPlayers = [...players];
                        newPlayers[index].name = e.target.value;
                        setPlayers(newPlayers);
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className="game-settings-setup">
              <div className="game-type-setup">
                <label>
                  Game Type:
                  <select
                    value={gameType}
                    onChange={(e) =>
                      handleGameTypeChange(parseInt(e.target.value))
                    }
                    className="game-type-select"
                  >
                    <option value={101}>101</option>
                    <option value={201}>201</option>
                    <option value={301}>301</option>
                    <option value={401}>401</option>
                    <option value={501}>501</option>
                    <option value={601}>601</option>
                    <option value={701}>701</option>
                    <option value={801}>801</option>
                    <option value={901}>901</option>
                    <option value={1001}>1001</option>
                  </select>
                </label>
                <div className="game-type-info">
                  Each player starts with {gameType} points
                </div>
              </div>

              <div className="match-format-setup">
                <label>
                  Match Format:
                  <select
                    value={bestOf}
                    onChange={(e) => setBestOf(parseInt(e.target.value))}
                    className="match-format-select"
                  >
                    <option value={1}>Best of 1</option>
                    <option value={3}>Best of 3</option>
                    <option value={5}>Best of 5</option>
                    <option value={7}>Best of 7</option>
                    <option value={9}>Best of 9</option>
                    <option value={11}>Best of 11</option>
                  </select>
                </label>
                <div className="match-format-info">
                  First to {Math.ceil(bestOf / 2)} legs wins
                </div>
              </div>
            </div>
            <button className="btn btn-primary" onClick={startGame}>
              Start Game
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      <div className="game-container">
        {/* Match Header */}
        <div className="match-header">
          <button className="back-btn" onClick={handleBackClick}>
            ←
          </button>
          <h1 className="match-title">
            {gameType} - BEST OF {bestOf}
          </h1>
          <div className="match-actions">
            <button className="reset-btn" onClick={resetGame}>
              ⋯
            </button>
          </div>
        </div>

        {/* Players Header */}
        <div className="players-header">
          <div
            className={`player-header ${currentPlayer === 0 ? 'active' : ''}`}
          >
            <span className="player-indicator">●</span>
            <span className="player-name">{players[0].name}</span>
            <span className="legs-won">({players[0].legs})</span>
          </div>
          <div
            className={`player-header ${currentPlayer === 1 ? 'active' : ''}`}
          >
            <span className="legs-won">({players[1].legs})</span>
            <span className="player-name">{players[1].name}</span>
            <span className="player-indicator">●</span>
          </div>
        </div>

        {/* Legs Display */}
        <div className="legs-display">
          <div className="legs-label">legs</div>
          <div className="legs-scores">
            <div className="leg-score">{players[0].legs}</div>
            <div className="leg-score">{players[1].legs}</div>
          </div>
        </div>

        {/* Main Scoreboard */}
        <div className="main-scoreboard">
          <div
            className={`player-score-section ${
              currentPlayer === 0 ? 'active' : ''
            }`}
          >
            <div className="main-score">{players[0].score}</div>
            <div className="score-info">
              <span>
                wg: {calculateAverage(players[0].allThrows)} | lg:{' '}
                {calculateAverage(players[0].throws)}
              </span>
            </div>
          </div>

          <div className="center-divider"></div>

          <div
            className={`player-score-section ${
              currentPlayer === 1 ? 'active' : ''
            }`}
          >
            <div className="main-score">{players[1].score}</div>
            <div className="score-info">
              <span>
                wg: {calculateAverage(players[1].allThrows)} | lg:{' '}
                {calculateAverage(players[1].throws)}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Half - Input and NumPad */}
        <div className="bottom-half">
          {/* Score Input Area */}
          <div className="score-input-area">
            <div className="score-input-display">
              <input
                type="text"
                value={currentThrow}
                readOnly
                className="score-display"
                placeholder="Voer score in"
              />
              <button
                className="undo-btn"
                onClick={handleUndoLastThrow}
                disabled={!players.some((p) => p.throws.length > 0)}
                title="Undo last throw"
              >
                ↶
              </button>
            </div>
          </div>

          {/* NumPad */}
          <div className="game-numpad">
            <NumPad
              value={currentThrow}
              onChange={setCurrentThrow}
              onSubmit={handleThrowSubmit}
              maxValue={Math.min(180, players[currentPlayer].score)}
              layout="professional"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;

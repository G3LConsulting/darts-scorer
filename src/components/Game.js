import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameProfessional.css';
import NumPad from './NumPad';

const Game = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', score: 501, throws: [], legs: 0, allThrows: [] },
    { id: 2, name: 'Player 2', score: 501, throws: [], legs: 0, allThrows: [] },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentThrow, setCurrentThrow] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [bestOf, setBestOf] = useState(3);

  const handleThrowSubmit = () => {
    const throwValue = parseInt(currentThrow);

    if (isNaN(throwValue) || throwValue < 0) {
      alert('Please enter a valid score');
      return;
    }

    if (throwValue > 180) {
      alert('Maximum possible score is 180');
      return;
    }

    const newPlayers = [...players];
    const player = newPlayers[currentPlayer];

    if (throwValue > player.score) {
      alert(`Score exceeds remaining points! You have ${player.score} left.`);
      return;
    }

    // Calculate new score
    const newScore = player.score - throwValue;

    if (newScore === 0) {
      // Winner of the leg!
      player.score = newScore;
      player.throws.push(throwValue);
      player.allThrows.push(throwValue);
      player.legs += 1;

      // Check if match is won
      const legsToWin = Math.ceil(bestOf / 2);
      if (player.legs >= legsToWin) {
        setPlayers(newPlayers);
        setTimeout(() => {
          alert(
            `🏆 ${player.name} wins the match ${player.legs}-${
              newPlayers[1 - currentPlayer].legs
            }!`
          );
        }, 100);
        return;
      }

      // Reset for next leg
      setTimeout(() => {
        alert(`🎯 ${player.name} wins the leg!`);
        const resetPlayers = newPlayers.map((p) => ({
          ...p,
          score: 501,
          throws: [],
        }));
        setPlayers(resetPlayers);
        setCurrentThrow('');
      }, 100);
      return;
    }

    if (newScore === 1) {
      // Can't finish on 1 in standard 501 (need double to finish)
      alert("Can't finish on 1! You need a double to finish.");
      return;
    }

    // Valid throw
    player.score = newScore;
    player.throws.push(throwValue);
    player.allThrows.push(throwValue); // Track all throws for game average
    setPlayers(newPlayers);
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setCurrentThrow('');
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayers(
      players.map((player) => ({
        ...player,
        score: 501,
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
    const dartsThrown = Math.ceil(throws.length / 3) * 3; // Each turn is 3 darts
    return ((sum / dartsThrown) * 3).toFixed(1);
  };

  const handleUndoLastThrow = () => {
    // Find the last player who threw
    let lastPlayerIndex = currentPlayer - 1;
    if (lastPlayerIndex < 0) {
      lastPlayerIndex = players.length - 1;
    }

    const newPlayers = [...players];
    const lastPlayer = newPlayers[lastPlayerIndex];

    if (lastPlayer.throws.length > 0) {
      // Remove the last throw and add it back to the score
      const lastThrow = lastPlayer.throws.pop();
      lastPlayer.allThrows.pop(); // Also remove from allThrows
      lastPlayer.score += lastThrow;

      // Switch back to the player who threw last
      setCurrentPlayer(lastPlayerIndex);
      setPlayers(newPlayers);
    }
  };

  if (!gameStarted) {
    return (
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
          <button className="btn btn-primary" onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Match Header */}
      <div className="match-header">
        <button className="back-btn" onClick={handleBackClick}>
          ←
        </button>
        <h1 className="match-title">BEST OF {bestOf}</h1>
        <div className="match-actions">
          <button className="reset-btn" onClick={resetGame}>
            ⋯
          </button>
        </div>
      </div>

      {/* Players Header */}
      <div className="players-header">
        <div className={`player-header ${currentPlayer === 0 ? 'active' : ''}`}>
          <span className="player-indicator">●</span>
          <span className="player-name">{players[0].name}</span>
          <span className="legs-won">({players[0].legs})</span>
        </div>
        <div className={`player-header ${currentPlayer === 1 ? 'active' : ''}`}>
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
  );
};

export default Game;

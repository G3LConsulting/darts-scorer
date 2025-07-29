import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameProfessional.css';
import Notification from './Notification';

const GameSetup = ({ onStartGame }) => {
  const navigate = useNavigate();
  const [gameType, setGameType] = useState(501);
  const [bestOf, setBestOf] = useState(3);
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Player 1',
      score: 501,
      throws: [],
      legs: 0,
      allThrows: [],
    },
    {
      id: 2,
      name: 'Player 2',
      score: 501,
      throws: [],
      legs: 0,
      allThrows: [],
    },
  ]);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
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

  const handleBackClick = () => {
    navigate('/');
  };

  const handleStartGame = () => {
    const gameConfig = {
      gameType,
      bestOf,
      players,
    };
    onStartGame(gameConfig);
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      <div className="game-container">
        {/* Setup Header */}
        <div className="match-header">
          <button className="back-btn" onClick={handleBackClick}>
            ←
          </button>
          <h1 className="match-title">SETUP NEW GAME</h1>
          <div className="match-actions"></div>
        </div>

        {/* Setup Content */}
        <div className="setup-content">
          {/* Game Settings Section */}
          <div className="setup-section">
            <h3 className="setup-section-title">Game Settings</h3>
            <div className="setup-row">
              <div className="setup-control">
                <label className="setup-label">Game Type</label>
                <select
                  value={gameType}
                  onChange={(e) =>
                    handleGameTypeChange(parseInt(e.target.value))
                  }
                  className="setup-select"
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
                <div className="setup-info">
                  Each player starts with {gameType} points
                </div>
              </div>

              <div className="setup-control">
                <label className="setup-label">Match Format</label>
                <select
                  value={bestOf}
                  onChange={(e) => setBestOf(parseInt(e.target.value))}
                  className="setup-select"
                >
                  <option value={1}>Best of 1</option>
                  <option value={3}>Best of 3</option>
                  <option value={5}>Best of 5</option>
                  <option value={7}>Best of 7</option>
                  <option value={9}>Best of 9</option>
                  <option value={11}>Best of 11</option>
                </select>
                <div className="setup-info">
                  First to {Math.ceil(bestOf / 2)} legs wins
                </div>
              </div>
            </div>
          </div>

          {/* Players Section */}
          <div className="setup-section">
            <h3 className="setup-section-title">Players</h3>
            <div className="setup-row">
              {players.map((player, index) => (
                <div key={player.id} className="setup-control">
                  <label className="setup-label">Player {index + 1} Name</label>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => {
                      const newPlayers = [...players];
                      newPlayers[index].name = e.target.value;
                      setPlayers(newPlayers);
                    }}
                    className="setup-input"
                    placeholder={`Player ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Start Game Section */}
          <div className="setup-section">
            <div className="setup-preview">
              <div className="setup-preview-title">Match Preview</div>
              <div className="setup-preview-details">
                <div className="preview-line">
                  <span className="preview-label">Game:</span>
                  <span className="preview-value">{gameType} Darts</span>
                </div>
                <div className="preview-line">
                  <span className="preview-label">Format:</span>
                  <span className="preview-value">Best of {bestOf}</span>
                </div>
                <div className="preview-line">
                  <span className="preview-label">Players:</span>
                  <span className="preview-value">
                    {players[0].name} vs {players[1].name}
                  </span>
                </div>
              </div>
            </div>

            <button className="setup-start-btn" onClick={handleStartGame}>
              START GAME
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSetup;

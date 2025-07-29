import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h2>Welcome to Darts Scorer</h2>
        <p>Track your 501 darts games with this mobile-first PWA</p>

        <div className="home-actions">
          <Link to="/game" className="btn btn-primary">
            Start New Game
          </Link>
          <Link to="/settings" className="btn btn-secondary">
            Settings
          </Link>
        </div>

        <div className="home-features">
          <h3>Features</h3>
          <ul>
            <li>🎯 Track 501 darts games</li>
            <li>📱 Mobile-optimized interface</li>
            <li>🏆 Match and leg management</li>
            <li>💾 Local storage support</li>
            <li>📊 Game statistics (coming soon)</li>
          </ul>
        </div>

        <div className="home-rules">
          <h3>Standard 501 Rules</h3>
          <ul>
            <li>Each player starts with 501 points</li>
            <li>Subtract the score of each turn from the total</li>
            <li>First to exactly 0 wins the leg</li>
            <li>Must finish with a double</li>
            <li>Best of X legs wins the match</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

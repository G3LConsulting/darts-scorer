import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <Link to="/" className="header-link">
            🎯 Darts Scorer
          </Link>
        </h1>
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/game"
            className={`nav-link ${
              location.pathname === '/game' ? 'active' : ''
            }`}
          >
            Game
          </Link>
          <Link
            to="/settings"
            className={`nav-link ${
              location.pathname === '/settings' ? 'active' : ''
            }`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

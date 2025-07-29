import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import Game from './components/Game';
import Settings from './components/Settings';
import Header from './components/Header';

function AppContent() {
  const location = useLocation();
  const isGamePage = location.pathname === '/game';

  return (
    <div className="App">
      {!isGamePage && <Header />}
      <main className={`main-content ${isGamePage ? 'full-screen' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

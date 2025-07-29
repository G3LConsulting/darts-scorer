import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    gameType: '501',
    bestOf: 3,
    doubleOut: true,
    soundEnabled: true,
    theme: 'light',
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('dartsSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  const resetSettings = () => {
    const defaultSettings = {
      gameType: '501',
      bestOf: 3,
      doubleOut: true,
      soundEnabled: true,
      theme: 'light',
    };
    setSettings(defaultSettings);
    localStorage.removeItem('dartsSettings');
    alert('Settings reset to defaults!');
  };

  return (
    <div className="settings">
      <div className="settings-content">
        <h2>Settings</h2>

        <div className="settings-section">
          <h3>Game Settings</h3>

          <div className="setting-item">
            <label>
              Game Type:
              <select
                value={settings.gameType}
                onChange={(e) =>
                  handleSettingChange('gameType', e.target.value)
                }
              >
                <option value="501">501</option>
                <option value="301">301 (coming soon)</option>
                <option value="701">701 (coming soon)</option>
              </select>
            </label>
          </div>

          <div className="setting-item">
            <label>
              Best of:
              <select
                value={settings.bestOf}
                onChange={(e) =>
                  handleSettingChange('bestOf', parseInt(e.target.value))
                }
              >
                <option value={1}>1 Leg</option>
                <option value={3}>3 Legs</option>
                <option value={5}>5 Legs</option>
                <option value={7}>7 Legs</option>
              </select>
            </label>
          </div>

          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.doubleOut}
                onChange={(e) =>
                  handleSettingChange('doubleOut', e.target.checked)
                }
              />
              Double Out Required
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>App Settings</h3>

          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) =>
                  handleSettingChange('soundEnabled', e.target.checked)
                }
              />
              Sound Effects
            </label>
          </div>

          <div className="setting-item">
            <label>
              Theme:
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark (coming soon)</option>
              </select>
            </label>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn btn-primary" onClick={saveSettings}>
            Save Settings
          </button>
          <button className="btn btn-secondary" onClick={resetSettings}>
            Reset to Defaults
          </button>
        </div>

        <div className="settings-info">
          <h3>About</h3>
          <p>Darts Scorer v0.1.0</p>
          <p>A mobile-first PWA for tracking 501 darts games</p>
          <p>
            <a
              href="https://github.com/G3LConsulting/darts-scorer"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

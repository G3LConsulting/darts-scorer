import React from 'react';
import '../styles/NumPad.css';

const NumPad = ({
  value,
  onChange,
  onSubmit,
  maxValue = 180,
  layout = 'default',
}) => {
  const handleNumberClick = (num) => {
    const newValue = value + num.toString();
    const numericValue = parseInt(newValue);

    if (numericValue <= maxValue) {
      onChange(newValue);
    }
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange('');
  };

  const handleSubmit = () => {
    if (value && parseInt(value) >= 0) {
      onSubmit();
    }
  };

  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['C', 0, 'OK'],
  ];

  if (layout === 'professional') {
    return (
      <div className="numpad-professional">
        <div className="numpad-grid-pro">
          {numbers.flat().map((item, index) => (
            <button
              key={index}
              className={`numpad-btn-pro ${
                item === 'C'
                  ? 'numpad-clear-pro'
                  : item === 'OK'
                  ? 'numpad-submit-pro'
                  : 'numpad-number-pro'
              }`}
              onClick={() => {
                if (item === 'C') {
                  handleClear();
                } else if (item === 'OK') {
                  handleSubmit();
                } else {
                  handleNumberClick(item);
                }
              }}
              disabled={
                item === 'OK' &&
                (!value || parseInt(value) < 0 || parseInt(value) > maxValue)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="numpad">
      <div className="numpad-display">
        <input
          type="text"
          value={value}
          readOnly
          className="numpad-input"
          placeholder="Enter score..."
        />
      </div>

      <div className="numpad-grid">
        {numbers
          .slice(0, 3)
          .flat()
          .map((item, index) => (
            <button
              key={index}
              className={`numpad-btn ${
                item === 'C'
                  ? 'numpad-clear'
                  : item === '⌫'
                  ? 'numpad-backspace'
                  : 'numpad-number'
              }`}
              onClick={() => {
                if (item === 'C') {
                  handleClear();
                } else if (item === '⌫') {
                  handleBackspace();
                } else {
                  handleNumberClick(item);
                }
              }}
            >
              {item}
            </button>
          ))}
      </div>

      <div className="numpad-actions">
        <button
          className="btn btn-primary numpad-submit"
          onClick={handleSubmit}
          disabled={!value || parseInt(value) < 0 || parseInt(value) > maxValue}
        >
          Submit Score
        </button>
      </div>

      <div className="numpad-info">
        <small>
          {value && parseInt(value) > maxValue && (
            <span className="error">Score cannot exceed {maxValue}</span>
          )}
          {value && parseInt(value) < 0 && (
            <span className="error">Score cannot be negative</span>
          )}
        </small>
      </div>
    </div>
  );
};

export default NumPad;

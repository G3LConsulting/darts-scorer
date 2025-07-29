# Darts Scorer - Game Functionality Documentation

## Overview
The Darts Scorer is a Progressive Web App (PWA) designed for tracking 501 darts games with a professional, mobile-first interface. The application provides real-time score tracking, average calculations, and match management.

## Game Rules & Mechanics

### 501 Darts Format
- Each player starts with 501 points
- Players take turns subtracting their throw scores from their remaining points
- First player to reach exactly 0 points wins the leg
- Standard "double out" rule: cannot finish on 1 point
- Maximum possible single throw: 180 points

### Match Structure
- Best of N format (default: Best of 3)
- Legs to win = Math.ceil(bestOf / 2)
- Match winner is first to win required number of legs

## Core Features

### Score Entry System
- **NumPad Interface**: Professional 3x4 grid layout with numbers 0-9, Clear (C), and OK buttons
- **Input Validation**: 
  - Prevents negative scores
  - Enforces maximum 180 points per throw
  - Prevents throws exceeding remaining player score
  - Blocks finishing on 1 point (double out rule)
- **Visual Feedback**: Active player highlighting, button hover effects

### Score Tracking & Display
- **Main Scoreboard**: Large score display for both players (501 format)
- **Legs Counter**: Visual display of legs won by each player
- **Player Indicators**: Visual cues showing current player turn
- **Real-time Updates**: Immediate score updates after each throw

### Average Calculations
The app tracks two types of averages for each player:

#### Game Average (wg)
- Tracks all throws across all legs in the current match
- Formula: `(sum of all throws / total darts thrown) * 3`
- Assumes 3 darts per turn for accurate averaging
- Displayed next to "wg:" label

#### Leg Average (lg)
- Tracks throws only in the current leg
- Same calculation formula as game average
- Resets at the start of each new leg
- Displayed next to "lg:" label

### Game Controls

#### Primary Actions
- **Throw Submission**: Enter score via numpad and press OK
- **Turn Management**: Automatic player switching after each throw
- **Game Reset**: Reset entire match (scores, legs, averages)
- **Navigation**: Back button to return to home screen

#### Secondary Actions
- **Undo Last Throw**: Remove the last entered throw and restore previous score
  - Accessible via undo button (↶) next to score input
  - Switches back to the player who threw last
  - Updates both score and average calculations
  - Disabled when no throws have been made

### Match Flow

#### Game Setup
1. Enter player names (default: "Player 1", "Player 2")
2. Configure match format (Best of N)
3. Start game to enter scoring phase

#### Scoring Phase
1. Current player enters throw score via numpad
2. Score is validated and applied
3. Turn switches to next player
4. Averages are updated in real-time
5. Process repeats until leg completion

#### Leg Completion
- Triggered when player reaches exactly 0 points
- Winner announcement with leg count
- Automatic reset to 501 for next leg
- Leg averages reset, game averages maintained
- Match winner determined when required legs are won

## User Interface

### Layout Structure
- **Header Section**: Match title (Best of N), back button, menu options
- **Players Section**: Player names, leg counts, turn indicators
- **Scoreboard**: Large score displays with averages
- **Input Section**: Score input field with undo button
- **NumPad**: Professional button layout filling bottom half of screen

### Visual Design
- **Dark Theme**: Professional tournament-style appearance
- **Responsive Design**: Mobile-first with tablet/desktop support
- **Visual Hierarchy**: Clear focus on current scores and active player
- **Accessibility**: High contrast, large touch targets, clear typography

### Mobile Optimization
- **Viewport Sizing**: Uses vh/vw units for consistent mobile display
- **Touch-Friendly**: Large button targets (minimum 44px)
- **Screen Utilization**: NumPad fills bottom 50% of screen
- **No Scrolling**: Interface fits within single screen view

## Technical Implementation

### State Management
- React hooks for local state management
- Player objects containing: score, throws (leg), allThrows (game), legs won
- Current player tracking and turn management
- Game phase management (setup vs. active game)

### Data Structure
```javascript
players: [
  {
    id: 1,
    name: "Player 1",
    score: 501,
    throws: [],      // Current leg throws
    allThrows: [],   // All throws in match
    legs: 0          // Legs won
  }
]
```

### Key Functions
- `handleThrowSubmit()`: Validates and processes throw scores
- `calculateAverage()`: Computes 3-dart averages
- `handleUndoLastThrow()`: Reverses last throw action
- `resetGame()`: Resets match to initial state

## Error Handling
- Input validation with user-friendly alerts
- Prevention of invalid game states
- Graceful handling of edge cases (finishing on 1, exceeding score)
- Disabled states for unavailable actions (undo when no throws)

## Future Enhancement Possibilities
- Multiple game formats (301, Cricket, etc.)
- Statistics tracking across multiple matches
- Player profiles and historical data
- Online multiplayer capabilities
- Tournament bracket management
# Darts Scorer - Game Functionality Documentation

## Overview
The Darts Scorer is a Progressive Web App (PWA) designed for tracking 501 darts games with a professional, mobile-first interface. The application provides real-time score tracking, average calculations, match management, and modern UI notifications for enhanced user experience.

## Game Rules & Mechanics

### 501 Darts Format
- Each player starts with 501 points
- Players take turns subtracting their throw scores from their remaining points
- First player to reach exactly 0 points wins the leg
- **Double out rule**: Must finish with a double (D1-D20 or Bull)
- **Bust protection**: Throws that would result in scores below 2 are invalid
- Maximum possible single throw: 180 points
- Maximum finishable score in one turn: 170 points

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
  - **Bust detection**: Blocks throws that would result in scores below 2
  - **Double out validation**: Ensures finishing throws are valid doubles
- **Visual Feedback**: Active player highlighting, button hover effects
- **UI Notifications**: Modern notification system replaces alert boxes

### Score Tracking & Display
- **Main Scoreboard**: Large score display for both players (501 format)
- **Legs Counter**: Visual display of legs won by each player
- **Player Indicators**: Visual cues showing current player turn
- **Real-time Updates**: Immediate score updates after each throw

### Average Calculations
The app tracks two types of averages for each player:

#### Game Average (wg)
- Tracks all throws across all legs in the current match
- Formula: `(sum of all throws / (throws.length * 3)) * 3`
- Each score entry represents exactly 3 darts thrown
- Displayed next to "wg:" label

#### Leg Average (lg)
- Tracks throws only in the current leg
- Same calculation formula as game average
- Resets at the start of each new leg
- Displayed next to "lg:" label

**Corrected Average Logic**: Each throw entry represents 3 darts, so total darts = throws.length × 3

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
- Triggered when player reaches exactly 0 points with valid double out
- **UI notification**: Smooth notification instead of alert box
- Automatic reset to 501 for next leg
- Leg averages reset, game averages maintained
- Match winner determined when required legs are won

#### Match Completion
- **Trophy notification**: Golden notification for match winner
- Final score display with extended notification duration

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
- **Modern Notifications**: Slide-in notifications with backdrop blur effects

### Mobile Optimization
- **Viewport Sizing**: Uses vh/vw units for consistent mobile display
- **Touch-Friendly**: Large button targets (minimum 44px)
- **Screen Utilization**: NumPad fills bottom 50% of screen
- **No Scrolling**: Interface fits within single screen view

## Technical Implementation

### State Management
- React hooks for local state management
- **Optimized updates**: Functional state updates prevent unnecessary rerenders
- Player objects containing: score, throws (leg), allThrows (game), legs won
- Current player tracking and turn management
- Game phase management (setup vs. active game)
- **Notification state**: Manages UI notification visibility and content

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
- `handleThrowSubmit()`: Validates and processes throw scores with comprehensive validation
- `calculateAverage()`: Computes accurate 3-dart averages (corrected formula)
- `handleUndoLastThrow()`: Reverses last throw action with optimized state updates
- `resetGame()`: Resets match to initial state
- `isValidDoubleOut()`: Validates double out finishing requirements
- `showNotification()`: Displays UI notifications with different types and durations

## Error Handling & User Feedback

### Validation System
- **Input validation**: Comprehensive score validation with immediate feedback
- **Bust detection**: Prevents invalid throws that would result in unfinishable scores
- **Double out enforcement**: Validates finishing throws meet double out requirements
- **State protection**: Prevents impossible game states and invalid transitions

### UI Notification System
- **Modern notifications**: Replaces jarring alert boxes with smooth UI notifications
- **Notification types**:
  - 🎯 **Success** (green): Leg wins, valid actions
  - 🏆 **Trophy** (gold): Match wins with extended duration
  - ⚠️ **Error** (red): Invalid inputs, rule violations
  - 💥 **Bust** (purple): Bust scenarios with explanation
  - ℹ️ **Info** (blue): General information messages
- **Auto-dismiss**: Configurable duration with manual close option
- **Professional styling**: Backdrop blur, slide animations, mobile-responsive

## Performance Optimizations
- **Functional state updates**: Prevents unnecessary component rerenders
- **Optimized array handling**: Eliminates array recreation on every state change
- **Efficient validation**: Early return patterns prevent unnecessary processing
- **Component memoization**: Strategic use of React optimization patterns

## Recent Updates & Improvements
- ✅ **Double out validation**: Proper enforcement of 501 double out rules
- ✅ **Bust protection**: Comprehensive validation preventing invalid game states
- ✅ **UI notifications**: Modern notification system replacing alert boxes
- ✅ **Average calculation fix**: Corrected formula accounting for 3 darts per turn
- ✅ **Performance optimization**: Functional state updates preventing unnecessary rerenders
- ✅ **Enhanced validation**: Multi-layer validation system for robust gameplay

## Future Enhancement Possibilities
- Multiple game formats (301, Cricket, etc.)
- Statistics tracking across multiple matches
- Player profiles and historical data
- Online multiplayer capabilities
- Tournament bracket management
- Sound effects and haptic feedback
- Advanced statistics and analytics dashboard
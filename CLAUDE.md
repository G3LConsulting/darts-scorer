# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mobile-first Progressive Web App (PWA) for tracking 501 darts games with WordPress backend integration. The project consists of a React frontend with a WordPress plugin backend.

## Development Commands

Based on the README, the following commands are expected to be available once the project is set up:

```bash
# Development
npm install          # Install dependencies
npm start           # Start development server
npm test            # Run tests
npm run build       # Build for production
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

## Architecture Overview

### Frontend (React PWA)
- **Technology**: React with PWA capabilities
- **Target**: Mobile-first responsive design
- **Offline Support**: Works offline, installable on mobile devices

### Backend (WordPress Integration)
- **API**: WordPress REST API with custom endpoints
- **Authentication**: WordPress user system
- **Database**: WordPress MySQL database
- **Plugin Location**: `wordpress-plugin/` directory

### Project Structure (Planned)
```
src/
├── components/         # React components
├── hooks/             # Custom React hooks  
├── services/          # API and game logic
├── styles/            # CSS/styling files
└── utils/             # Utility functions

public/                # Static assets
wordpress-plugin/      # WordPress backend plugin
├── includes/          # PHP classes and functions
├── api/              # REST API endpoints
└── admin/            # Admin interface
```

## Game Logic

The application implements standard 501 darts rules:
- Each player starts with 501 points
- Subtract the score of each turn from the total
- First to exactly 0 wins the leg
- Must finish with a double
- Best of X legs wins the match

## Development Status

This is a new project currently in Phase 1 (MVP) development:
- [x] Project setup
- [ ] Basic game logic implementation
- [ ] Score input interface
- [ ] Local storage functionality

## WordPress Plugin Setup

The WordPress backend requires:
1. Copy `wordpress-plugin/` folder to WordPress `wp-content/plugins/`
2. Activate "Darts Scorer" plugin in WordPress admin
3. Configure API settings in WordPress admin

## Mobile PWA Features

The app is designed to be installable on mobile devices through the browser's "Add to Home Screen" functionality.
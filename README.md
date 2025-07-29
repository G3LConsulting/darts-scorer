# Darts Scorer

A mobile-first Progressive Web App (PWA) for tracking darts games with WordPress backend integration.

## 🎯 Features

- **Core Game Management**: Create and manage 501 darts games
- **Score Tracking**: Input scores with mobile-optimized interface
- **Match Management**: Track legs, games, and tournament progress
- **WordPress Integration**: Sync data across devices with user authentication
- **PWA Capabilities**: Works offline, installable on mobile devices

## 🏗️ Architecture

- **Frontend**: React PWA with mobile-first responsive design
- **Backend**: WordPress with custom plugin
- **Authentication**: WordPress user system
- **Database**: WordPress MySQL database
- **API**: WordPress REST API with custom endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- WordPress installation (for backend)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/darts-scorer.git
cd darts-scorer

# Install dependencies
npm install

# Start development server
npm start
```

### WordPress Plugin Setup
1. Copy the `wordpress-plugin` folder to your WordPress `wp-content/plugins/` directory
2. Activate the "Darts Scorer" plugin in WordPress admin
3. Configure API settings in WordPress admin

## 📱 Mobile Installation

The app can be installed on mobile devices:
1. Open the app in your mobile browser
2. Look for "Add to Home Screen" prompt
3. Or use browser menu → "Add to Home Screen"

## 🛠️ Development

### Project Structure
```
darts-scorer/
├── src/                    # React frontend source
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and game logic
│   ├── styles/            # CSS/styling files
│   └── utils/             # Utility functions
├── public/                # Static assets
├── wordpress-plugin/      # WordPress backend plugin
│   ├── includes/          # PHP classes and functions
│   ├── api/              # REST API endpoints
│   └── admin/            # Admin interface
└── docs/                 # Documentation
```

### Available Scripts
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎮 Game Rules

Standard 501 darts rules:
- Each player starts with 501 points
- Subtract the score of each turn from the total
- First to exactly 0 wins the leg
- Must finish with a double
- Best of X legs wins the match

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

Please report issues on the [GitHub Issues](https://github.com/YOUR_USERNAME/darts-501-scorer/issues) page.

## 🗺️ Roadmap

### Phase 1: MVP
- [x] Project setup
- [ ] Basic game logic
- [ ] Score input interface
- [ ] Local storage

### Phase 2: Enhanced Features
- [ ] Game history
- [ ] Statistics
- [ ] Improved UX

### Phase 3: WordPress Integration
- [ ] User authentication
- [ ] Data synchronization
- [ ] Multi-device support

### Phase 4: Advanced Features
- [ ] Tournament management
- [ ] Social features
- [ ] Advanced analytics

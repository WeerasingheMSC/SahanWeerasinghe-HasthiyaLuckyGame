# Lucky 4 Game - Frontend

A modern, responsive React application for the Lucky 4 number matching game built with TypeScript, Material UI, and React Router.

## 🎯 Features

- **Modern UI**: Material UI components with custom theming and gradients
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Client-Side Auth**: Simple player authentication with localStorage persistence
- **Real-time Feedback**: Loading states, error handling, and success notifications
- **Routing**: React Router for navigation between pages
- **API Integration**: Axios-based service layer for backend communication

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── DashboardLayout.tsx    # Main layout with navigation
│   ├── pages/              # Page components
│   │   ├── SignUpPage.tsx         # Initial signup/login
│   │   ├── DashboardHome.tsx      # Dashboard home page
│   │   ├── PlayGamePage.tsx       # Game playing interface
│   │   └── LeaderboardPage.tsx    # Rankings and stats
│   ├── context/            # React Context providers
│   │   └── PlayerContext.tsx      # Player state management
│   ├── services/           # API services
│   │   └── api.ts                 # Axios API client
│   ├── types/              # TypeScript types
│   │   └── index.ts               # Type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app with routing
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── .env                    # Environment variables
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set the backend API URL:
```
VITE_API_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser:
```
http://localhost:5173
```

## 📱 Pages

### Sign Up Page
- **Path**: `/`
- **Features**: 
  - Name and email input with validation
  - Material UI Card with gradient background
  - Stores player info in localStorage
  - Redirects to dashboard on success

### Dashboard Home
- **Path**: `/dashboard`
- **Features**:
  - Welcome message with player name
  - Quick action cards (Play Game, Leaderboard)
  - How to Play guide
  - Scoring guide with prize tiers

### Play Game Page
- **Path**: `/dashboard/play`
- **Features**:
  - 4 number input fields (0-9)
  - Auto-focus next field
  - Real-time validation
  - Result dialog with animations
  - Visual matching indicators
  - Play Again functionality

### Leaderboard Page
- **Path**: `/dashboard/leaderboard`
- **Features**:
  - Top players ranking
  - Desktop: Table view
  - Mobile: Card view
  - Pagination (5, 10, 25, 50 per page)
  - Trophy icons for top 3
  - Player stats (games, score, jackpots)

## 🎨 UI Components

### Material UI Components Used
- **Layout**: Container, Box, Grid, Card
- **Navigation**: AppBar, Drawer, Menu
- **Forms**: TextField, Button
- **Feedback**: Alert, Dialog, CircularProgress, Chip
- **Data Display**: Table, Avatar, Typography
- **Icons**: Material Icons (@mui/icons-material)

### Color Palette
- **Primary**: #667eea (purple)
- **Secondary**: #f5576c (red)
- **Gradients**: Linear gradients for backgrounds
- **Rankings**:
  - 1st: #FFD700 (Gold)
  - 2nd: #C0C0C0 (Silver)
  - 3rd: #CD7F32 (Bronze)

## 🔐 Authentication Flow

1. User lands on Sign Up page (`/`)
2. Enters name and email
3. Data stored in PlayerContext and localStorage
4. Redirected to `/dashboard`
5. Protected routes check for player in context
6. Logout clears player data and redirects to `/`

## 📡 API Integration

### API Services (`src/services/api.ts`)

```typescript
// Game API
gameAPI.createGame(data)          // Create new game
gameAPI.playGame(data)            // Play a game
gameAPI.getAllGames(params)       // Get all games
gameAPI.getGameById(id)           // Get game by ID
gameAPI.deleteGame(id)            // Delete game

// Leaderboard API
leaderboardAPI.getLeaderboard(params)  // Get rankings
leaderboardAPI.getPlayerStats(id)      // Get player stats
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: PaginationMeta;
}
```

## 🎮 Game Logic

### Number Selection
- 4 numbers required (0-9 each)
- Auto-advance to next field on input
- Backspace returns to previous field
- Visual feedback for focus/error states

### Scoring
- 0 matches: 0 points
- 1 match: 10 points
- 2 matches: 50 points
- 3 matches: 200 points
- 4 matches: 1000 points (JACKPOT!)

### Result Display
- Visual comparison of player vs winning numbers
- Green highlights for matches
- Check icons on matching positions
- Score and prize tier display
- Celebratory messages

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |

### TypeScript Types

All types are defined in `src/types/index.ts`:
- `Player`: Player information
- `Game`: Game data structure
- `GameResult`: Game result details
- `LeaderboardEntry`: Leaderboard entry
- `ApiResponse<T>`: Generic API response

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

### Responsive Features
- Drawer: Temporary on mobile, permanent on desktop
- Table: Card view on mobile, table view on desktop
- Grid layouts adapt to screen size
- Typography scales appropriately
- Touch-friendly button sizes

## 🎨 Styling

### CSS/Styling Approach
- Material UI `sx` prop for component styling
- Tailwind CSS for utility classes
- Custom theme configuration
- Gradient backgrounds
- Smooth transitions and animations

### Theme Configuration
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#f5576c' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Environment Setup

Update `.env` for production:
```
VITE_API_URL=https://your-api-domain.com/api
```

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3**: Upload `dist/` folder
- **Docker**: Use provided Dockerfile (if available)

## 🧪 Testing

```bash
# Run tests (when configured)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Code Quality

### ESLint
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if backend server is running
   - Verify `VITE_API_URL` in `.env`
   - Check CORS configuration on backend

2. **Player Not Found**
   - Clear localStorage
   - Sign up again
   - Check browser console for errors

3. **Routing Issues**
   - Ensure React Router is properly configured
   - Check for typos in route paths
   - Verify ProtectedRoute logic

## 📦 Dependencies

### Core
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `react-router-dom`: ^7.1.3
- `typescript`: ^5.9.3

### UI Library
- `@mui/material`: ^6.3.1
- `@mui/icons-material`: ^6.3.1
- `@emotion/react`: ^11.14.0
- `@emotion/styled`: ^11.14.0

### HTTP Client
- `axios`: ^1.7.9

### Build Tools
- `vite`: ^7.2.4
- `@vitejs/plugin-react`: ^4.4.2

### Styling
- `tailwindcss`: ^4.1.18

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Hasthiya Lucky 4 game assessment.

## 🙏 Acknowledgments

- Material UI for the component library
- React Router for routing
- Vite for fast development experience
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

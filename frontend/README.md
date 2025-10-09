# FlowSense Frontend

Modern React application for AI-powered smart contract generation.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Features

### Theme System
- Dark/Light mode toggle
- Persistent theme preference using localStorage
- Smooth transitions between themes

### Pages

1. **Home** - Smart contract generation interface
2. **Templates** - Pre-built contract templates
3. **Dashboard** - Activity overview and statistics
4. **Profile** - User information and achievements
5. **Settings** - App configuration and preferences

### Components

- **Layout** - Main layout wrapper with sidebar
- **Sidebar** - Navigation menu with smooth animations
- **Header** - Top bar with theme toggle

### Styling

- **TailwindCSS** - Utility-first CSS framework
- **Custom Classes** - Pre-defined component classes in `index.css`:
  - `.btn-primary` - Primary action buttons
  - `.btn-secondary` - Secondary buttons
  - `.input-field` - Form inputs
  - `.card` - Card containers

### Animations

Powered by Framer Motion for smooth, performant animations:
- Page transitions
- Hover effects
- Theme toggle rotation
- Sidebar slide-in

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Axios
- Lucide React (icons)

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top navigation with theme toggle
│   ├── Layout.jsx          # Main layout wrapper
│   └── Sidebar.jsx         # Side navigation menu
├── context/
│   └── ThemeContext.jsx    # Theme state management
├── pages/
│   ├── Home.jsx            # Contract generation page
│   ├── Templates.jsx       # Templates gallery
│   ├── Dashboard.jsx       # User dashboard
│   ├── Profile.jsx         # User profile
│   └── Settings.jsx        # App settings
├── App.jsx                 # Main app component with routing
├── main.jsx               # Entry point
└── index.css              # Global styles and Tailwind
```

## Customization

### Colors

Primary colors can be customized in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... more shades
    900: '#0c4a6e',
  },
}
```

### Animations

Custom animations in `tailwind.config.js`:
- `fade-in` - Fade in effect
- `slide-in` - Slide in from left

